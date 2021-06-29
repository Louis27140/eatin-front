importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyCo2kAEcUAUYPcz8ltp5_IFU58aEtBh1II",
    authDomain: "cesi-push-notifications.firebaseapp.com",
    projectId: "cesi-push-notifications",
    storageBucket: "cesi-push-notifications.appspot.com",
    messagingSenderId: "906652977705",
    appId: "1:906652977705:web:7daa2976da891c44acaa38",
    measurementId: "G-N6BEC3WH49"
  };

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    // Customize notification here
    const notificationTitle = 'Eatin';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };
    self.registration.showNotification(notificationTitle,
        notificationOptions);
});