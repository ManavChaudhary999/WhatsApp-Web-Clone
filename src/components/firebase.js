import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB-HlX1U1-qRV8XBozOtwcv4sby2PseRjA",
    authDomain: "whatsapp-clone-1361b.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-1361b.firebaseio.com",
    projectId: "whatsapp-clone-1361b",
    storageBucket: "whatsapp-clone-1361b.appspot.com",
    messagingSenderId: "787821171505",
    appId: "1:787821171505:web:ce4005b887cb6622e55610"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
