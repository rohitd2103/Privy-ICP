import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
        apiKey: "AIzaSyDUFqXS2O87NW7vUpKo_abhLSwxHsA-pXo",
        authDomain: "privy-icp.firebaseapp.com",
        projectId: "privy-icp",
        storageBucket: "privy-icp.firebasestorage.app",
        messagingSenderId: "552499735170",
        appId: "1:552499735170:web:d6a698d2abcb480fb2e29b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider, signInWithPopup };
