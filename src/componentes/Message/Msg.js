import React from 'react'
import { View } from 'react-native'
import {Snackbar } from "react-native-paper";

export default function Msg(props) {
    const {onDismissSnackBar, visible, msg} = props;
    return (
        <View>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                label: 'X',
                onPress: () => {
                    // Do something
                },
                }}>
                {msg}
            </Snackbar>
        </View>
    )
}
