import * as firebase from "firebase";

let key = process.env.API_KEY;
let domain = process.env.AUTH_DOMAIN;
let db = process.env.DB_URL;
let project = process.env.PROJECT_ID;
let bucket = process.env.STORAGE_BUCKET;
let sender = process.env.TRACKER_SENDER_ID;
let app = process.env.APP_ID;

const createConfig = () => {
  if (process.env.NODE_ENV !== "production") {
    const config = {
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_WEIGHT_TRACKER_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_WEIGHT_TRACKER_DB_URL,
      projectId: process.env.REACT_APP_WEIGHT_TRACKER_PROJECT_ID,
      storageBucket: process.env.REACT_APP_WEIGHT_TRACKER_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_WEIGHT_TRACKER_SENDER_ID,
      appId: process.env.REACT_APP_WEIGHT_TRACKER_APP_ID,
    };
    console.log("not production");
    return config;
  } else {
    const config = {
      apiKey: key,
      authDomain: domain,
      databaseURL: db,
      projectId: project,
      storageBucket: bucket,
      messagingSenderId: sender,
      appId: app,
    };
    console.log(config);
    return config;
  }
};

// Initialize Firebase
const config = createConfig();
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
