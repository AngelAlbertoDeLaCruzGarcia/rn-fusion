import React, { useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { isFavoritoApi, AddFavoritoApi, DeleteFavoritoApi } from '../../api/Favorito'
import useAuth from "../../hooks/useAuth"
import { size } from "lodash"
import colors from '../../style/colors';
import formStyle from '../../style/forms';
export default function Fav(props) {
    const { product, } = props;
    const { auth } = useAuth();
    const [isFavorito, setIsFavorito] = useState(undefined);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        (async () => {
            let controller = new AbortController();
            let signal = controller.signal;
            const response = await isFavoritoApi(auth,product._id,signal);
            if( size(response) === 0 ) setIsFavorito(false);
            else setIsFavorito(true);
            controller.abort();
    })()
    }, [product])
    const AddProductFav = async() => {
        if(!loading){
            setLoading(true);
            try {
                let controller = new AbortController();
                let signal = controller.signal;
                await AddFavoritoApi(auth,product._id,signal);
                setIsFavorito(true);
                controller.abort();
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
    };
    const DeleteProductFav = async() => {
        if(!loading){
            setLoading(true);
            try {
                let controller = new AbortController();
                let signal = controller.signal;
                await DeleteFavoritoApi(auth,product._id,signal);
                setIsFavorito(false);
                controller.abort();
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }

    }
    if(isFavorito === undefined) return null;
    return (
        <View style={Styles.container}>
            <Button icon="heart" mode="contained" style={isFavorito ? formStyle.btnDelete : formStyle.btnSuccess}
                loading={loading} onPress={ isFavorito ? DeleteProductFav : AddProductFav } > 
                { isFavorito ? "Eliminar Favorito" : "Añadir Favorito"}
            </Button>
        </View>
    )
}
const Styles = StyleSheet.create({
    container: {
        marginTop: 20,
    }
})