const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const tokens = [
  // Inserisci qui i token registrati, oppure prendi da DB o endpoint
];

const message = {
  notification: {
    title: 'Ciao!',
    body: 'Questa è una notifica di prova inviata dal server',
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
