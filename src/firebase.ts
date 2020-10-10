import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAjZNDYUE_b8NL0rD0f7jUwdAGHf_uy3gg",
    authDomain: "imsg-clone.firebaseapp.com",
    databaseURL: "https://imsg-clone.firebaseio.com",
    projectId: "imsg-clone",
    storageBucket: "imsg-clone.appspot.com",
    messagingSenderId: "854800878936",
    appId: "1:854800878936:web:a092474afbc14e547de92d"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  const auth = firebaseApp.auth();

  const provider = new firebase.auth.GoogleAuthProvider();

  export type IDocs = firebase.firestore.DocumentData[];
  
  export {auth, db, provider};

  export const serverTs = () => {
    const ts = firebase.firestore.FieldValue.serverTimestamp();
    return ts;
  };
  