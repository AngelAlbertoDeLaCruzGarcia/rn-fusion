import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Title } from 'react-native-paper';
import { getProductsApi } from '../../api/Product'
import Listado from './Listado';
export default function Products() {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        (async () => {
            let controller = new AbortController();
            let signal = controller.signal;
            const response = await getProductsApi(100,signal);
            setProducts(response);
            controller.abort();
        })()
    }, [])
    return (
        <View style={Styles.container}>
            <Title>Productos</Title>
            {products && <Listado products={products} />}
        </View>
    )
}
const Styles = StyleSheet.create({
    container: {
        padding: 10,
    }
})
