import React, {useState} from 'react'
import { View, Text } from 'react-native'
import {TextInput,TextInputMask,Button,Snackbar } from "react-native-paper";
import {formStyle} from "../../style"
import {useFormik} from "formik";
import * as Yup from "yup";
import { registerApi } from '../../api/User';

export default function FrmRegister(props) {
    const { cambiarForm } = props;
    const [loading, setLoading] = useState(false);
    const [contraSec, setContraSec] = useState(true);


    //Mensaje de error
    const [visible, setVisible] = useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
    
    const formik = useFormik({
        initialValues: valInicial(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => { 
            setLoading(true);
            try {
                await registerApi(formData);
                cambiarForm();
            } catch (error) {
                onToggleSnackBar();
                setLoading(false);
                console.log(error);
            }

        }
    })
    return (
        <View>
            <TextInput label="E-mail" style={formStyle.input} onChangeText={ (text) => formik.setFieldValue("email",text) } 
                value={formik.values.email} error={ formik.errors.email } />
            <TextInput label="Usuario" style={formStyle.input} onChangeText={ (text) => formik.setFieldValue("username",text) }
                value={formik.values.username} error={ formik.errors.username }/>
            <TextInput label="Contraseña" style={formStyle.input} onChangeText={ (text) => formik.setFieldValue("password",text) } 
                value={formik.values.password} error={ formik.errors.password } secureTextEntry={contraSec} 
                right={!contraSec ? <TextInput.Icon name="eye-off" onPress={() => setContraSec(!contraSec)}/> 
                : <TextInput.Icon name="eye" onPress={() => setContraSec(!contraSec)}/> }
            />
            <TextInput label="Repetir Contraseña" style={formStyle.input} onChangeText={ (text) => formik.setFieldValue("re_contra",text) }
                value={formik.values.re_contra} error={ formik.errors.re_contra } secureTextEntry={contraSec} 
                right={!contraSec ? <TextInput.Icon name="eye-off" onPress={() => setContraSec(!contraSec)}/> 
                : <TextInput.Icon name="eye" onPress={() => setContraSec(!contraSec)}/> }                
            />
            <Button mode="contained" style={formStyle.btnSuccess} onPress={formik.handleSubmit}
                loading={loading}>Registrar</Button>
            <Button mode="text" style={formStyle.btnText} labelStyle={formStyle.btnTextLabel} onPress={cambiarForm}>Iniciar Sesion</Button>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                label: 'X',
                onPress: () => {
                    // Do something
                },
                }}>
                Error al registrarse
            </Snackbar>


        </View>
    )
}
function valInicial() {
    return {
        email:"",
        username:"",
        password:"",
        re_contra:"",
    }
}
function validationSchema(){
    return{
        email: Yup.string().email(true).required(true),
        username: Yup.string().required(true),
        password: Yup.string().required(true),
        re_contra: Yup.string().required(true).oneOf([Yup.ref("password")],true),
    }
}