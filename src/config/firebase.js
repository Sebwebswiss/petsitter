import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6jpYoUk48ugPRN5QNo5iy_tMm8WrIOcc",
  authDomain: "petsitter-boca.firebaseapp.com",
  projectId: "petsitter-boca",
  storageBucket: "petsitter-boca.firebasestorage.app",
  messagingSenderId: "133561143679",
  appId: "1:133561143679:web:dea394d20a18bd6f48ca4a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db, RecaptchaVerifier, signInWithPhoneNumber };
