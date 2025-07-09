importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBPLipRWjaEF593Png2nxqtyp8jerPWR-g",
  authDomain: "rendez-vous-app-1c51d.firebaseapp.com",
  projectId: "rendez-vous-app-1c51d",
  storageBucket: "rendez-vous-app-1c51d.appspot.com",
  messagingSenderId: "29990031063",
  appId: "1:29990031063:web:aa2952f0533a182d4daa92"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icons/icon-192.png"
  });
});
