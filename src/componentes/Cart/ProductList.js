import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {  Title, Button } from "react-native-paper"
import { map } from "lodash"
import { getProductApi } from "../../api/Product"
import Product from "./Product"
import Loading from '../../componentes/Loading'
import formStyle from '../../style/forms';
import Message from '../Message';
let Ahorro = 0,  TotalPaymentTemp = 0;
export default function ProductList(props) {
    const { cart, products, setProducts, setReloadProducts, setTotalPayment, GoToAddresses } = props;
    //Mensaje de snackbar
    const [msg, setMsg] = useState(false);
    const [visible, setVisible] = useState(false);
    const [checkExist, setCheckExist] = useState(null);
    const onToggleSnackBar = (dato) => { 
        setVisible(!visible) 
        setMsg(dato);
    };
    const onDismissSnackBar = () => setVisible(false);
    useEffect(() => {
        setProducts(null);
        (async ()=>{
            let controller = new AbortController();
            let signal = controller.signal;
            const ProductTemp = [];
            let i = 0, check = false;
            Ahorro = 0,  TotalPaymentTemp = 0;
            for await (const product of cart){
                const response = await getProductApi(product.idProduct,signal);
                const price = calcPrice(response.price, response.discount);
                response.priceDesc = price;
                response.quantityCart = cart[i]?.Quantity;
                ProductTemp.push(response);
                TotalPaymentTemp += price * cart[i]?.Quantity;
                i++;
                if(response.quantity < 1 && !check ){
                    check = true;
                }
            }
            controller.abort();
            setProducts(ProductTemp);
            setTotalPayment(TotalPaymentTemp);
            setCheckExist(check);
        })()
    }, [cart])

    return (
        <View >
            <Title>Productos en el carrito</Title>
            {!products ? 
                <Loading />
             : ( 
                map(products, (product, index) => (
                    <Product key={product._id} product={product} cart={cart} 
                    index={index} setReloadProducts={setReloadProducts} 
                    onToggleSnackBar={onToggleSnackBar}
                    /> 
                ))
             )}
             { products && (
                <View>
                    <View style={Styles.total}>
                        <Text>Ahorro total: <Title>${Ahorro}</Title></Text>
                        <Text>Total: <Title>${TotalPaymentTemp}</Title></Text>
                    </View>
                    <Button mode="contained" style={formStyle.btnSuccess} onPress={!checkExist && GoToAddresses} >
                        Continuar compra
                    </Button>
                </View>
             )}
             <Message visible={visible} onDismissSnackBar={onDismissSnackBar} msg={msg} />

        </View>
    )

}    
function calcPrice(price, discount){
    if (!discount) return price;
    const discountAmount = (price * discount) / 100;
    Ahorro += discountAmount;
    return (price - discountAmount).toFixed(2);
};
const Styles = StyleSheet.create({
    total:{
        alignItems:"flex-end"
    }
});