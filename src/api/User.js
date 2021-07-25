import {API_URL} from "../utils/constants";
export async function registerApi(formData){
    try{
        const url = `${API_URL}/auth/local/register`;
        const params = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        };
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    }catch(error){
        console.log(error);
        return null;
    }
}
export async function loginApi(formData){
    try {
        const url = `${API_URL}/auth/local`;
        const params = {
            method: "POST",
            headers:{ "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        }
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function getMeApi(token,signal){
    try {
        const url = `${API_URL}/users/me`;
        const params = {
            signal,
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        };
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function updateUserApi(auth,data){
    try {
        const url = `${API_URL}/users/${auth.idUser}`;
        const params = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify(data),
        };
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function updatePhotoApi(auth,data){
    console.log(data);
    try {
        const url = `${API_URL}/upload`;
        const params = {
            method: "POST",
            body: data,
            onUploadProgress: (progress) => console.log(progress)
        };
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}