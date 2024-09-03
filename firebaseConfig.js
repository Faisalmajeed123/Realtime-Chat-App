// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use

import {getReactNativePersistence, initializeAuth} from 'firebase/auth'
import {getFirestore, collection} from'firebase/firestore'
import AsyncStorage from "@react-native-async-storage/async-storage"; 
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtJ25tsnE9bbrjwY5p89KGdub9ov3XmTE",
  authDomain: "chat-app-fc858.firebaseapp.com",
  projectId: "chat-app-fc858",
  storageBucket: "chat-app-fc858.appspot.com",
  messagingSenderId: "69564527479",
  appId: "1:69564527479:web:a2885fb758e7ec79b02772"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app,{
  persistence:  getReactNativePersistence(AsyncStorage)
})

export const db= getFirestore(app)

export const userRef= collection(db, 'users')
export const roomRef= collection(db, 'rooms')