import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Message from '../../componentes/Message';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { AddAddressApi, getAddressApi, UpdateAddressApi }  from "../../api/Address"
import useAuth from '../../hooks/useAuth';
import formStyle  from "../../style/forms"
import { useNavigation } from '@react-navigation/native';
import Load from '../../componentes/Loading';
export default function AddAddress(props) {
    const { route:{ params } } = props;
    const nav = useNavigation();
    const [loading, setLoading] = useState(false);
    const [loadScreen, setLoadScreen] = useState(false);
    const [newAddress, setNewAddress] = useState(true)
    const { auth } = useAuth();
    //Mensaje de error
    const [visible, setVisible] = useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    useEffect(() => {
       (async () => {
        if(params?.idAddress){
            setNewAddress(false);
            setLoadScreen(true);
            let controller = new AbortController();
            let signal = controller.signal;
            const response = await getAddressApi(auth,params.idAddress,signal);
            await formik.setFieldValue("_id", response._id);
            await formik.setFieldValue("title", response.title);
            await formik.setFieldValue("nameComplete", response.nameComplete);
            await formik.setFieldValue("postalCode", response.postalCode);
            await formik.setFieldValue("country", response.country);
            await formik.setFieldValue("state", response.state);
            await formik.setFieldValue("city", response.city);
            await formik.setFieldValue("address", response.address);
            await formik.setFieldValue("phone", response.phone);
            setLoadScreen(false);
            controller.abort();
        }
      }) ();
    }, [params])

    const formik = useFormik({
        initialValues: valInicial(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                let controller = new AbortController();
                let signal = controller.signal;
                if ( newAddress ) await AddAddressApi(auth,formData,signal);                               
                else await UpdateAddressApi(auth,formData,signal);
                controller.abort();
                nav.goBack();
            } catch (error) {
                onToggleSnackBar();
                setLoading(false);
                console.log(error);
            }     
        }
    });
    return (
        <KeyboardAwareScrollView extraScrollHeight={25}>
            {loadScreen ?  (
                <Load/>
            ): (
            <View style={Styles.container}>
                <TextInput label="Titulo" style={formStyle.input} maxLength={50} 
                    onChangeText={ (text) => formik.setFieldValue("title",text)}  
                    value={formik.values.title} error={formik.errors.title} 
                />
                <TextInput label="Nombre de destinatario" style={formStyle.input} maxLength={150}
                    onChangeText={ (text) => formik.setFieldValue("nameComplete",text)}  
                    value={formik.values.nameComplete} error={formik.errors.nameComplete}
                />

                <TextInput label="Codigo Postal" style={formStyle.input} keyboardType="numeric" maxLength={6}
                    onChangeText={ (text) => formik.setFieldValue("postalCode",text)}  
                    value={formik.values.postalCode} error={formik.errors.postalCode}
                />

                <TextInput label="Pais" style={formStyle.input} onChangeText={ (text) => formik.setFieldValue("country",text)}  
                    value={formik.values.country} error={formik.errors.country} maxLength={50}
                />

                <TextInput label="Estado" style={formStyle.input} onChangeText={ (text) => formik.setFieldValue("state",text)}  
                    value={formik.values.state} error={formik.errors.state} maxLength={50}
                />

                <TextInput label="Ciudad" style={formStyle.input} onChangeText={ (text) => formik.setFieldValue("city",text)}  
                    value={formik.values.city} error={formik.errors.city} maxLength={100}
                />

                <TextInput label="Direccion" style={formStyle.input} onChangeText={ (text) => formik.setFieldValue("address",text)}  
                    value={formik.values.address} error={formik.errors.address} maxLength={150}
                />
                
                <TextInput label="Celular" style={formStyle.input} placeholder="XXXXXXXXXX" keyboardType="numeric" maxLength={10}
                    onChangeText={ (text) => formik.setFieldValue("phone",text)}  
                    value={formik.values.phone} error={formik.errors.phone}
                />

                <Button mode="contained" style={formStyle.btnSuccess} loading={loading}
                    onPress={ formik.handleSubmit } >
                    {newAddress ? "Agregar" : "Actualizar"} direccion
                </Button>
                <Message visible={visible} onDismissSnackBar={onDismissSnackBar} msg="Error al guardar direccion" />
            </View> )}
        </KeyboardAwareScrollView>
    )
}
function valInicial(){
    return{
        title: "",
        nameComplete: "",
        postalCode: "",
        country: "",
        state: "",
        city: "",
        address: "",
        phone: "",
    }
}
function validationSchema(){
    return{
        title: Yup.string().min(4,true).required(true),
        nameComplete: Yup.string().min(10,true).required(true),
        postalCode: Yup.string().min(4,true).required(true),
        country: Yup.string().min(4,true).required(true),
        state: Yup.string().min(4,true).required(true),
        city: Yup.string().min(4,true).required(true),
        address: Yup.string().min(4,true).required(true),
        phone: Yup.string().min(10,true).required(true),
    }
}
const Styles = StyleSheet.create({
    container: {
        padding:20,
    }
})