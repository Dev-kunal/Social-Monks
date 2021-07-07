import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAi2H8N5sPInW9nT6NRNDcPeHHVTgjyMjE",
  authDomain: "social-monks-8520c.firebaseapp.com",
  projectId: "social-monks-8520c",
  storageBucket: "social-monks-8520c.appspot.com",
  messagingSenderId: "1035832963702",
  appId: "1:1035832963702:web:068171f7b386271cc52557",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

export { projectStorage, projectFirestore };
