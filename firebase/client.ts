// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps} from "firebase/app";

import { getAuth } from "firebase/auth";import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCV6WRqdU4gdko8qLGziOoLd13BlbqJ5kk",
  authDomain: "mockprep-97e6a.firebaseapp.com",
  projectId: "mockprep-97e6a",
  storageBucket: "mockprep-97e6a.firebasestorage.app",
  messagingSenderId: "579744254049",
  appId: "1:579744254049:web:da9a38e41c9d2f78df4220",
  measurementId: "G-GJ0VDT3SBN"
};

// Initialize Firebase
const app = !getApps.length?initializeApp(firebaseConfig):getApp();
//const analytics = getAnalytics(appex
export const auth = getAuth(app);
export const db = getFirestore(app);  