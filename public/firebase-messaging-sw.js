importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "TUA_API_KEY",
  authDomain: "tuo-progetto.firebaseapp.com",
  projectId: "tuo-progetto-id",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
});

const messaging = firebase.messaging();