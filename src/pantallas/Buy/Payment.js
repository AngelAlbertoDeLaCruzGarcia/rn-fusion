import React, {useState} from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import { FAB } from 'react-native-paper';
import Card from "../../componentes/Buy/Card"
import useAuth from '../../hooks/useAuth'
import { PaymentApi } from '../../api/Payment';
import { DeleteCartApi } from '../../api/Cart';
import { STRIPE_KEY } from '../../utils/constants';
const stripe = require("stripe-client")(STRIPE_KEY);
import Message from '../../componentes/Message';
import { useNavigation } from '@react-navigation/native';
import StatusBarCustom from '../../componentes/StatusBarCustom';
import formStyle from '../../style/forms';
import colors from '../../style/colors';

export default function Payment(props) {
    const { route:{ params } } = props;
    const [onChange, setOnChange] = useState(null)
    const [textCard, setTextCard] = useState(null)
    const [loading, setLoading] = useState(false)
    const nav = useNavigation();
    const { auth } = useAuth();
    console.log(auth);
    //Mensaje de snackbar
    const [msg, setMsg] = useState(false);
    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);
    const onToggleSnackBar = (dato) => { 
        setVisible(!visible) 
        setMsg(dato);
    };
    const Pagar = async() => {
        setLoading(true);
        try {
            let fecha = onChange.values.expiry.split("/");
            if (onChange.status.name === "valid" &&
                onChange.status.number === "valid" &&  
                onChange.status.expiry === "valid" &&  
                onChange.status.cvc === "valid" &&
                onChange.valid
            ){
                console.log(onChange.values);
                const result = await stripe.createToken({
                    card: {
                        "name": onChange.values.name,
                        "number": onChange.values.number,
                        "exp_month": fecha[0],
                        "exp_year": fecha[1],
                        "cvc": onChange.values.cvc
                    }
                });
                if (result?.error) {
                    const dato = "Error al identificar tarjeta";
                    onToggleSnackBar(dato);
                    setLoading(false);
                }else 
                {
                    const response = await PaymentApi(
                        auth,
                        result.id,
                        params?.products,
                        params?.selectedAddress
                    );
                    if ( response !=null ) {
                        console.log("Pedido Exitoso");
                        await DeleteCartApi();
                        nav.navigate("Account", { screen: "Order" });
                    } else {
                        const dato = "Error al realizar pedido";
                        onToggleSnackBar(dato);
                        setLoading(false);
                    }
                }
            }else{
                const dato = "Verifica datos de tarjeta";
                onToggleSnackBar(dato);
            }
        } catch (error) {
            console.log(error);
            const dato = "Error al procesar el pago intente nuevamente";
            onToggleSnackBar(dato);
            setLoading(false);
        }      
        setLoading(false);


    }

    return (
        <>
        <StatusBarCustom bgC={colors.indigo} barstyle="light-content" />
        <View style={Styles.font} ></View>
        <SafeAreaView style={Styles.container}>
            <Card setOnChange={setOnChange} setTextCard={setTextCard} />
            
            <FAB
                label={`Pagar: $${params?.totalPayment}`}
                style={[Styles.fab, formStyle.btnSuccess]}
                color= "#fff"                
                icon="credit-card-outline"
                loading={loading}
                onPress={Pagar}
            />
            <Message visible={visible} onDismissSnackBar={onDismissSnackBar} msg={msg} />

        </SafeAreaView>
        </>
    )
}
const Styles = StyleSheet.create({
    container:{
        padding:10,
        flex: 1,
        marginTop: 100,
        
        //position
        //flexDirection: "column-reverse"
    },
    inputContainer:{
        borderBottomWidth: 1,  borderBottomColor: "blue"
    },
    fab: {
        position: 'absolute',
        //margin: 16,
        marginRight: 115,
        justifyContent: "center",
        alignItems:"center",
        right: 0,
        bottom: 0,
      },
}) 
/*
 


*/