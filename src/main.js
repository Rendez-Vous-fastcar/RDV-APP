import { messaging, getToken, onMessage } from './firebase-config';

const vapidKey = "BKkXRg-ofUpB5iUTYFSNEgrOHtp7KV7aJ9ihZ8a8HvCI2Yx0c0iqklv6E3N3oua0DslfwEvvX_qML9DSr07AXb4";

Notification.requestPermission().then(permission => {
  if (permission === "granted") {
    getToken(messaging, { 
      vapidKey: "BKkXRg-ofUpB5iUTYFSNEgrOHtp7KV7aJ9ihZ8a8HvCI2Yx0c0iqklv6E3N3oua0DslfwEvvX_qML9DSr07AXb4", 
      serviceWorkerRegistration: registration })
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
