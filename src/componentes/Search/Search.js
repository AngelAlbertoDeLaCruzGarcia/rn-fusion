import React, {useState, useEffect} from 'react'
import { View, StyleSheet, Keyboard, Animated, Text, } from 'react-native'
import { Searchbar, Portal } from "react-native-paper";
import { AnimatedIcon,
        inputAnimation, 
        inputAnimationWidth, 
        animatedTransition, 
        animatedTransitionReset, 
        ArrowAnimation } 
from './SearchAnimatation';
import SearchHistory from './SearchHistory';
import { updateSearchHistoryApi } from '../../api/Search';
import { useNavigation } from '@react-navigation/native';
import colors from "../../style/colors"
export default function Search(props) {
    const { currentSearch } = props;
    const nav = useNavigation();
    const [containerHeight, setContainerHeight] = useState(0)
    const [showHistory, setShowHistory] = useState(false)
    const [searchQuery, setSearchQuery] = useState(currentSearch || "");
    const onChangeSearch = (query) => setSearchQuery(query);
    const openSearch= () => {
        animatedTransition.start();
        setShowHistory(true);
    };
    const closeSearch = () => {
        animatedTransitionReset.start();
        Keyboard.dismiss();
        setShowHistory(false);
    };
    const onSearch = async (itemQuery) => {
        const isString = typeof itemQuery === "string";
        closeSearch();
        !isString && await updateSearchHistoryApi(searchQuery);
        nav.navigate("SearchProducts", { Search: isString ? itemQuery : searchQuery } );
    }
    return (
        <View style={Styles.container} onLayout={ (e) => { setContainerHeight(e.nativeEvent.layout.height) } } >
            <View style={Styles.containerInput}>
                <AnimatedIcon name="arrow-left" size={20} style={ [Styles.backArrow, ArrowAnimation ]} 
                onPress={ closeSearch } />
                
                <Animated.View style={[inputAnimation, { width: inputAnimationWidth } ]} >
                    <Searchbar placeholder="Producto" onFocus={openSearch} 
                        onChangeText={onChangeSearch} onSubmitEditing={onSearch} 
                        value={searchQuery}
                    />                    
                </Animated.View>
            </View>
            <Portal>
                <SearchHistory ShowHistory={showHistory} containerHeight={containerHeight} onSearch={onSearch} />
            </Portal>
        </View>
    )
}
const Styles = StyleSheet.create({
    container:{
        backgroundColor: colors.indigo,
        paddingVertical: 10,
        paddingHorizontal: 20,
        zIndex: 1,
    },
    containerInput: {
        position: "relative",
        alignItems: "flex-end"
    },
    backArrow: {
        position: "absolute",
        left: 0,
        top: 15,
        color: colors.bgLight,
    },
})