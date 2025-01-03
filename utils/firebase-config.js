// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9krn4dx1ZgWAP48cctsPbjY4U29DzF2g",
  authDomain: "iot-pruebas-mecdevs.firebaseapp.com",
  databaseURL: "https://iot-pruebas-mecdevs-default-rtdb.firebaseio.com",
  projectId: "iot-pruebas-mecdevs",
  storageBucket: "iot-pruebas-mecdevs.firebasestorage.app",
  messagingSenderId: "202755033053",
  appId: "1:202755033053:web:a11633ca6ab1b752c41834",
  measurementId: "G-RMWLXYQKQH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };