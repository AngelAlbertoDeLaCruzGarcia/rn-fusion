import React from 'react'
import { StatusBar, SafeAreaView } from 'react-native'

export default function StatusBarCustom(props) {
    const { bgC,rest } = props;
    return (
        <>
            <StatusBar backgroundColor={bgC} {...rest}/>
            <SafeAreaView style={{flex: 0, backgroundColor: bgC}} />
        </>
    )
}
