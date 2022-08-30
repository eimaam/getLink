// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4UQHHktp7vLAW0qhOG0VNLGPx-OmN1oM",
  authDomain: "getlinks-da879.firebaseapp.com",
  projectId: "getlinks-da879",
  storageBucket: "getlinks-da879.appspot.com",
  messagingSenderId: "927669997260",
  appId: "1:927669997260:web:b12d0fa33f9b116cc03c69",
  measurementId: "G-6FBVRP2TNF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getFirestore(app)