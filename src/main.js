import { messaging, getToken, onMessage } from './firebase-config';

const vapidKey = "SXJqoSHFRzWYTEWhDzAKdmDdtO8VVKRNVkFArY7q77c";

Notification.requestPermission().then(permission => {
  if (permission === "granted") {
    getToken(messaging, { vapidKey: "SXJqoSHFRzWYTEWhDzAKdmDdtO8VVKRNVkFArY7q77c", serviceWorkerRegistration: registration })
      .then((currentToken) => {
        if (currentToken) {
          fetch('/.netlify/functions/saveToken', {
            method: 'POST',
            body: JSON.stringify({ token: currentToken }),
          });
        }
      });
  }
});

onMessage(messaging, payload => {
  console.log("Messaggio ricevuto:", payload);
});
