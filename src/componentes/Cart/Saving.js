import React from 'react'
import { StyleSheet ,View, Text } from 'react-native'

export default function Saving(props) {
    const { price, discount } = props;
    return (
        <View  >
            <Text style={Style.saving}>
                Ahorro: $
                {(((price * discount) / 100).toFixed(2))} ({discount}%) 
            </Text>
        </View>
    )
}
const Style = StyleSheet.create({
    saving: {
        color: '#fff'
    }
})