import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB1sEjs4UZGH95YhxkrnJKJHK7s2Epr_wk",
    authDomain: "registration-6dff2.firebaseapp.com",
    projectId: "registration-6dff2",
    storageBucket: "registration-6dff2.appspot.com",
    messagingSenderId: "325592174808",
    appId: "1:325592174808:web:c30a9dc13b25f3a442c7ad"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage();
export const db = getFirestore()
export const provider = new GoogleAuthProvider();
