import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Title } from 'react-native-paper'
export default function NoFoundSearch(props) {
    const { prod } = props;
    return (
        <View style={Styles.container} >
            <Title>No se encuentran resultados para: </Title>
            <Title>{prod}</Title>
        </View>
    )
}
const Styles = StyleSheet.create({
    container: {
        padding:20,
        alignItems: "center"
    },
})