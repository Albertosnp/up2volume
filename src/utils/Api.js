import firebaseApp from "./Firebase";
import firebase from "firebase";

const bbdd = firebase.firestore(firebaseApp);
export const isUserAdmin = async (uid) => {
    const response = await bbdd.collection("admins").doc(uid).get();
    // console.log(response);
    return response.exists;
};
