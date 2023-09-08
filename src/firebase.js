// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVd1yng_RDPtadXsUxIVTMI1sYjQWT9ks",
  authDomain: "todo-app-bb390.firebaseapp.com",
  projectId: "todo-app-bb390",
  storageBucket: "todo-app-bb390.appspot.com",
  messagingSenderId: "618100234323",
  appId: "1:618100234323:web:a9774685926c876a3f0ea6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
//initialize authentication to get reference to service
export const auth = getAuth(app);

// export database firestore 
export const db = getFirestore(app);