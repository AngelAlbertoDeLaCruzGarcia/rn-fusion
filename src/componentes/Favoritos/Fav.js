import React, { useState } from 'react'
import { View, Image, StyleSheet, ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import { Avatar, Card, Title, Subheading, Button, IconButton  } from "react-native-paper"
import { API_URL } from '../../utils/constants';
import { useNavigation } from "@react-navigation/native"
import { DeleteFavoritoApi } from "../../api/Favorito"
import formStyle from "../../style/forms"
import colors from '../../style/colors';
export default function Fav(props) {
    const { item, auth, setReloadFav } = props; 
    const { product } = item; 
    const [loading, setLoading] = useState(false);
    const nav = useNavigation();
  
    const calcPrice = (price, discount) => {
        if (!discount) return price;
        const discountAmount = (price * discount) / 100;
        return (price - discountAmount).toFixed(2);
    };
  
    const GoToProduct = (id) => {
        nav.navigate("ProductDetails", { idProd: id});
    } 
    const deleteFavorite = async (id) => {
        setLoading(true);
        let controller = new AbortController();
        let signal = controller.signal;
        await DeleteFavoritoApi(auth, id, signal);
        controller.abort();
        setReloadFav(true);
        setLoading(false);
    };
    return (
        <TouchableOpacity style={Styles.product} onPress={() => GoToProduct(product._id)}>
            <View style={Styles.containerImage}>
                <Image style={Styles.image} source={{ uri: `${API_URL}${product.main_image.url}`, }} />
            </View>
            <View style={Styles.info}>
                <View>
                    <Text style={Styles.name} numberOfLines={3} ellipsizeMode="tail">
                        {product.title}
                    </Text>
                    <View style={Styles.prices}>
                        <Title style={Styles.currentPrice}>
                            ${calcPrice(product.price, product.discount)} 
                        </Title>
                        <Text style={Styles.oldPrice}>
                        {product.discount > 0 && (
                            <Text>$</Text>
                        )}
                        {product.discount > 0 && (
                            (product.price) 
                        )}
                        </Text>
                    </View>
                </View>
                <View style={Styles.btnsContainer}>
                    <IconButton icon="trash-can-outline" size={23} style={formStyle.btnDelete} color="white"  onPress={() => deleteFavorite(product._id)} />
                </View>
            </View>

            {loading && (
                <View style={Styles.loading}>
                <ActivityIndicator size="large" color="#fff" />
                </View>
            )}
        </TouchableOpacity>    )
}
const Styles = StyleSheet.create({
    product: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        //borderRadius: 5,
        //borderWidth: 0.5,
        //borderColor: "#dadde1",
        backgroundColor:colors.success,

    },
    containerImage: {
        width: "45%",
        height: 200,
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
        flexDirection: "row",
        marginTop: 5,
        alignItems: "flex-end",
    },
    currentPrice: {
        fontSize: 22,
    },
    oldPrice: {
        marginLeft: 7,
        fontSize: 14,
        color: colors.fontLight,
        textDecorationLine: "line-through",
    }, 
    btnsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        position: "relative",
        width: "100%",
    },
    btnDelete: {
        width: 40,
        height: 60,
    },
    loading: {
        backgroundColor: "#000",
        opacity: 0.4,
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 5,
        justifyContent: "center",
    },
})

////                <Card.Cover source={{ uri: `${API_URL}${product.main_image.url}` }} style ={Styles.CoverImage}/>
