import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "@firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCucCCrDjOfP-WFGvGZWkNLAKYHN8Jv0JA",
    authDomain: "chatroom-ac4ca.firebaseapp.com",
    projectId: "chatroom-ac4ca",
    storageBucket: "chatroom-ac4ca.appspot.com",
    messagingSenderId: "520945633433",
    appId: "1:520945633433:web:747678dce703fa7a469008",
    measurementId: "G-DCRFQ6ETGV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };
