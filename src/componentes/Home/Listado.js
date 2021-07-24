import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Subheading,   } from "react-native-paper"
import { map } from "lodash"
import { API_URL } from '../../utils/constants';
import { useNavigation } from "@react-navigation/native"
import colors from '../../style/colors';
export default function Listado(props) {
    const { products } = props;
    const nav = useNavigation();
    const GoToProduct = (id) => {
        nav.push("ProductDetails", { idProd: id});
    } 
    return (
        <View style={Styles.container}>
            { map(products, (product) => (
                <Card key={product._id} elevation={20} mode="elevated" style={Styles.CardProd} onPress={ () => GoToProduct(product._id) }>
                    <Card.Cover source={{ uri: `${API_URL}${product.main_image.url}` }} />
                    <Card.Content>
                        <Subheading numberOfLines={1} style={{color: colors.fontLight}}> {product.title} </Subheading>
                    </Card.Content>

                </Card>
            ))}
        </View>
    )
}
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",

    },
    CardProd:{
        marginBottom: 20,
        width: "48%",
        padding: 5,
        backgroundColor: colors.success
    },
})