importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBPLipRWjaEF593Png2nxqtyp8jerPWR-g",
  authDomain: "rendez-vous-app-1c51d.firebaseapp.com",
  projectId: "rendez-vous-app-1c51d",
  messagingSenderId: "29990031063",
  appId: "1:29990031063:web:aa2952f0533a182d4daa92",
});

// Inizializza messaging
const messaging = firebase.messaging();

// Opzionale ma utile: gestisci i messaggi in background
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Messaggio in background ricevuto:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png'  // Sostituisci con la tua icona se vuoi
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
