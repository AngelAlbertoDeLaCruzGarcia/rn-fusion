import React, { useState, useEffect, useCallback } from 'react'
import { SafeAreaView, View, StyleSheet, ScrollView } from 'react-native'
import { Button, Title, Text } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { GetProductCartApi } from '../api/Cart';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ProductList from '../componentes/Cart/ProductList';
import { size } from "lodash"
import StatusBarCustom from '../componentes/StatusBarCustom';
import NoFoundProds from '../componentes/Cart/NoFoundProds';
import colors from '../style/colors';

export default function Carrito() {
    const [cart, setCart] = useState(null);
    const [products, setProducts] = useState(null);
    const [reloadProducts, setReloadProducts] = useState(false);
    const [totalPayment, setTotalPayment] = useState(0)

    const nav = useNavigation();
    useFocusEffect(
        useCallback(
            () => {
                setCart(null);
                loadCart();   
            },[]
        )
    );
    useEffect(() => {
        if(reloadProducts){        
            let controller = new AbortController();
            loadCart();
            setReloadProducts(false);
            controller.abort();
        }
    }, [reloadProducts])

    const loadCart = async() => {
        const response = await GetProductCartApi();
        setCart(response);
    }
  
    const GoToAddresses = () => {
        nav.navigate("AddressesList", { products, totalPayment } );
    }

    return (
        <>
            <StatusBarCustom bgC={colors.indigo} barstyle="light-content" />
            {size(cart) === 0 ? (
                <NoFoundProds />
            ) : (
                <KeyboardAwareScrollView extraScrollHeight={25} >
                    <ScrollView>
                        <SafeAreaView style={ Styles.container } >
                        <ProductList cart={cart} products={products} 
                            setProducts={setProducts} setReloadProducts={setReloadProducts}
                            setTotalPayment={setTotalPayment} GoToAddresses={GoToAddresses}
                        />
                        </SafeAreaView>
                    </ScrollView>
                </KeyboardAwareScrollView>
            )}
            
        </>
    )
}
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        ///paddingLeft:20,
    },
    total:{
        alignItems:"flex-end"
    }
});