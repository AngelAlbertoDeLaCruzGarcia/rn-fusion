import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import {  Title } from "react-native-paper"
import { map } from "lodash"
import { getProductApi } from "../../api/Product"
import Product from "./Product"
import Loading from '../../componentes/Loading'
import Message from '../Message';
let Ahorro = 0;
export default function ProductList(props) {
    const { cart, products, setProducts, setReloadProducts, setTotalPayment } = props;
    //Mensaje de snackbar
    const [msg, setMsg] = useState(false);
    const [visible, setVisible] = useState(false);
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
            let TotalPaymentTemp = 0, i = 0; Ahorro=0;
            for await (const product of cart){
                const response = await getProductApi(product.idProduct,signal);
                ProductTemp.push(response);
                const price = calcPrice(response.price, response.discount)
                TotalPaymentTemp += price * cart[i]?.Quantity;
                i++;
            }
            controller.abort();
            setProducts(ProductTemp);
            setTotalPayment(TotalPaymentTemp) ;
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
             <Title>Ahorro total: ${Ahorro}</Title>
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