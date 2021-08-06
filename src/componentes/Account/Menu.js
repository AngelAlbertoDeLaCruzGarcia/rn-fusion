import React from 'react'
import { View, Alert, StyleSheet } from 'react-native'
import {List} from "react-native-paper"
import colors from "../../style/colors"
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../hooks/useAuth'
export default function Menu() {
    const { logout } = useAuth();
    const nav = useNavigation();
    const logoutAccount = () => {
        Alert.alert(
            "Cerrar Sesión","¿Esta seguro que desea salir de tu cuenta",
            [
                { text: "No", },
                { text: "Si", onPress: logout, },
            ],
            { cancelable:false }
        )
    }
    return (
        <>
        <List.Section>
            <List.Subheader>Mi cuenta</List.Subheader>
            <List.Item title="Cambiar nombre" description="Cambiar nombre de tu cuenta"
                left={ (props) => <List.Icon {...props} icon="face" color={colors.success}/> } 
                onPress = { () => nav.navigate("ChangeName") }
            />
            <List.Item title="Cambiar E-mail" description="Cambiar E-mail de tu cuenta"
                left={ (props) => <List.Icon {...props} icon="at" color={colors.success}/> } 
                onPress = { () => nav.navigate("ChangeEmail") }
            />
            <List.Item title="Cambiar username" description="Cambiar nombre de usuario tu cuenta"
                left={ (props) => <List.Icon {...props} icon="sim" color={colors.success}/> } 
                onPress = { () => nav.navigate("ChangeUsername") }
            />
            <List.Item title="Cambiar contraseña" description="Cambiar contraseña de tu cuenta"
                left={ (props) => <List.Icon {...props} icon="key" color={colors.success}/> }
                onPress={ () => nav.navigate("ChangeContra")  }
            />
            <List.Item title="Mis direcciones" description="Administra tus direcciones de envio de pedidos"
                left={ (props) => <List.Icon {...props} icon="map" color={colors.success}/> }
                onPress={ () => nav.navigate("Addresses")  }
            />
            
        </List.Section>
        <List.Section>
            <List.Subheader>App</List.Subheader>
            <List.Item title="Pedidos" description="Ver mis pedidos"
                left={ (props) => <List.Icon {...props} icon="clipboard-list" color={colors.success}/> }
                onPress={ () => nav.navigate("Order")  }
            />
            <List.Item title="Lista de deseos" description="Productos que te quieres comprar"
                left={ (props) => <List.Icon {...props} icon="heart" color={colors.success}/> }
                onPress={ () => nav.navigate("Favoritos")  }
            />
            <List.Item title="Cerrar sesión" description="Cierra esta sesion e inicia con otra"
                left={ (props) => <List.Icon {...props} icon="logout" color={colors.success}/> }
                onPress={ logoutAccount }
            />
        </List.Section>
        </>
        
    )
}
const Styles = StyleSheet.create({

})