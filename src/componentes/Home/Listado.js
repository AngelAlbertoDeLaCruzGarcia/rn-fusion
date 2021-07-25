import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { map } from "lodash"
import Product from './Product';

export default function Listado(props) {
    const { products } = props;
    return (
        <SafeAreaView style={Styles.container}>
            { map(products, (product) => (
                <Product key={product._id} product={product} /> 
            ))}
        </SafeAreaView>
    )
}
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",

    },
})