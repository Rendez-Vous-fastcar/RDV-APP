import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBPLipRWjaEF593Png2nxqtyp8jerPWR-g",
    authDomain: " rendez-vous-app-1c51d.firebaseapp.com",
    projectId: "rendez-vous-app-1c51d",
    storageBucket: "rendez-vous-app-1c51d.firebasestorage.app",
    messagingSenderId: "29990031063",
    appId: "1:29990031063:web:aa2952f0533a182d4daa92",
    measurementId: "G-YPJ47QN9P7",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
