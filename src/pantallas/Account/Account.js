import React,{useState,useCallback} from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Portal, Text } from "react-native-paper"
import {useFocusEffect} from "@react-navigation/native"
import Search from "../../componentes/Search";
import ScreenLoading from "../../componentes/Loading"
import UserInfo from "../../componentes/Account/UserInfo"
import Menu from "../../componentes/Account/Menu"
import {getMeApi} from "../../api/User"
import useAuth from "../../hooks/useAuth";
import StatusBar  from "../../componentes/StatusBarCustom"
import colors from "../../style/colors"
export default function Account() {
    const [user, setUser] = useState(null);
    const { auth } = useAuth();

    useFocusEffect( 
        useCallback( () => {
            ( async () => { 
                let controller = new AbortController();
                let signal = controller.signal;
                const response = await getMeApi(auth.token,signal);
                controller.abort();
                setUser(response);
            })();
        },[]) 
    );
    return (
        <>
            <StatusBar bgC={colors.indigo} barstyle="light-content" />
            {!user ? ( <ScreenLoading /> ) : ( 
                <>
                <Search/>
                <ScrollView>
                    <UserInfo user={user} />
                    <Menu/>
                </ScrollView>
                </>
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