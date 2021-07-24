import AsyncStorage from "@react-native-async-storage/async-storage";
import { SEARCH_HISTORY } from "../utils/constants";
import { sortArrayByDay } from "../utils/funtions";
import { API_URL } from "../utils/constants";
export async function getSearchHistoryApi(){
    try {
        const history = await AsyncStorage.getItem(SEARCH_HISTORY);
        if(!history) return[];
        return sortArrayByDay(JSON.parse(history));
    } catch (error) {
        console.log(error);
        return[];
    }
}
export async function updateSearchHistoryApi(query){
    const history = await getSearchHistoryApi();
    history.push({ query , Date: new Date() });
    await AsyncStorage.setItem( SEARCH_HISTORY, JSON.stringify(history) );
}
export async function deleteSearchHistoryApi(position){
    const history = await getSearchHistoryApi();
    history.splice(position,1);
    await AsyncStorage.setItem( SEARCH_HISTORY, JSON.stringify(history) );
}
export async function searchProductsApi(query,signal) {
    try {
        const url = `${API_URL}/products?_q=${query}&_limit=40`;
        const response = await fetch(url,{signal});
        const result = response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
