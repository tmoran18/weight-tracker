import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyCbCNN5EO6Ab6P1hb7FDNACBrM6JEXdcgI",
  authDomain: "weight-tracker-f9cb0.firebaseapp.com",
  databaseURL: "https://weight-tracker-f9cb0.firebaseio.com",
  projectId: "weight-tracker-f9cb0",
  storageBucket: "weight-tracker-f9cb0.appspot.com",
  messagingSenderId: "943744244319",
  appId: "1:943744244319:web:2eceaccc977f7b8ed2d9ea",
};

// Initialize Firebase
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
