import React, { useState, useEffect, useCallback } from 'react'
import { SafeAreaView, Text, StyleSheet, ScrollView } from 'react-native'
import { Button } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { GetProductCartApi } from '../api/Cart';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ProductList from '../componentes/Cart/ProductList';
import Payment from '../componentes/Cart/Payment';
import { size } from "lodash"
import { getAddressesApi } from "../api/Address"
import AddressesList from "../componentes/Cart/AddressesList";
import useAuth from "../hooks/useAuth"
import StatusBarCustom from '../componentes/StatusBarCustom';
import NoFoundProds from '../componentes/Cart/NoFoundProds';
import colors from '../style/colors';

export default function Carrito() {
    const [cart, setCart] = useState(null);
    const [products, setProducts] = useState(null);
    const [reloadProducts, setReloadProducts] = useState(false);
    const [addresses, setAddresses] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [cartVisible, setCartVisible] = useState(true)
    const [dirVisible, setDirVisible] = useState(false)
    const [paymentVisible, setPaymentVisible] = useState(false)
    const [totalPayment, setTotalPayment] = useState(1)
    console.log(totalPayment);
    const { auth } = useAuth();
    const nav = useNavigation();
    useFocusEffect(
        useCallback(
            () => {
                setAddresses(null);
                setCart(null);
                setSelectedAddress(null);
                loadCart();
                loadAddresses();
                
            },[]
        )
    );
    useEffect(() => {
        if(reloadProducts){
            loadCart();
            setReloadProducts(false);
        }
    }, [reloadProducts])

    const loadCart = async() => {
        const response = await GetProductCartApi();
        setCart(response);
    }
    const loadAddresses = async() => {
        const response = await getAddressesApi(auth);
        setAddresses(response);
    }
    const GoToAddresses = () => {
        setCartVisible(false);
        setDirVisible(true);
        setPaymentVisible(false);
    }
    const GoToAddress = () => {
        nav.navigate("Addresses");
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
                            setTotalPayment={setTotalPayment}
                        />
                        
                        <Button onPress={ GoToAddress }>Administrar direcciones</Button>
                        <AddressesList addresses={ addresses } 
                        selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress}/>
                    
    
                        <Payment products={products}  selectedAddress={selectedAddress}
                            totalPayment={totalPayment}/>
                        

                             
                            
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
    }
});