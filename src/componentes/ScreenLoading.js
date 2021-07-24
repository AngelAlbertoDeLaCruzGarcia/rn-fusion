import React from 'react'
import { Text,StyleSheet,SafeAreaView,ActivityIndicator } from 'react-native'

export default function ScreenLoading(props) {
    const { text, size, color } = props;
    return (
        <SafeAreaView style={Styles.container}>
            <ActivityIndicator size={size} color={color} style={Styles.loading}/>
            <Text style={Styles.title}>{text}</Text>
        </SafeAreaView>
    )
}
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    loading: {
        marginBottom: 10,
    },
    title: {
        fontSize:20,
        
    }
});
