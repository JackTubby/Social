// These imports will tell next to bundle these SDK's into our main JS bundle that will be sent down to the client app
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Create obj for firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCV7usb9QXr47RsWRCyS0_aqFr9s9C9ZIw",
  authDomain: "social-c6c75.firebaseapp.com",
  projectId: "social-c6c75",
  storageBucket: "social-c6c75.appspot.com",
  messagingSenderId: "908524301525",
  appId: "1:908524301525:web:9a258823309608e12c865c",
};

// Init our firebase app - Connects our React app to the cloud
firebase.initializeApp(firebaseConfig);

// Export some variables that represent some of the firebase SDK's that we want to work with
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();
