import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, StyleSheet } from 'react-native'
import {  Title, Button } from "react-native-paper"
import { map } from "lodash"
import Order from "./Order"

export default function ProductList(props) {
    const { orders } = props;
    return (
        <SafeAreaView style={Styles.container} >
            {map(orders, (order) => (
                    <Order key={order._id} order={order} /> 
                ))
             }
        </SafeAreaView>
    )

}    
const Styles = StyleSheet.create({
    container: {
        padding:10,
    },
    total:{
        alignItems:"flex-end"
    }
});