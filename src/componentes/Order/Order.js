import React, { useState } from 'react'
import { View, Image, StyleSheet, ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import { Title, } from "react-native-paper"
import { API_URL } from '../../utils/constants';
import { useNavigation } from "@react-navigation/native"
import colors from '../../style/colors';
export default function Product(props) {
    const { order } = props; 
    const nav = useNavigation();
    const GoToProduct = (id) => {
        nav.navigate("ProductDetails", { idProd: id});
    } 
    
    return (
        <TouchableOpacity style={Styles.product} onPress={() => GoToProduct(order.product._id)}>
            <View style={Styles.containerImage}>
                <Image style={Styles.image} source={{ uri: `${API_URL}${order.product.main_image.url}`, }} />
            </View>
            <View style={Styles.info}>
                <View>
                    <Text style={Styles.name} numberOfLines={3} ellipsizeMode="tail">
                        {order.product.title}
                    </Text>
                    <View style={Styles.prices}>
                        <Text>
                            Cantidad: { order.quantity }
                        </Text>
                        <Text>
                            Total pagado: ${ order.productsPayment }
                        </Text>
                    </View>
                </View>
            </View>

        </TouchableOpacity>
    )
}
const Styles = StyleSheet.create({
    product: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
        backgroundColor:colors.success,

    },
    containerImage: {
        width: "45%",
        height: 100,
        backgroundColor:colors.success,
        padding: 5,
    },
    image: {
        height: "100%",
        resizeMode: "contain",
    },
    info: {
        padding: 10,
        width: "60%",
        justifyContent: "space-between",
    },
    name: {
        color: colors.fontLight,
    },
    prices: {
        //flexDirection: "row",
        //flexDirection:"column",
        marginTop: 5,
        alignItems: "flex-start",
    },
    currentPrice: {
        fontSize: 22,
    },
 
})
