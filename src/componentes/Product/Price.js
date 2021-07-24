import React from 'react'
import { View,  StyleSheet } from 'react-native'
import { Title, Subheading  ,Text } from 'react-native-paper';
import colors from "../../style/colors"
export default function Price(props) {
    const { price, discount } = props;
    const calcPrice = (price,discount) => {
        if ( !discount || discount === 0 ) return price;
        const discountAmount = (price * discount)/ 100;
        return ( price-discountAmount ).toFixed(2);
    }
    return (
        <View>
            {discount > 0 && (
                <>
                <View style={Styles.containerPrice} >
                    <Text style={Styles.dataText} >Precio recomendado: </Text>
                    <Text style={[ Styles.dataValue, Styles.oldPrice ]} >${price}</Text>
                </View>
                </>
            )}
            <View style={Styles.containerPrice} >
                    <Text style={Styles.dataText} >Precio: </Text>
                    <Title style={[ Styles.dataValue, Styles.newPrice]} >${ calcPrice(price,discount) } </Title>
            </View>
            {discount > 0 && (
                <>
                <View style={Styles.containerPrice} >
                    <Text style={Styles.dataText} >Ahorras: </Text>
                    <Title style={[ Styles.dataValue]} >
                        ${ ((price*discount)/100).toFixed(2) }  ({discount}%)
                    </Title>
                </View>
                </>
            )}
        </View>
    )
}
const Styles = StyleSheet.create({
    containerPrice: {   
        alignItems : "center", 
        flexDirection: "row",
    },
    dataText: {
        width: "50%",
        fontSize: 18,
        textAlign: "right",
    },
    dataValue: {
        width: "55%",
        fontSize: 18,
        color: colors.green,
        paddingLeft:5,
    },
    oldPrice: {
        textDecorationLine: "line-through"
    },
    newPrice: {
        fontSize: 24,
    }

}) 