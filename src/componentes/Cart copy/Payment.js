import React, {useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input-view";
import {useFormik} from "formik";
import Message from '../Message';

import formStyle from '../../style/forms';
import colors from '../../style/colors';
export default function Payment(props) {
    const { products, selectedAddress, totalPayment } = props;
    const [onChange, setOnChange] = useState(null)
    const [textCard, setTextCard] = useState(null)
    //Mensaje de snackbar
    const [msg, setMsg] = useState(false);
    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);
    const onToggleSnackBar = (dato) => { 
        setVisible(!visible) 
        setMsg(dato);
    };
    //console.log(onChange);
    //console.log("Payment");
    ///console.log(totalPayment);
    //console.log(onChange);
    console.log(onChange);
    const Pagar = () => {
        try {
            console.log("press");
            if (onChange.status.name === "valid" &&
                onChange.status.number === "valid" &&  
                onChange.status.expiry === "valid" &&  
                onChange.status.cvc === "valid" &&
                onChange.valid
            )
            console.log(onChange.values);
        } catch (error) {
            console.log(error);
            const dato = "Error al procesar el pago intente nuevamente";
            onToggleSnackBar(dato);
        }      

    }
    console.log(totalPayment);
    return (
        <View>
            <Text>Formas de pago:</Text>
            <View style={Styles.container}>
                <Button mode="contained" onPress={Pagar} > Pagar: ${totalPayment}</Button> 
            </View>
            <CreditCardInput onChange={setOnChange} 
                labels={{
                    name: "Nombre de propietario",
                    number: "Numero de tarjeta",
                    expiry: "Expiracion",
                    cvc: "CVC/CCV" 
                }}
                requiresName={true}
                requiresCVC={true}
                allowScroll={true}
                ///useVertical={true}
                onFocus={setTextCard}
                validColor={ "blue"}
                inputContainerStyle={Styles.inputContainer}
            />
           <Button mode="contained" >{totalPayment}</Button> 
            <View style={Styles.total} >
                
            </View> 
            <Message visible={visible} onDismissSnackBar={onDismissSnackBar} msg={msg} />

        </View>
    )
}
const Styles = StyleSheet.create({
    container:{
        marginTop: 50,
    },
    inputContainer:{
        borderBottomWidth: 1,  borderBottomColor: "blue"
    },
    total:{
        marginTop: 300,
    },
}) 
/*
 


*/