import React,{useState} from 'react'
import { View, Text } from 'react-native'
import { TextInput,Button, } from "react-native-paper";
import {formStyle} from "../../style";
import {useFormik} from "formik";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import {loginApi} from "../../api/User";
import Message from "../Message"
export default function FrmLogin(props) {
    const { cambiarForm } = props;
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();
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
                const response = await loginApi(formData);
                if (response.statusCode) throw "Error en el usuario o contraseña" 
                login(response);

            } catch (error) {
                onToggleSnackBar();
                setLoading(false);
                console.log(error);
            }
            console.log("Datos");
            console.log(formData);
        }
    })
    return (
        <View>
            <TextInput label="Email o nombre  de usuario" style={formStyle.input} onChangeText={ (text) => formik.setFieldValue("identifier", text)} 
                value={formik.values.identifier} error={formik.errors.identifier} />
            <TextInput label="Contraseña" style={formStyle.input} onChangeText={ (text) => formik.setFieldValue("password", text)} 
                value={formik.values.password} error={formik.errors.password} secureTextEntry={contraSec} 
                right={!contraSec ? <TextInput.Icon name="eye-off" onPress={() => setContraSec(!contraSec)}/> 
                : <TextInput.Icon name="eye" onPress={() => setContraSec(!contraSec)}/> }
            />
            <Button mode="contained" style={formStyle.btnSuccess} onPress={formik.handleSubmit} 
                loading={loading}>Iniciar Sesion</Button>
            <Button mode="text" style={formStyle.btnText} labelStyle={formStyle.btnTextLabel} onPress={cambiarForm}>Registrarse</Button>
            <Message visible={visible} onDismissSnackBar={onDismissSnackBar} msg="Usuario o contraseña incorrecto" />
        </View>
    )
}
function valInicial(){
    return {
        identifier: "",
        password:"",
    }
}
function validationSchema() {
    return{
        identifier: Yup.string().required(true),
        password: Yup.string().required(true),
    }
}