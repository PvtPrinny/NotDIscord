// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVOETbgYABbu6Pvv1gT5MHcmHWkAi38OI",
  authDomain: "notdiscord-1ecc3.firebaseapp.com",
  projectId: "notdiscord-1ecc3",
  storageBucket: "notdiscord-1ecc3.appspot.com",
  messagingSenderId: "817140943151",
  appId: "1:817140943151:web:2c875c2d69eb6f36f3b9da",
  measurementId: "G-WX65H7PN1J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // email/password login
export const googleProvider = new GoogleAuthProvider(); // google login
export const db = getFirestore(app); // database fetch from firestore