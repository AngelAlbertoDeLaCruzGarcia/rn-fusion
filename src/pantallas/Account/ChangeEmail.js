import React, { useState,useCallback } from 'react'
import { View, Text, StyleSheet} from 'react-native'
import {TextInput,Button,Snackbar} from "react-native-paper"
import {useFocusEffect,useNavigation} from "@react-navigation/native" 
import formStyle from '../../style/forms';
import {useFormik} from "formik";
import * as Yup from "yup";
import { getMeApi, updateUserApi } from "../../api/User";
import useAuth from '../../hooks/useAuth';
import Message from "../../componentes/Message";
export default function ChangeEmail() {
    const { auth } = useAuth();
    const [loading, setLoading] = useState(false);

    ///Mensage de error
    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const [msg, setMsg] = useState("Error al actualizar Email");

    const nav = useNavigation();
    let response;
    useFocusEffect(
        useCallback(() => {
            (async () => {
                response = await getMeApi(auth.token);
                if( response.email  )
                    await formik.setFieldValue("email", response.email);
            
            })()
        },[])
    )
    const formik = useFormik ({
        initialValues: valInicial(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);            
            try {
                setMsg("Error al actualizar Email");
                response = await updateUserApi(auth,formData);
                console.log(response);
                if(response.statusCode) throw setMsg("Email ya existe");
                nav.goBack();
            } catch (error) {
                onToggleSnackBar();
                formik.setFieldError("email", true);
                setLoading(false);
            }
        }
    });
    return (
        <View style={Styles.container}>
            <TextInput  label="Email" style={formStyle.input} onChangeText={ (text) => formik.setFieldValue("email",text)} 
                value={formik.values.email} error={formik.errors.email}
            />
            <Button mode="contained" style={formStyle.btnSuccess} onPress={ formik.handleSubmit } 
                loading={loading} >
                Cambiar Email
            </Button>
            <Message visible={visible} onDismissSnackBar={onDismissSnackBar} msg={msg} />

        </View>
    )
}

function valInicial(){
    return {
        email: "",
    }
}
function validationSchema(){
    return{
        email: Yup.string().email(true).required(true),
    }
}
const Styles = StyleSheet.create({
    container:{
        padding:20,

    }
})