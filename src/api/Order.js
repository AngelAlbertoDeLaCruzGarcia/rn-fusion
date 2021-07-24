import { API_URL } from "../utils/constants";

export async function GetOrderApi(auth,signal){
    try {
        const url = `${API_URL}/orders?user=${auth.idUser}`;
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