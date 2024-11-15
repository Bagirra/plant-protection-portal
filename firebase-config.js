// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD2-uD34cHObkqQ8RE-Q6Dyb2vadfb2WtU",
    authDomain: "plant-49d4d.firebaseapp.com",
    projectId: "plant-49d4d",
    storageBucket: "plant-49d4d.appspot.com",
    messagingSenderId: "531376250260",
    appId: "1:531376250260:web:5990e5414890299a6c0381",
    measurementId: "G-45R61MG9V5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, collection, addDoc, getDocs, query, where };
