import React, {useState, useEffect} from 'react'
import { View, Text, ScrollView } from 'react-native'
import StatusBar from '../../componentes/StatusBarCustom';
import Search from '../../componentes/Search';
import LoadingSearch from '../../componentes/LoadingSearch';
import NoFoundSearch from "./NoFoundSearch"
import { size } from "lodash"
import { searchProductsApi } from '../../api/Search';
import ProductList from '../../componentes/Search/ProductList';
import colors from '../../style/colors';
export default function SearchProducts(props) {
    const { route } = props;
    const { params } = route; 
    const [products, setProducts] = useState(null);
    useEffect(() => {
      (async () => {
          setProducts(null);
          let controller = new AbortController();
          let signal = controller.signal;
          const response = await searchProductsApi(params.Search,signal);
          controller.abort();
          setProducts(response);
      })() 
    }, [params.Search])

    return (
        <>
            <StatusBar bgC={colors.indigo} barstyle="light-content"/>
            <Search currentSearch={params.Search} />
            {!products ? (
                <LoadingSearch />
            ) : size(products)===0 ? (
                <NoFoundSearch prod={params.Search}/>
            ) :(
                <ScrollView >
                    <ProductList products={products} />
                </ScrollView>
            )}

        </>
    )
}
