import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAKIhvNPx2kHxkPMzAgNmPk_Ma2RcAgedU",
    authDomain: "chamadosbackend.firebaseapp.com",
    projectId: "chamadosbackend",
    storageBucket: "chamadosbackend.appspot.com",
    messagingSenderId: "1050134390949",
    appId: "1:1050134390949:web:accef063159a39a3e8454c",
    measurementId: "G-D8XNS83MCG"
  };

  
      firebase.initializeApp(firebaseConfig);

      export default firebase;
  