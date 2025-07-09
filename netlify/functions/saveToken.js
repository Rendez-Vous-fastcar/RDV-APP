const admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

exports.handler = async (event) => {
  const { token } = JSON.parse(event.body);

  try {
    const db = admin.firestore();
    await db.collection("pushTokens").doc(token).set({ token });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Token salvato con successo" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};