importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyCo2kAEcUAUYPcz8ltp5_IFU58aEtBh1II",
    authDomain: "cesi-push-notifications.firebaseapp.com",
    projectId: "cesi-push-notifications",
    storageBucket: "cesi-push-notifications.appspot.com",
    messagingSenderId: "906652977705",
    appId: "1:906652977705:web:7daa2976da891c44acaa38",
    measurementId: "G-N6BEC3WH49"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const messaging  = firebase.messaging()

messaging.setBackgroundMessageHandler(function(payload) {

  console.log(

      "[firebase-messaging-sw.js] Received background message ",

      payload,

  );

  /* Customize notification here */

  const notificationTitle = "Background Message Title";

  const notificationOptions = {

      body: "Background Message body.",

      icon: "/itwonders-web-logo.png",

  };



  return self.registration.showNotification(

      notificationTitle,

      notificationOptions,

  );

});