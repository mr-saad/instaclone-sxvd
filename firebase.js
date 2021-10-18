import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB0h0XKOcG21cf0XlZnMcJhV5OqWSCZNN4",
  authDomain: "insta-clone-sxvd.firebaseapp.com",
  projectId: "insta-clone-sxvd",
  storageBucket: "insta-clone-sxvd.appspot.com",
  messagingSenderId: "224472588744",
  appId: "1:224472588744:web:795f818a6dea3797bda0fd",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
