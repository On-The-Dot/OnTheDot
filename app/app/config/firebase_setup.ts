// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import type { FirebaseOptions } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCoXpJ5LCtZXURSW3deJabLVzxZbJkKud0",
  authDomain: "onthedot-4604e.firebaseapp.com",
  projectId: "onthedot-4604e",
  storageBucket: "onthedot-4604e.appspot.com",
  messagingSenderId: "389497896685",
  appId: "1:389497896685:web:66aa54cb3db9e4e03896e4",
  measurementId: "G-RXL130NVQP",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };