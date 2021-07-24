import AsyncStorage from "@react-native-async-storage/async-storage";
import { size, map, filter } from "lodash";
import { CART } from "../utils/constants";
import { API_URL } from "../utils/constants";
export async function GetProductCartApi(){
    try {
        const cart = await AsyncStorage.getItem(CART);
        if(!cart) return[];
        return JSON.parse(cart);
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function AddProductApi(idProduct, Quantity , Inventary){
    try {
        const cart = await GetProductCartApi();
        if(!cart) throw "Error al obtener carrito";
        let found = false, total = 0, change = false ;

        map( cart, (product) =>{
            if( product.idProduct === idProduct ){
                total = product.Quantity + Quantity;
                found = true;
                if(total <= Inventary){
                    product.Quantity += Quantity;
                    change = true;
                    return product;
                }
            }
        });
        if (!found){
            cart.push({
                idProduct,
                Quantity
            });
            change = true;
        }
        AsyncStorage.setItem(CART, JSON.stringify(cart) );
        if(change) return true; else return false;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function DeleteProductCartApi(idProduct){
    try {
        const cart = await GetProductCartApi();
        const newCart = filter (cart, (product) => {
            return product.idProduct !== idProduct;
        });
        await AsyncStorage.setItem( CART, JSON.stringify(newCart) );
        return true;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function IncrementProductCartApi(idProduct){
    try {
        const cart = await GetProductCartApi();
        map(cart, (product) => {
            if(product.idProduct === idProduct)
                return (product.Quantity++)
        })
        await AsyncStorage.setItem(CART, JSON.stringify(cart));
        return true;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function DecrementProductCartApi(idProduct){
    let isDelete = false;
    try {
        const cart = await GetProductCartApi();
        map(cart, (product) => {
            if(product.idProduct === idProduct){
                if( product.Quantity === 1 ){
                    isDelete = true;
                    return null; 
                }else{
                    return (product.Quantity--);
                }
            }
        })
        if(isDelete)
            await DeleteProductCartApi(idProduct);
        else
            await AsyncStorage.setItem(CART, JSON.stringify(cart));
        return true;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function DeleteCartApi(){
    try {
        await AsyncStorage.removeItem(CART);
        return true;
    } catch (error) {
        console.log(error);
        return null;
    }
}