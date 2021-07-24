import React, { useState, useCallback} from 'react'
import {  StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { getFavoritosApi } from '../api/Favorito'
import useAuth from "../hooks/useAuth"
import { size } from 'lodash'
import StatusBarCustom from "../componentes/StatusBarCustom"
import Search from '../componentes/Search'
import Loading from "../componentes/Loading"
import NoFoundFavs from '../componentes/Favoritos/NoFoundFavs'
import FavsList from '../componentes/Favoritos/FavsList'
import colors from '../style/colors'
export default function Favoritos() {
    const { auth } = useAuth();
    const [productsFav, setProductsFav] = useState(null);
    const [reloadFav, setReloadFav] = useState(false)

    useFocusEffect(
        useCallback(
            () => {
                (async () => {
                    let controller = new AbortController();
                    let signal = controller.signal;
                    const response = await getFavoritosApi(auth,signal);
                    setProductsFav(response);
                    controller.abort();
                })();
                
                setReloadFav(false);
            },[reloadFav]
        )
    );

    return (
        <>
            <StatusBarCustom bgC={ colors.indigo } barstyle="light-content" />
            <Search />
            {!productsFav ? (
                <Loading />
            ) : size(productsFav) ===0 ? (
                <NoFoundFavs />
            ) : (
                <FavsList products={productsFav} auth={auth} setReloadFav={setReloadFav} />
            )}
            
        </>

    )
}
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});