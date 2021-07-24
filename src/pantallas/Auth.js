import React, {useState} from 'react'
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native'
import {layoutStyle} from '../style'
import logo from "../../assets/Logo.jpg"
import FrmRegister from "../componentes/auth/FrmRegister";
import FrmLogin from "../componentes/auth/FrmLogin";

export default function Auth() {
    const [showLogin, setShowLogin] = useState(false);
    const cambiarForm = () => setShowLogin(!showLogin);
    return (
        <View style={layoutStyle.container}>
            <Image style={styles.logo} source={logo}/>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                { showLogin ? <FrmLogin cambiarForm={cambiarForm}/> : <FrmRegister cambiarForm={cambiarForm}/>}
            </KeyboardAvoidingView>
        </View>
    )
}
const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 200,
        resizeMode: "contain",
        marginBottom:20,
    },
});