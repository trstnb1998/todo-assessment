// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3DfN9bWD4X74yJq2yvBuLUueLjNfMQ3E",
  authDomain: "react-test-83908.firebaseapp.com",
  projectId: "react-test-83908",
  storageBucket: "react-test-83908.appspot.com",
  messagingSenderId: "517042318646",
  appId: "1:517042318646:web:b576b74e135719f860d797",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const signIn = () => {
  return signInAnonymously(auth);
};

export { app, db, auth, signIn };
