const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CREDENTIALS))
});

const db = admin.firestore();

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const data = JSON.parse(event.body || "{}");

  if (data.token) {
    await db.collection("tokens").doc(data.token).set({ token: data.token });
    return { statusCode: 200, body: "Token registrato" };
  }

  if (data.title && data.body) {
    const tokensSnapshot = await db.collection("tokens").get();
    const tokens = tokensSnapshot.docs.map(doc => doc.id);

    const message = {
      notification: { title: data.title, body: data.body },
      tokens: tokens
    };

    const response = await admin.messaging().sendEachForMulticast(message);
    return { statusCode: 200, body: JSON.stringify(response) };
  }

  return { statusCode: 400, body: "Richiesta non valida" };
};
