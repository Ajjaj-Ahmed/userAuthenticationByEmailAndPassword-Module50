// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBi7b_zE7IrE0b0WXFtsANbyrjXiSJ96mE",
  authDomain: "user-email-password-auth-fa389.firebaseapp.com",
  projectId: "user-email-password-auth-fa389",
  storageBucket: "user-email-password-auth-fa389.appspot.com",
  messagingSenderId: "523369745133",
  appId: "1:523369745133:web:767ac64222aa85d2aa9ae4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth