import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import Carrito from "../pantallas/Carrito";
import Addresses from '../pantallas/Account/Addresses'
import AddressesBuy from '../pantallas/Buy/AddressesBuy'
import Payment from '../pantallas/Buy/Payment'
import colors from "../style/colors";
const Stack = createStackNavigator();
export default function CarritoStack() {
    return (
        <Stack.Navigator 
            screenOptions={{ 
                headerTintColor: colors.fontLight, 
                headerStyle :{backgroundColor:colors.indigo},
                cardStyle: { backgroundColor:colors.bgLight },
            }} >
            
            <Stack.Screen name="Carrito" component={Carrito} 
            options={{ title: "Carrito", }} />

            <Stack.Screen name="AddressesList" component={AddressesBuy} 
            options={{ title: "Direcciones de entrega", }} />

            <Stack.Screen name="Addresses" component={Addresses} 
            options={{ title: "Direcciones", }} />

            <Stack.Screen name="Payment" component={Payment} 
            options={{ headerShown: false }} />

        </Stack.Navigator>
    )
}
