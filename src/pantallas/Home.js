import React from 'react'
import { ScrollView } from 'react-native'
import StatusBar from "../componentes/StatusBarCustom"
import Search from '../componentes/Search'
import Products from '../componentes/Home/Products'
import Banners from '../componentes/Home/Banners';
import colors from "../style/colors"
export default function Home() {
    return (
        <>
            <StatusBar bgC={colors.indigo} barstyle="light-content"/>
            <Search/>
            <ScrollView>
                <Banners />
                <Products />
            </ScrollView>
        </>
    )
}
