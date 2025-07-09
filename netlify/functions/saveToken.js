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

const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  const { token } = JSON.parse(event.body);
  const filePath = path.join(__dirname, 'tokens.json');

  let tokens = [];
  if (fs.existsSync(filePath)) {
    tokens = JSON.parse(fs.readFileSync(filePath));
  }

  if (!tokens.includes(token)) {
    tokens.push(token);
    fs.writeFileSync(filePath, JSON.stringify(tokens));
  }

  return {
    statusCode: 200,
    body: 'Token salvato!',
  };
};
