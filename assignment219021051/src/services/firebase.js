import "firebase/auth"
import "firebase/firestore"
import "firebase/database"

// var firebaseConfig = {
//     apiKey: "AIzaSyAfEVAwPWMCTONip2F-BLNBFSKaboI2dcE",
//     authDomain: "assignment219021051.firebaseapp.com",
//     databaseURL: "https://assignment219021051-default-rtdb.firebaseio.com",
//     projectId: "assignment219021051",
//     storageBucket: "assignment219021051.appspot.com",
//     messagingSenderId: "840797994786",
//     appId: "1:840797994786:web:d76e713a7859d7049e2f7b",
//     measurementId: "G-DFN4F9F0J5"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);

//   export const auth = firebase.auth;
//   export const firestore = firebase.firestore();
//   export const db = firebase.database();



import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyAfEVAwPWMCTONip2F-BLNBFSKaboI2dcE",
  authDomain: "assignment219021051.firebaseapp.com",
  databaseURL: "https://assignment219021051-default-rtdb.firebaseio.com",
  projectId: "assignment219021051",
  storageBucket: "assignment219021051.appspot.com",
  messagingSenderId: "840797994786",
  appId: "1:840797994786:web:d76e713a7859d7049e2f7b",
  measurementId: "G-DFN4F9F0J5"
});

export const auth = firebase.auth;
export const firestore = firebase.firestore();
export const db = firebase.database();
export default firebaseConfig;