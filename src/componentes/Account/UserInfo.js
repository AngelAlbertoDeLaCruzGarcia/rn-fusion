import React, { useState, useCallback } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import colors from '../../style/colors';

export default function UserInfo(props) {
    const { user } = props;

    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>
                {user.name && user.lastname 
                    ? ` ${user.name} ${user.lastname}` 
                    : ` ${user.email}`
                }
            </Text>

        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        height:50,
        padding:20,
       //marginTop:"10%",
    },
    title: {
        fontSize:20,
    },
});

