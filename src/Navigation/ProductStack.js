import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import colors from "../style/colors"
import Home from "../pantallas/Home"
import Product from '../pantallas/Product/Product'
import SearchProducts from '../pantallas/Product/SearchProducts';

export default function ProductStack() {
    Stack = createStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: colors.fontLight,
                headerStyle: { backgroundColor: colors.indigo },
                cardStyle: { backgroundColor: colors.bgLight },
            }} >

            <Stack.Screen name="Product" component={Home}
            options={{ headerShown: false}} />

            <Stack.Screen name="ProductDetails" component={Product}
            options={{ title: "Detalles" }} />

            <Stack.Screen name="SearchProducts" component={SearchProducts}
            options={{ headerShown: false }} />


        </Stack.Navigator>
    )
}
