self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/icon-192.png',
        '/icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const tokens = new Set(); // Salva i token in memoria (per esempio)

app.post('/register-token', (req, res) => {
  const { token } = req.body;
  if (token) {
    tokens.add(token);
    console.log('Token registrato:', token);
    res.sendStatus(200);
  } else {
    res.status(400).send('Token mancante');
  }
});

app.get('/tokens', (req, res) => {
  res.json([...tokens]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server attivo su http://localhost:${PORT}`);
});
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json'); // scaricato da Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const tokens = [/* inserisci qui i token o recuperali dal DB */];

const message = {
  notification: {
    title: 'Ciao!',
    body: 'Questa è una notifica di prova'
  },
  tokens: tokens,
};

admin.messaging().sendMulticast(message)
  .then(response => {
    console.log(response.successCount + ' notifiche inviate con successo');
  })
  .catch(error => {
    console.error('Errore invio notifiche:', error);
  });
