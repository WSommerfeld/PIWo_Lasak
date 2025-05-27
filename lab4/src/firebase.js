import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-Xeisvhv8TltSuDl6b-_TN7f_vHarnVM",
  authDomain: "piwo3slowo.firebaseapp.com",
  projectId: "piwo3slowo",
  storageBucket: "piwo3slowo.firebasestorage.app",
  messagingSenderId: "876754197834",
  appId: "1:876754197834:web:7bd5a098c7bf66de6575b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();