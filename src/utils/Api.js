import firebaseApp from "./Firebase";
import firebase from "firebase";

const bbdd = firebase.firestore(firebaseApp);

export const isUserAdmin = async (uid) => {
    const response = await bbdd.collection("admins").doc(uid).get();

    return response.exists;
};

//Devuelve el objeto usuario en bruto
export const reAuthenticate = (password) => {
    
    const user = firebase.auth().currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(user.email, password);

    return user.reauthenticateWithCredential(credentials);
};