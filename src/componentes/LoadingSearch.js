import React from 'react'
import { Text,StyleSheet, SafeAreaView, Image } from 'react-native'
import imgload from "../../assets/loading/loadSearch.gif"
export default function Loading() {
    return (
        <SafeAreaView style={Styles.loadview}>
                <Image source={imgload} style={Styles.load} />
                <Text>Cargando...</Text>
        </SafeAreaView>
    )
}
const Styles = StyleSheet.create({
    load: {
        width: "100%",
        height: 150,
        resizeMode: "contain",
        marginTop:50,

    },
    loadview: {
        flex: 1,
        justifyContent:"center",
        alignItems:"center",
    },
});
