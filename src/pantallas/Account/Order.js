import React, { useState, useCallback } from 'react'
import { ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { GetOrderApi } from "../../api/Order"
import size from "lodash"
import useAuth from '../../hooks/useAuth';
import Load from "../../componentes/Loading";
import NoFundOrders from "../../componentes/Order/NoFoundOrders"
import OrderList from "../../componentes/Order/OrderList"
import StatusBar from "../../componentes/StatusBarCustom"
import colors from "../../style/colors"

export default function Orders() {
    const [orders, setOrders] = useState(null);
    const { auth } = useAuth();
    useFocusEffect(
      useCallback(() => {
        (async () => {
            let controller = new AbortController();
            let signal = controller.signal;
            const response = await GetOrderApi(auth,signal);
            setOrders(response);
            controller.abort();
        })();
      }, [])
    );
    return (
        <>
            <StatusBar bgC={colors.indigo} barstyle="light-content"/>
            <ScrollView>
                {!orders ? (
                    <Load />
                ) : size(orders) === 0 ?(
                    <NoFundOrders />
                ) : (
                  <OrderList orders={orders} />
                )}
            </ScrollView>

        </>
    )
}
/*

*/