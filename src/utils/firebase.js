import firebase from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCWolFiWx9UQ_hZjj3U2r1oc5x0heFVoI8",
    authDomain: "up2volume-4cbef.firebaseapp.com",
    projectId: "up2volume-4cbef",
    storageBucket: "up2volume-4cbef.appspot.com",
    messagingSenderId: "430745477952",
    appId: "1:430745477952:web:762ccae468a4f04c0690a5"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);