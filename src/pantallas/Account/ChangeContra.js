import React, { useState,useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {TextInput,Button} from "react-native-paper"
import {useFocusEffect,useNavigation} from "@react-navigation/native" 
import formStyle from '../../style/forms';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { getMeApi, updateUserApi } from "../../api/User";
import useAuth from '../../hooks/useAuth';
import Message from "../../componentes/Message";
export default function ChangeEmail() {
    const { auth } = useAuth();
    const [loading, setLoading] = useState(false);
    const [contraSec, setContraSec] = useState(true);

    ///Mensage de error
    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);
    const onToggleSnackBar = () => setVisible(!visible);

    const nav = useNavigation();
    let response;

    const formik = useFormik ({
        initialValues: valInicial(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);            
            try {
                response = await updateUserApi(auth,formData);
                console.log(response);
                if(response.statusCode) throw "Error al actualizar contraseña";
                nav.goBack();
            } catch (error) {
                onToggleSnackBar();
                formik.setFieldError("password", true);
                setLoading(false);
            }
        }
    });
    return (
        <View style={Styles.container}>
            <TextInput  label="Nueva contraseña" style={formStyle.input} onChangeText={ (text) => formik.setFieldValue("password",text)} 
                value={formik.values.password} error={formik.errors.password} secureTextEntry={contraSec} 
                right={!contraSec ? <TextInput.Icon name="eye-off" onPress={() => setContraSec(!contraSec)}/> 
                : <TextInput.Icon name="eye" onPress={() => setContraSec(!contraSec)}/> }
            />
            <TextInput  label="Repetir contraseña" style={formStyle.input} onChangeText={ (text) => formik.setFieldValue("re_contra",text)} 
                value={formik.values.re_contra} error={formik.errors.re_contra} secureTextEntry={contraSec} 
                right={!contraSec ? <TextInput.Icon name="eye-off" onPress={() => setContraSec(!contraSec)}/> 
                : <TextInput.Icon name="eye" onPress={() => setContraSec(!contraSec)}/> }
            />
            <Button mode="contained" style={formStyle.btnSuccess} onPress={ formik.handleSubmit } 
                loading={loading} >
                Cambiar contraseña
            </Button>
            <Message visible={visible} onDismissSnackBar={onDismissSnackBar} msg="Error al actualizar contraseña" />

        </View>
    )
}

function valInicial(){
    return {
        password: "",
        re_contra: "",
    }
}
function validationSchema(){
    return{
        password: Yup.string().min(4,true).required(true),
        re_contra: Yup.string().min(4,true).required(true).oneOf([Yup.ref("password"),true]),
    }
}
const Styles = StyleSheet.create({
    container:{
        padding:20,

    }
})