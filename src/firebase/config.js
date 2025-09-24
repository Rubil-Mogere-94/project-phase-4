// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjz9BI5Hif_irE0pJjPL8TQikZHxxz7JI",
  authDomain: "ishop4u-61592.firebaseapp.com",
  projectId: "ishop4u-61592",
  storageBucket: "ishop4u-61592.appspot.com",
  messagingSenderId: "525450132928",
  appId: "1:525450132928:web:2a071cca6015f0c0ab9c25",
  measurementId: "G-Z4Z0EYDHCQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);