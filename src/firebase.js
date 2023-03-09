import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
// import "firebase/storage";

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

// Initialize Firebase
export const App = firebase.initializeApp(firebaseConfig);

export const db = getFirestore(App);

export const getDb = () => {
  if (!db) {
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

    const app = initializeApp(firebaseConfig);

    db = getFirestore(app);
  }

  return db;
};

// export const storage = firebase.storage();
export const storage = getStorage(App);
export const storageRef = ref(storage);

export default firebase;
