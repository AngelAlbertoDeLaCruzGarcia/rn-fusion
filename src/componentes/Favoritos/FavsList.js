import React from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { Title } from 'react-native-paper'
import { map }  from "lodash"
import Fav from './Fav'
export default function FavsList(props) {
    const { products, auth, setReloadFav } = props;
    return (
        <ScrollView contentContainerStyle={Styles.container} >
            <Title>Listado de Favoritos</Title>
            {map(products, (item) => (
                <Fav key={item._id} item={item} auth={auth} setReloadFav={setReloadFav} />
            )) }
        </ScrollView>
    )
}
const Styles = StyleSheet.create({
    container: {
        padding: 10,
    },
})