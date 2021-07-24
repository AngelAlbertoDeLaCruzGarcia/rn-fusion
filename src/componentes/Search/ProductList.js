import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Subheading, Title } from "react-native-paper"
import { map } from "lodash"
import { API_URL } from '../../utils/constants';
import { useNavigation } from "@react-navigation/native"
import colors from '../../style/colors';
export default function ProductList(props) {
    const { products } = props;
    const nav = useNavigation();
    const GoToProduct = (id) => {
        nav.push("ProductDetails", { idProd: id});
    } 
    return (
        <View style={Styles.container} >
            <Title>Resultados</Title>
            <View style={Styles.containerProd}>
                { map(products, (product) => (
                    <Card key={product._id} elevation={20} style={Styles.CardProd} onPress={ () => GoToProduct(product._id) }>
                        <Card.Cover source={{ uri: `${API_URL}${product.main_image.url}` }} />
                        <Card.Content>
                            <Subheading numberOfLines={1} style={{color: "#fff"}}> {product.title} </Subheading>
                        </Card.Content>

                    </Card>
                ))}
            </View>
        </View>
    )
}
const Styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
    },
    containerProd: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginVertical: 10,
    },
    CardProd:{
        marginBottom: 20,
        width: "48%",
        padding: 5,
        backgroundColor: colors.success
    },
})