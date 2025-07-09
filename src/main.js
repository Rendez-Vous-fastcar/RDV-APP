import { messaging, getToken, onMessage } from './firebase-config';

const vapidKey = "BKkXRg-ofUpB5iUTYFSNEgrOHtp7KV7aJ9ihZ8a8HvCI2Yx0c0iqklv6E3N3oua0DslfwEvvX_qML9DSr07AXb4";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      console.log('✅ Service Worker registrato:', registration);

      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const currentToken = await getToken(messaging, {
  vapidKey,
  serviceWorkerRegistration: registration
});

        if (currentToken) {
          console.log("📩 Token FCM:", currentToken);

          await fetch('/.netlify/functions/saveToken', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: currentToken }),
          });
        } else {
          console.warn("⚠️ Nessun token ricevuto");
        }
      }
    } catch (err) {
      console.error("❌ Errore registrazione notifiche:", err);
    }
  });
}

// Gestione messaggi in foreground
onMessage(messaging, (payload) => {
  console.log("🔔 Messaggio ricevuto in foreground:", payload);
});
