import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdYwDnlZ8yPf-cF6m4dqPp9xgLhtyaem0",
  authDomain: "cryptosecur-web.firebaseapp.com",
  projectId: "cryptosecur-web",
  storageBucket: "cryptosecur-web.appspot.com",
  messagingSenderId: "328522918925",
  appId: "1:328522918925:web:47db01df477f6ddc93b944",
  measurementId: "G-DKQ85PLMFG",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db, RecaptchaVerifier, signInWithPhoneNumber };
