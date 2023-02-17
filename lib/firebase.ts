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

// Helper functions
/**
 * Gets a users/{uid} document with username
 * @param {string} username
 */

export async function getUserWithUsername(username: any) {
  // Make a reference to the users collection
  const usersRef = firestore.collection('users');
  // Then run a query where the username is equal to the db username and returns the first hit
  const query = usersRef.where('username', '==', username).limit(1);
  // Then we run the query
  const usersDoc = (await query.get()).docs[0];
  // Then we take the first doc and return it
  return usersDoc;
}

/**
 * Converts a firestore document to JSON
 * @param {DocumentSnapshot} doc
 */
export function postToJSON(doc: { data: () => any; }) {
  const data = doc.data();
  return {
    ...data,
    // Firestore timestamp NOT serializable to JSON
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
