import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBG0rxaKF4WdbQPNu0durPepuXi7H7Ena0",
    authDomain: "letsupgrade-wp.firebaseapp.com",
    projectId: "letsupgrade-wp",
    storageBucket: "letsupgrade-wp.firebasestorage.app",
    messagingSenderId: "98427425526",
    appId: "1:98427425526:web:daa46e06467fe1866b92d7",
    measurementId: "G-LGL6X8N7L5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider, signInWithPopup, signOut };
export default app;
