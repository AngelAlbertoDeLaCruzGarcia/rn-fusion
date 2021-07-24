import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Title } from 'react-native-paper'
export default function NoFoundFavs() {
    return (
        <View style={Styles.container} >
            <Title>No hay productos Favoritos </Title>
        </View>
    )
}
const Styles = StyleSheet.create({
    container: {
        padding:20,
        alignItems: "center"
    },
})