import firebase from "firebase/app";

const config = {
    apiKey: "AIzaSyA-swlloHc9JUxLrHbakBcuPyOh64kKiKQ",
    authDomain: "biblioteca-66214.firebaseapp.com",
    databaseURL: "https://biblioteca-66214.firebaseio.com",
    projectId: "biblioteca-66214",
    storageBucket: "biblioteca-66214.appspot.com",
    messagingSenderId: "1088730114285"
  };

firebase.initializeApp(config);

export default firebase;
