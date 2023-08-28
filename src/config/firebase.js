import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDMibINYDA4MQphdbZSn8AxwbLRe2njxmQ",
  authDomain: "ninasocial-56a0f.firebaseapp.com",
  projectId: "ninasocial-56a0f",
  storageBucket: "ninasocial-56a0f.appspot.com",
  messagingSenderId: "1019342048127",
  appId: "1:1019342048127:web:dea6de2bf715707d16284a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
