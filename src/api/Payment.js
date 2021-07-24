import { API_URL } from "../utils/constants";

export async function PaymentApi(auth, stripeToken, products, address ){
    try {
        const addressShipping = address;
        delete addressShipping.user;
        delete addressShipping.createdAt;
        const url = `${API_URL}/orders`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                idUser: auth.idUser,
                stripeToken,
                products,
                addressShipping
            }),
        }
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}