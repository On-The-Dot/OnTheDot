// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import type { FirebaseOptions } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions= {
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

export { db };
