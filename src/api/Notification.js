import { API_URL } from "../utils/constants";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

export async function AddNotificationApi(auth, idProd){
    try{
        const url = `${API_URL}/notifications`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({ user: auth.idUser, product: idProd})
        }
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    }catch(error){
        console.log(error);
        return null;
    }
}
export async function GetNotificationApi(auth,signal){
    try {
        const url = `${API_URL}/notifications?user=${auth.idUser}`;
        const params = {
            signal,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
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
export async function DeleteNotificationApi(auth,idNoti){
    try {
        const url = `${API_URL}/notifications/${idNoti}`;
        const params = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
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

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
export async function sendPushNotification(expoPushToken , title) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: `${title}`,
        body: '¡Entra para comprar!',
        data: { someData: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}
export async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
}
  