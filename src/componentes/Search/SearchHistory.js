import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions,TouchableOpacity, Modal } from 'react-native'
import {  Button } from 'react-native-paper';
import { getSearchHistoryApi, deleteSearchHistoryApi } from '../../api/Search';
import { map } from "lodash"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../style/colors';
export default function SearchHistory(props) {
    const { ShowHistory, containerHeight, onSearch } = props;
    const [history, setHistory] = useState(null)
    useEffect(() => {
      if(ShowHistory){
          ( async () => {
              const response = await getSearchHistoryApi();
              setHistory(response);
          })();
      }
    }, [ShowHistory]);
    
    const deleteSearch = async (position) => {
        await deleteSearchHistoryApi(position);
        const response = await getSearchHistoryApi();
        setHistory(response);
    }
    return (
        <View style={[ShowHistory ? Styles.history : Styles.hidden, { top: containerHeight } ]} >
            {history && (
                map(history, (item, index) => (
                    <TouchableOpacity key={index} onPress={ () => onSearch(item.query) } >
                        <View style={Styles.itemHistory} >
                            <Text style={Styles.text}>
                                { item.query }
                                <MaterialCommunityIcons name="arrow-right" size={20}/>
                            </Text>
                            <Button onPress={ () => { deleteSearch(index)} } >X</Button>
                        </View>
                        
                    </TouchableOpacity>
                   
                ))
            )}
        </View>
    )
}
const Styles = StyleSheet.create({
    hidden: {
        display: "none"
    },
    history: {
        position: "absolute",
        backgroundColor: colors.bgLight,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    itemHistory: {
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between", 
        borderWidth: 0.2,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        width: "100%",
    },
    text: {
        fontWeight: "bold",
        fontSize:16
    
    },


})