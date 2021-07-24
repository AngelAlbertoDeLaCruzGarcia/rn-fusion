import React from 'react'
import { View, Text, Alert, StyleSheet } from 'react-native'
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { map } from "lodash"
import { DeleteAddressApi } from "../../api/Address"
import useAuth from "../../hooks/useAuth"
import formStyle from '../../style/forms';
import { useNavigation } from '@react-navigation/native';
export default function Listado(props) {
    const { addresses, setReloadAddresses } = props;
    const { auth } = useAuth();
    const nav = useNavigation();
    const DeleteAddressAlert = (address) => {
        Alert.alert(
            "Eliminar Direccion",
            `¿Estas seguro que deseas eliminar la direccion ${address.title}?`,
            [
                { text: "No" },
                { text: "Si", onPress: () => DeleteAddress(address._id) },
            ],
            { cancelable: false }
        );
    };
    const DeleteAddress = async(idAddress) => {
        try {                
            let controller = new AbortController();
            let signal = controller.signal;
            await DeleteAddressApi(auth, idAddress,signal);
            controller.abort();
            setReloadAddresses(true);
        } catch (error) {
            console.log(error);
        }
    }
    const GoUpdAddress = (idAddress) => {
        nav.navigate("AddAddress", { idAddress });
    }
    return (
        <View style={Styles.container} >
            {map ( addresses, (address) => (
                <Card mode="outlined" style={Styles.card} key={address._id}>
                    <Card.Content >
                        <Title>{address.title}</Title>
                        <Paragraph>{address.nameComplete}</Paragraph>
                        <Paragraph>{address.address}</Paragraph>
                        <View style={Styles.containerCard}>
                            <Paragraph>{address.city}, </Paragraph>
                            <Paragraph>{address.state}, </Paragraph>
                            <Paragraph>{address.postalCode}</Paragraph>
                        </View>
                        <Paragraph>{address.country}</Paragraph>
                        <Paragraph>Celular: {address.phone}</Paragraph>
                    </Card.Content>
                    <Card.Actions style={Styles.btnActions} >
                        <Button mode="contained" icon="pencil" style={formStyle.btnPrimary}
                            onPress={ () => GoUpdAddress(address._id) }
                        />
                        <Button mode="contained" icon="trash-can-outline" style={formStyle.btnDelete}
                            onPress={ () => DeleteAddressAlert(address) }
                        />
                    </Card.Actions>
                </Card>
            ) ) }
        </View>
    )
}
const Styles = StyleSheet.create({
    container: {
        marginTop:30,
    },
    card: {
        marginBottom:20,
        elevation: 4,
    },
    containerCard: {
        flexDirection:"row",
    },
    btnActions: {
        justifyContent: "space-around",
    }
})