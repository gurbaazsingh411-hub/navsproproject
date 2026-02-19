import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCltmHJp3I09anZSp9qZjUg4q87J6Jhds0",
    authDomain: "navspro-690f5.firebaseapp.com",
    projectId: "navspro-690f5",
    storageBucket: "navspro-690f5.firebasestorage.app",
    messagingSenderId: "20856571168",
    appId: "1:20856571168:web:72cc864f296414c87dc345",
    measurementId: "G-XCLQBMFRVH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
