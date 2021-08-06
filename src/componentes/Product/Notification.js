import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Title, Button } from 'react-native-paper'
import useAuth from '../../hooks/useAuth'
import { AddNotificationApi } from '../../api/Notification'
import formStyle from '../../style/forms'
import Message from '../Message';

export default function Notification(props) {
    const { product } = props;
    const { auth } = useAuth();
    const [loading, setLoading] = useState(null);
    //Mensaje de snackbar
    const [msg, setMsg] = useState(false);
    const [visible, setVisible] = useState(false);
    const onToggleSnackBar = (dato) => { 
        setVisible(!visible) 
        setMsg(dato);
    };
    const onDismissSnackBar = () => setVisible(false);

    const AddNoti = async() => {
        setLoading(true);
        try {
            const response = await AddNotificationApi(auth, product._id);
            if(response != null){
                const dato = "Exito";
                onToggleSnackBar(dato);
            }

        } catch (error) {
            console.log(error);
            const dato = "Error, intente de nuevo";
            onToggleSnackBar(dato);
        }        
        setLoading(false);
    };
    return (
        <View>
            <Title>Producto no disponible por el momento</Title>
            <Button loading={loading} mode="contained" style={formStyle.btnPrimary} onPress={ AddNoti } >
                Notificarme cuando este disponible
            </Button>
            <Message visible={visible} onDismissSnackBar={onDismissSnackBar} msg={msg} />
        </View>
    )
}
