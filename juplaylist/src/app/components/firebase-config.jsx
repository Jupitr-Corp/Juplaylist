import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClco-Cs9hlwsW-L8bFIHskk1hRbRe7W9M",
  authDomain: "juplaylist.firebaseapp.com",
  databaseURL:
    "https://juplaylist-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "juplaylist",
  storageBucket: "juplaylist.appspot.com",
  messagingSenderId: "2259549260",
  appId: "1:2259549260:web:336a9b839c580e686288e9",
  measurementId: "G-PEGMD97LWF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const authentication = getAuth(app);
