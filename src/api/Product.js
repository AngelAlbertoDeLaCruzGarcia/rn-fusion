import { API_URL } from "../utils/constants";

export async function getProductsApi(limit = 50, signal){
    try {
        const url = `${API_URL}/products?_limit=${limit}&_sort=createAt:DESC`;
        const response = await fetch(url,{signal});
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function getProductApi(id,signal){
    try {
        const url = `${API_URL}/products/${id}`;
        const response = await fetch(url,{signal});
        const result = response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}