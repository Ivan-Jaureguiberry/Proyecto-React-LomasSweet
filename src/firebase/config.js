// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAjqs2ea-UsNL59tXJYg3ErDmlHJbXKb0g",
    authDomain: "proyecto-react-22.firebaseapp.com",
    projectId: "proyecto-react-22",
    storageBucket: "proyecto-react-22.firebasestorage.app",
    messagingSenderId: "845633615903",
    appId: "1:845633615903:web:2850396adfde2fdbcdbd2a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);