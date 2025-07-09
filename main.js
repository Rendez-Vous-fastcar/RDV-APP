import { messaging, getToken, onMessage } from './firebase-config';

const vapidKey = "LA_TUA_CHIAVE_VAPID_WEB_PUSH";

Notification.requestPermission().then(permission => {
  if (permission === "granted") {
    getToken(messaging, { vapidKey }).then(token => {
      console.log("FCM Token:", token);
      fetch("/.netlify/functions/saveToken", {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: { "Content-Type": "application/json" },
      });
    });
  }
});

onMessage(messaging, payload => {
  console.log("Messaggio ricevuto:", payload);
});
