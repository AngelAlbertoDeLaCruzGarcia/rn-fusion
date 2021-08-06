import React,{useState, useMemo, useEffect, useRef, useCallback} from 'react';
import { Platform } from 'react-native';
import { Provider as PaperProvider} from "react-native-paper";
import jwtDecode from "jwt-decode"
import Auth from "./src/pantallas/Auth";
import AuthContext from "./src/context/AuthContext";
import { setTokenApi, getTokenApi,removeTokenApi } from "./src/api/Token";
import { size } from 'lodash';
import { GetNotificationApi, DeleteNotificationApi, sendPushNotification, registerForPushNotificationsAsync } from "./src/api/Notification";
import AppNavigation from './src/Navigation/AppNavigation'; 
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [auth, setAuth] = useState(undefined);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [noti, setNoti] = useState(null)
  const [visible, setVisible] = useState(false)
  const notificationListener = useRef();
  const responseListener = useRef();

  ////Mantiene la inicion seciada del usuario incluso cuando se cierra
  useEffect( () => {
    ( async () => {
      let controller = new AbortController();
      const token = await getTokenApi();
      if(token){
        setAuth({
          token,
          idUser:jwtDecode(token).id
        });
      }else
        setAuth(null);
      if(token)
        setInterval(() => {searchNoti(token,jwtDecode(token).id)},10000)
      controller.abort();
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
      // This listener is fired whenever a notification is received while the app is foregrounded
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });      
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    })()
  },[]);
  const login = (user) => {
    setTokenApi(user.jwt);
    setAuth({
      token:user.jwt,
      idUser:user.user._id
    });
  }
  const logout = () => {
    if(auth){      
      let controller = new AbortController();
      removeTokenApi();
      setAuth(null);
      controller.abort();
    }
  }
  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
    }),[auth]
  );
  async function searchNoti(token,idUser)
  {
    let controller = new AbortController();
    let signal = controller.signal;
    let check = false, i = 0;
    const notifi = await GetNotificationApi(token,idUser,signal);
    controller.abort();
    if( notifi[0] != null )
    {
      console.log("entro");
      for(i = 0; i < size(notifi) ; i++){
        if(notifi[i].product.quantity > 0){
          check = true;
        }
      }
      if(check){
        setNoti(notifi);
        setVisible(true);
        console.log(notifi);
      }
    }
  }
  if(visible)
  { 
    let i;
    console.log("checar nottiii");
    for (i = 0; i < noti.length; i++)
    {
      sendPushNotification(expoPushToken,noti[i].product.title);
      console.log(i);
      DeleteNotificationApi(auth,noti[i]._id)
    }
    setVisible(false);
  };

  if(auth === undefined) return null;
  return (
    <AuthContext.Provider value={authData}>
      <PaperProvider>
      {auth ? (
          <AppNavigation/>
        ): (<Auth/>) }
      </PaperProvider>
    </AuthContext.Provider>
  );
}


/*
        {auth ? (
          <AppNavigation/>
        ): (<Auth/>) }
      */
///<Button onPress={logout}>Cerrar sesion</Button>
       