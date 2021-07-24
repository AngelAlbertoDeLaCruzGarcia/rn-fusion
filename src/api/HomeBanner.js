import { API_URL } from "../utils/constants";
export async function getHomeBannerApi(signal){
    try {
        const url = `${API_URL}/home-banners?_sort=position:DESC`;
        const response = await fetch(url,{signal});
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}