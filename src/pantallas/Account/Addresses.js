import React, {useCallback, useState} from 'react'
import { StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import { Title, Avatar, Card, IconButton  } from 'react-native-paper';
import colors from '../../style/colors';
import { size } from "lodash"
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getAddressesApi } from '../../api/Address';
import useAuth from "../../hooks/useAuth"
import Load from "../../componentes/Loading"
import Listado from '../../componentes/Address/Listado';
export default function Addresses() {
    const { auth } = useAuth();
    const nav = useNavigation();
    const [addresses, setAddresses] = useState(null);
    const [reloadAddresses, setReloadAddresses] = useState(false);
    useFocusEffect(
        useCallback( () => {
            setAddresses(null);
            ( async () => {
                let controller = new AbortController();
                let signal = controller.signal;
                const response = await getAddressesApi(auth,signal);
                setAddresses(response);
                setReloadAddresses(false);
                controller.abort();
                
            })()    
        },[reloadAddresses])
    )
    

    return (
        <ScrollView style={Styles.container}>
            <Title>Mis direcciones</Title>
            <TouchableOpacity onPress={ () => nav.navigate("AddAddress") }>
                <Card mode="outlined">
                    <Card.Title
                        title="Agregar direccion"
                        left={(props) => <Avatar.Icon {...props} icon="plus" style={Styles.ic} color={colors.bgLight} />}
                        right={(props) => <IconButton {...props} icon="arrow-right" onPress={() => nav.navigate("AddAddress")} />}
                    />
                </Card>
            </TouchableOpacity>
            {!addresses ? (
                
                <Load/>
            
            ) : size(addresses) === 0 ? (
                <Title style={Styles.title} >Crear primera direccion</Title>
            ) : ( 
                <Listado addresses={ addresses } setReloadAddresses={ setReloadAddresses } />
            )}
        </ScrollView>
    )
}
const Styles = StyleSheet.create({
    container:{
        padding:20,
    },
    ic: {
        backgroundColor:colors.success,
    },
    title: {
        marginTop:10,
        alignSelf:"center"

    },
})