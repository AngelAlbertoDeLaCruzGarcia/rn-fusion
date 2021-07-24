import React, { useState,useCallback } from 'react'
import { View, Text, StyleSheet} from 'react-native'
import {TextInput,Button} from "react-native-paper"
import {useFocusEffect,useNavigation} from "@react-navigation/native" 
import formStyle from '../../style/forms';
import {useFormik} from "formik";
import * as Yup from "yup";
import { getMeApi, updateUserApi } from "../../api/User";
import useAuth from '../../hooks/useAuth';
import Message from "../../componentes/Message";
export default function ChangeName() {
    const { auth } = useAuth();
    const [loading, setLoading] = useState(false);
    ///Mensage de error
    const [visible, setVisible] = useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    const nav = useNavigation();
    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getMeApi(auth.token);
                if( response.name && response.lastname  ){
                    await formik.setFieldValue("name", response.name);
                    await formik.setFieldValue("lastname", response.lastname);
                }

            })()
        },[])
    )
    const formik = useFormik ({
        initialValues: valInicial(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);            
            try {
                await updateUserApi(auth,formData);
                nav.goBack();
            } catch (error) {
                onToggleSnackBar();
            }
            setLoading(false);
        }
    });
    return (
        <View style={Styles.container}>
            <TextInput  label="Nombre" style={formStyle.input} onChangeText={ (text) => formik.setFieldValue("name",text)} 
                value={formik.values.name} error={formik.errors.name}
            />
            <TextInput  label="Apellidos" style={formStyle.input} onChangeText={ (text) => formik.setFieldValue("lastname",text) } 
                value={formik.values.lastname} error={formik.errors.lastname}
            />
            <Button mode="contained" style={formStyle.btnSuccess} onPress={ formik.handleSubmit } 
                loading={loading} >
                Cambiar nombre completo
            </Button>
            <Message visible={visible} onDismissSnackBar={onDismissSnackBar} msg="Error al actualizar" />
        </View>
    )
}

function valInicial(){
    return {
        name: "",
        lastname: "",
    }
}
function validationSchema(){
    return{
        name: Yup.string().required(true),
        lastname: Yup.string().required(true),
    }
}
const Styles = StyleSheet.create({
    container:{
        padding:20,

    }
})