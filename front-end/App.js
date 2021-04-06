import React, { useState, useEffect, useRef } from 'react';
//Context API


import Auth from './src/Context/Store/Auth'
// การโหลด Fonts
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

// [1]Navigation [2]Redux
import AppNavigation from './src/screens/AppNavigation'
import { Provider } from 'react-redux';
import store from './store/store'
import Toast from 'react-native-toast-message'

import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

const fetchFonts = () => {
  return Font.loadAsync({
    'pr-light': require('./assets/fonts/Prompt-Light.ttf'),
    'pr-reg': require('./assets/fonts/Prompt-Regular.ttf'),
    'pr-bold': require('./assets/fonts/Prompt-Bold.ttf'),
  })
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});



async function registerForPushNotificationsAsync() {
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
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    this.setState({ expoPushToken: token });
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
};


export default function App() {


  const [fontLoaded, setFonLoaded] = useState(false);
  // const [expoPushToken, setExpoPushToken] = useState('');
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();


  // useEffect(() => {
  //   registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

  //   // This listener is fired whenever a notification is received while the app is foregrounded
  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     setNotification(notification);
  //   });

  //   // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response);
  //   });

  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener.current);
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => {
      setFonLoaded(true)
    }} />
  }

  return (

    <Auth>


      <Provider store={store}>

        <AppNavigation />
        <Toast ref={(ref) => Toast.setRef(ref)}></Toast>

      </Provider>
    </Auth>
  )
}

// สำหรับ request แทนเว็ป https://expo.io/notifications
// async function sendPushNotification(expoPushToken) {
//   const message = {
//     to: expoPushToken,
//     sound: 'default',
//     title: 'Original Title',
//     body: 'And here is the body!',
//     data: { someData: 'goes here' },
//   };

//   await fetch('https://exp.host/--/api/v2/push/send', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Accept-encoding': 'gzip, deflate',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(message),
//   });
// }