import { API_URL } from "../utils/constants";

export async function getAddressesApi(auth,signal){
    try {
        const url = `${API_URL}/addresses?user=${auth.idUser}`;
        const params = {
            signal,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
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
export async function AddAddressApi(auth,address,signal){
    try {
        const url = `${API_URL}/addresses`;
        const params = {
            signal,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify({ user: auth.idUser, ...address }),
        }
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function DeleteAddressApi(auth,idAddress,signal){
    try {
        const url = `${API_URL}/addresses/${idAddress}`;
        const params = {
            signal,
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
        }
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function getAddressApi(auth, idAddress, signal){
    try {
        const url = `${API_URL}/addresses/${idAddress}`;
        const params = {
            signal,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
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
export async function UpdateAddressApi(auth,address,signal){
    try {
        const url = `${API_URL}/addresses/${address._id}`;
        const params = {
            signal,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify(address), 
        }
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

