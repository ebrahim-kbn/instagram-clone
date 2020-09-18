import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAB7K5BK_agb3SLC-U7QjwAFIaK0YmoPjQ",
  authDomain: "instagram-clone-8ad0b.firebaseapp.com",
  databaseURL: "https://instagram-clone-8ad0b.firebaseio.com",
  projectId: "instagram-clone-8ad0b",
  storageBucket: "instagram-clone-8ad0b.appspot.com",
  messagingSenderId: "997098769316",
  appId: "1:997098769316:web:38a32091e74a7d1d4dcf31",
  measurementId: "G-VHTPTY6FWW",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
