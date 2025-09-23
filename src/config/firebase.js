import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOPDsZ_Ov2imnIByJ8YfwOlPxF-IKuybI",
  authDomain: "fir-project-eb5fa.firebaseapp.com",
  projectId: "fir-project-eb5fa",
  storageBucket: "fir-project-eb5fa.firebasestorage.app",
  messagingSenderId: "619516544240",
  appId: "1:619516544240:web:312a1b29988c4f8f932e35"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)