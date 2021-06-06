import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCv3jvSciyYzV428T1TKgJVPpgU2AMuwsw",
    authDomain: "chamados-e6313.firebaseapp.com",
    projectId: "chamados-e6313",
    storageBucket: "chamados-e6313.appspot.com",
    messagingSenderId: "514409351547",
    appId: "1:514409351547:web:44aac6e9ef63f92250d5de",
    measurementId: "G-RJ8LLGEY77"
  };

  if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }

      export default firebase;
  