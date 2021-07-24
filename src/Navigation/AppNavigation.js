import React from 'react'
import {StyleSheet} from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductStack from "./ProductStack";
import Favoritos from "../pantallas/Favoritos";
import Carrito from "./CarritoStack";
import colors from "../style/colors"
import AccountStack from "./AccountStack";
const Tab = createMaterialBottomTabNavigator();
export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Home"
                activeColor={colors.warning}
                inactiveColor="#f0edf6"
                barStyle={ Styles.Nav } >
                <Tab.Screen name="Home" component={ProductStack} headerShown options={{ tabBarLabel: 'Productos',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),}} />
                <Tab.Screen name="Favoritos" component={Favoritos} options={{ tabBarLabel: 'Favoritos',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="heart" color={color} size={26} />
                    ),}} />
                <Tab.Screen name="Carrito" component={Carrito} options={{ tabBarLabel: 'Carrito',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cart" color={color} size={26} />
                    ),}} />
                <Tab.Screen name="Account" component={AccountStack} options={{ tabBarLabel: 'Cuenta',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account-details-outline" color={color} size={26} />
                    ),}} />
                                
            </Tab.Navigator>
        </NavigationContainer>
    );
}
const Styles = StyleSheet.create({
    Nav:{
        backgroundColor: colors.indigo,
    }
})
