import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import "firebase/firestore";
import * as dotenv from "dotenv";
// dotenv.config();

const apiKey = import.meta.env.REACT_APP_API_KEY;
const domain = import.meta.env.REACT_APP_AUTH_DOMAIN;
const baseURL = import.meta.env.REACT_APP_DATABASE_URL;
const projectID = import.meta.env.REACT_APP_PROJECT_ID;
const storageBucket = import.meta.env.REACT_APP_STORAGE_BUCKET;
const senderID = import.meta.env.REACT_APP_MESSAGING_SENDER_ID;
const appId = import.meta.env.REACT_APP_APP_ID;
const measurementID = import.meta.env.REACT_APP_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey: "AIzaSyDfU6mOcDHfBQKcufkg6cmCNGiFIkAsLZo",
  authDomain: "twitter-database-a9d09.firebaseapp.com",
  databaseURL: "https://twitter-database-a9d09-default-rtdb.firebaseio.com",
  projectId: "twitter-database-a9d09",
  storageBucket: "twitter-database-a9d09.appspot.com",
  messagingSenderId: "211773134489",
  appId: "1:211773134489:web:7fec9611ca83be06400a08",
  measurementId: "G-12873YS1ZY",
};
// const firebaseConfig = {
//   apiKey: `${apiKey}`,
//   authDomain: `${domain}`,
//   databaseURL: `${baseURL}`,
//   projectId: `${projectID}`,
//   storageBucket: `${storageBucket}`,
//   messagingSenderId: `${senderID}`,
//   appId: `${appId}`,
//   measurementId: `${measurementID}`,
// };

// Initialize Firebase
export const App = firebase.initializeApp(firebaseConfig);

export const db = getFirestore(App);

// export const storage = firebase.storage();
export const storage = getStorage(App);
export const storageRef = ref(storage);

export default firebase;
