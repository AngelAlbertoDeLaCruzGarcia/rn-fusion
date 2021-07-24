import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { AddProductApi } from '../../api/Cart';

import Message from "../../componentes/Message"
import colors from '../../style/colors';
import formStyle from '../../style/forms';
export default function Buy(props) {
    const { product, cant} = props;
    //Mensaje de snackbar
    const [msg, setMsg] = useState(false);
    const [visible, setVisible] = useState(false);
    const onToggleSnackBar = (dato) => { 
        setVisible(!visible) 
        setMsg(dato);
    } ;
    const onDismissSnackBar = () => setVisible(false);
    const AddProductCart = async() => {
        const ac = new AbortController()
        const response = await AddProductApi(product._id, cant , product.quantity);
        if(response){
            const dato = "Producto añadido al carrito";
            onToggleSnackBar(dato);
        }else if(!response){
            const dato = "No añadido. Cantidad mayor al stock. Verifique carrito de compras";
            onToggleSnackBar(dato);
        }else{
            const dato = "Error. No se pudo añadir al carrito";
            onToggleSnackBar(dato);
        }
        return () => ac.abort();
    }
    return (
        <View style={Styles.container}>
            <Button icon="cart" mode="contained" style={formStyle.btnPrimary} onPress={ AddProductCart } > 
                Agregar al carrito
            </Button>
            <Message visible={visible} onDismissSnackBar={onDismissSnackBar} msg={msg} />
        </View>
    )
}
const Styles = StyleSheet.create({
    container: {
        marginTop: 20,
    }
})