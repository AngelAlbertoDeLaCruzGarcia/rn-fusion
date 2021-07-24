import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import Account from "../pantallas/Account/Account"
import ChangeName from '../pantallas/Account/ChangeName'
import ChangeEmail from "../pantallas/Account/ChangeEmail";
import ChangeUsername from "../pantallas/Account/ChangeUsername";
import ChangeContra from "../pantallas/Account/ChangeContra"
import Addresses from '../pantallas/Account/Addresses'
import AddAddress from '../pantallas/Account/AddAddress'
import Order from '../pantallas/Account/Order'
import colors from "../style/colors";
const Stack = createStackNavigator();

export default function AccountStack() {
    return (
        <Stack.Navigator 
            screenOptions={{ 
                headerTintColor: colors.fontLight, 
                headerStyle :{backgroundColor:colors.indigo},
                cardStyle: { backgroundColor:colors.bgLight },
            }} >
            
            <Stack.Screen name="account" component={Account} 
            options={{ title: "Mi Cuenta", headerShown: false}} />

            <Stack.Screen name="ChangeName" component={ChangeName} 
            options={{ title: "Cambiar nombre", }} />

            <Stack.Screen name="ChangeEmail" component={ChangeEmail} 
            options={{ title: "Cambiar Email", }} />

            <Stack.Screen name="ChangeUsername" component={ChangeUsername} 
            options={{ title: "Cambiar Username", }} />

            <Stack.Screen name="ChangeContra" component={ChangeContra} 
            options={{ title: "Cambiar Contraseña", }} />
            
            <Stack.Screen name="Addresses" component={Addresses} 
            options={{ title: "Direcciones de entrega", }} />

            <Stack.Screen name="AddAddress" component={AddAddress} 
            options={{ title: "Nueva direccion", }} />

            <Stack.Screen name="Order" component={Order} 
            options={{ title: "Mis pedidos", }} />
        </Stack.Navigator>
    )
}
