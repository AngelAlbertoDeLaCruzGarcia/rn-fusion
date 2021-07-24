import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function UserInfo(props) {
    const { user } = props;
    return (
        <View style={Styles.container}>
            <Text style={Styles.title}></Text>
            <Text style={Styles.title}>
                {user.name && user.lastname 
                    ? `${user.name} ${user.lastname}` 
                    : `${user.email}`}
            </Text>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        height:50,
        justifyContent:"center",
        padding:20,
    },
    title: {
        fontSize:20,
    }
});