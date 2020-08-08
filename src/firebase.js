import * as firebase from "firebase";

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
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DB_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.TRACKER_SENDER_ID,
      appId: process.env.APP_ID,
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
