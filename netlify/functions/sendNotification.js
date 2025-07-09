const admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

exports.handler = async (event) => {
  const { title, body } = JSON.parse(event.body || "{}");

  try {
    const db = admin.firestore();
    const snapshot = await db.collection("pushTokens").get();

    const tokens = snapshot.docs.map(doc => doc.data().token);

    if (!tokens.length) {
      return { statusCode: 200, body: JSON.stringify({ message: "Nessun token trovato." }) };
    }

    const message = {
      notification: { title, body },
      tokens,
    };

    const response = await admin.messaging().sendMulticast(message);

    return {
      statusCode: 200,
      body: JSON.stringify({
        successCount: response.successCount,
        failureCount: response.failureCount,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};