import { API_URL } from "../utils/constants";
import { size } from "lodash"
export async function isFavoritoApi(auth, idProd, signal){
    try {
        const url = `${API_URL}/favoritos?user=${auth.idUser}&product=${idProd}`;
        const params = {
            signal,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            }
        }
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function AddFavoritoApi(auth, idProd, signal){
    try {
        const url = `${API_URL}/favoritos`;
        params ={
            signal,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                product: idProd,
                user: auth.idUser
            })
        }
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function DeleteFavoritoApi(auth, idProd, signal){
    try {
        const dataFound = await isFavoritoApi(auth,idProd,signal);
        if( size(dataFound) > 0 ){
            const url = `${API_URL}/favoritos/${dataFound[0]?._id}`;
            const params = {
                signal,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.token}`
                },
            }
            const response = await fetch(url,params);
            const result = await response.json();
            return result;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function getFavoritosApi(auth, signal){
    try {
        const url = `${API_URL}/favoritos?user=${auth.idUser}`;
        const params = {
            signal,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            }
        }
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return [];
    }
}