import React, {useState} from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input-view";

import formStyle from '../../style/forms';
import colors from '../../style/colors';
export default function Card(props) {
    const { setOnChange, setTextCard } = props;

    return (
        <SafeAreaView>
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
        
        </SafeAreaView>

    )
}
const Styles = StyleSheet.create({
    inputContainer:{
        borderBottomWidth: 1,  borderBottomColor: "blue"
    },
}) 
/*
 


*/