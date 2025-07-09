import { messaging, getToken, onMessage } from './firebase-config';

const vapidKey = "BOmAfc-7AblrhBtAop_N6nK37BJZqakYaNoQWYnPbmikmbOFsMghlBp6aG6Mv2rjW9giSyyhn-hfm8JLxFvdAJc";

Notification.requestPermission().then(permission => {
  if (permission === "granted") {
    getToken(messaging, { vapidKey: "BOmAfc-7AblrhBtAop_N6nK37BJZqakYaNoQWYnPbmikmbOFsMghlBp6aG6Mv2rjW9giSyyhn-hfm8JLxFvdAJc", 
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
