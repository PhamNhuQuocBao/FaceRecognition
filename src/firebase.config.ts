// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6jNtT5eZuTZKwCd3TvcUsAW5QI6y5cg4",
  authDomain: "dacn1-8ddd2.firebaseapp.com",
  projectId: "dacn1-8ddd2",
  storageBucket: "dacn1-8ddd2.appspot.com",
  messagingSenderId: "1020920209788",
  appId: "1:1020920209788:web:7d7a1d61867ed72e60c4f9",
  measurementId: "G-MSLSRGMS4L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
const database = getDatabase(app);
export const dbStore = getFirestore(app);
export default database;
