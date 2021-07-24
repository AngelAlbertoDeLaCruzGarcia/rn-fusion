import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Title } from 'react-native-paper'
export default function NoFoundOrders() {
    return (
        <View style={Styles.container} >
            <Title>No hay productos en el carrito</Title>
        </View>
    )
}
const Styles = StyleSheet.create({
    container: {
        padding:20,
        alignItems: "center"
    },
})