import React, { useState } from 'react'
import { View, Image, StyleSheet, ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import { Avatar, Card, Title, Subheading, IconButton, TextInput  } from "react-native-paper"
import { API_URL } from '../../utils/constants';
import { DeleteProductCartApi, IncrementProductCartApi, DecrementProductCartApi} from '../../api/Cart';
import { useNavigation } from "@react-navigation/native"
import Saving from './Saving';
import formStyle from "../../style/forms"
import colors from '../../style/colors';
export default function Product(props) {
    const { product, cart, index, setReloadProducts, onToggleSnackBar } = props; 
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
    const DeleteProductCart = async (id) => {
        const response = await DeleteProductCartApi(id);
        if(response) setReloadProducts(true);
    };
    const IncrementProductCart = async (id) => {
        if( cart[index]?.Quantity + 1 <= product.quantity){
            const response = await IncrementProductCartApi(id);
            if(response) setReloadProducts(true);
        }else{
            const dato = "No se puede ingresar una cantidad mayor al stock.";
            onToggleSnackBar(dato);
        }
    };
    const DecrementProductCart = async (id) => {
        const response = await DecrementProductCartApi(id);
        if(response) setReloadProducts(true);
    };
    return (
        <TouchableOpacity key={product._id} style={[product.quantity > 0 ? Styles.backgroundSuccess : Styles.backgroundDel,  Styles.product]} 
          onPress={() => GoToProduct(product._id)}>
            <View style={Styles.containerImage}>
                <Image style={[product.quantity > 0 ? Styles.backgroundSuccess : Styles.backgroundDel,  Styles.image]}
                    source={{ uri: `${API_URL}${product.main_image.url}`, }} />
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
                        <Text style={Styles.oldPrice} >
                            {product.discount > 0 && (
                                <Saving price={product.price} discount={product.discount} />
                            )} 
                        </Text>
                    </View>
                </View>
                <View style={Styles.btnsContainer}>
                    <View style={Styles.SelectQuantity}>
                        <IconButton icon="plus" size={23} style={formStyle.btnUpdate} color="white" 
                            onPress={() => IncrementProductCart(product._id)} />
                        <TextInput style={Styles.Quantity} keyboardType="numeric" maxLength={3} 
                            value={cart[index]?.Quantity.toString()} />
                        <IconButton icon="minus" size={23} style={formStyle.btnUpdate} color="white"
                            onPress={() => DecrementProductCart(product._id)} />

                        <IconButton icon="trash-can-outline" size={23} style={formStyle.btnDelete} color="white" 
                            onPress={() => DeleteProductCart(product._id)} />
                    </View>

                </View>
            </View>
            {product.quantity < 1  && (
                <View style={Styles.loading}>
                   <Text style={Styles.del} >Producto ya no se encuentra disponible, eliminelo para continuar compra</Text>
                </View>
            )}
        </TouchableOpacity>
    )
}
const Styles = StyleSheet.create({
    product: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        //borderRadius: 5,
        //borderWidth: 0.5,
        //borderColor: "#dadde1",
    },
    containerImage: {
        width: "45%",
        height: 200,
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
    oldPrice: {
        marginLeft: 0,
        fontSize: 14,
        color: colors.fontLight,
        ///textDecorationLine: "line-through",
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
        backgroundColor: colors.dark,
        //opacity: 10,
        position: "absolute",
        width: "100%",
        height: "30%",
        marginTop: "20%",
        borderRadius: 10,
        justifyContent: "center",
    },
    SelectQuantity:{
        flexDirection: "row",
        alignItems: "center",
    },
    Quantity:{
        paddingHorizontal: 10,
        fontSize:16,
    },
    backgroundSuccess: {
        backgroundColor:colors.success,
    },
    backgroundDel: {
        backgroundColor:colors.gray,
    },
    del: {
        color: colors.bgLight,
    }
})
