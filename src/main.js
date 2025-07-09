import { messaging, getToken, onMessage } from './firebase-config';

const vapidKey = "SXJqoSHFRzWYTEWhDzAKdmDdtO8VVKRNVkFArY7q77c";

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
