import React, { useState, useEffect } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Title } from 'react-native-paper'
import { getProductApi } from '../../api/Product';
import Price from '../../componentes/Product/Price';
import Quantity from '../../componentes/Product/Quantity';
import Buy from '../../componentes/Product/Buy';
import Notification from "../../componentes/Product/Notification"
import Fav from '../../componentes/Product/Fav';
import StatusBarCustom from '../../componentes/StatusBarCustom';

import Slider from '../../componentes/Product/Slider';
import Load from "../../componentes/Loading"
import colors from '../../style/colors';

export default function Product(props) {
    const { route:{ params } } = props;
    const [product, setProduct] = useState(null)
    const [images, setImages] = useState([]);
    const [cant, setCant] = useState(1)
    useEffect(() => {
      ( async () => {        
        let controller = new AbortController();
        let signal = controller.signal;
        const response = await getProductApi(params.idProd,signal);
        setProduct(response);   
        setImages([response.main_image,...response.images]);  
        controller.abort();

      })()
    }, [params])
    const cambiarCant = (cant) => {
        setCant(cant);
    }
    return (
        <>
            <StatusBarCustom bgC={colors.indigo} barstyle="light-content" />
            {! product ? (
                <Load/>
            ): (
            <ScrollView >
                <View style={Styles.container}>
                    <Title>{ product.title }</Title>
                </View>
                <Slider images={images}/>
                <View style={Styles.container}>
                    <Price price={product.price} discount={product.discount} />
                    {product.quantity > 0  ? (
                        <>
                        <Quantity product={product} cant={cant} cambiarCant={cambiarCant} />
                        <Buy product={product} cant={cant} />
                        </>
                    ):(
                        <Notification product={product} />
                    )}
                    <Fav product={product} />
                </View>
            </ScrollView>    
            )}
        </>
    )
}
const Styles = StyleSheet.create({
    container: {
        padding:10,
        paddingLeft:20,
    }
})