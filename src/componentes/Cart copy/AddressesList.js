import React, { useEffect } from 'react'
import { View, Text, Alert, StyleSheet } from 'react-native'
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { map } from "lodash"
import { useNavigation } from '@react-navigation/native';
import colors from '../../style/colors';
export default function Listado(props) {
    const { addresses, selectedAddress, setSelectedAddress } = props;
    const nav = useNavigation();
    useEffect(() => {
        addresses && setSelectedAddress(addresses[0]);
    }, [addresses])
    const GoUpdAddress = (idAddress) => {
        nav.navigate("AddAddress", { idAddress });
    }
    return (
        <View style={Styles.container} >
            <Title style={Styles.title} >Direcciones de envio: </Title>
            {map ( addresses, (address) => (
                <Card mode="outlined" key={address._id} onPress={() => setSelectedAddress(address)}
                style={[address._id === selectedAddress?._id && Styles.checked, Styles.card]} >
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
        //backgroundColor: colors.gray,
    },
    containerCard: {
        flexDirection:"row",
    },
    title:{
        marginBottom:10,
    },
    checked:{
        backgroundColor: "#0098d330",
        borderColor: colors.primary
    }

})