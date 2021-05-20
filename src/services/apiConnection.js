import fireBase from "../utils/Firebase"
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebase from "firebase";
import { toast } from "react-toastify";

const bbdd = fireBase.firestore(fireBase);

/* ------------------------------------- Cerrar session ------------------------------------ */
export const logOutApi = () => {
    fireBase.auth().signOut();
};

/* --------------------------------------  Register Form ----------------------------------- */
//Conecta con Firebase y Registra el nombre de usuario en la bbdd del user actual
export const changeUserNameApi = (userName) => {
    fireBase.auth().currentUser.updateProfile({
        displayName: userName
    })
        .catch(() => toast.error("Error al asignar el nombre de usuario."))
};

//Enviar el email para verificar la cuenta 
export const sendEmailVerificationApi = () => {
    fireBase.auth().currentUser.sendEmailVerification()
        .then(() =>
            toast.success("Se ha enviado un email de verificación."))
        .catch(() =>
            toast.error("Error al enviar el email de verificación."));
};

//Registra al usuario en la bbdd
export const registerUserFirebaseApi = (email, password) => {
    return fireBase
        .auth()
        .createUserWithEmailAndPassword(email, password)
};

/* --------------------------------------  Login Form ----------------------------------- */

//Loguea al usuario
export const loginUserFirebaseApi = (email, password) => {
    return fireBase
        .auth()
        .signInWithEmailAndPassword(email, password)
};

/* --------------------------------------  addSong Form ----------------------------------- */

// Obtiene todos los albumes segun el artista seleccionado de la bbdd
export const getAlbumsOfArtistApi = (id_artist) => {
    return bbdd.collection("albums")
        .where("artist", "==", id_artist)
        .get()
};

//Obtiene todos los artistas de la bbdd
export const getAllOfAlbumsApi = () => {
    return bbdd.collection("artists")
        .get()
};

//Sube a la bbdd el fichero y devuelve una promesa
export const uploadFileApi = (idFile, file) => {
    const ref = fireBase.storage()
        .ref()
        .child(`songs/${idFile}`);

    return ref.put(file);
};

//Sube a la bbdd la informacion del tema
export const uploadDataSongApi = (idFile, name, album, id_artist) => {
    bbdd.collection("songs")
        .add({
            name: name,
            album: album,
            fileName: idFile,
            artist: id_artist
        })
};

/* ------------------------------------- Render Item -------------------------------- */
//Recoge la imagen del item
export const getUrlAvatarApi = (url) => {
    return fireBase
        .storage()
        .ref(url)
        .getDownloadURL()
};

/* ------------------------------------- Song Slider -------------------------------- */
//Obtiene el artista segun la cancion pasada
export const getArtistDepensSongApi = (song) => {
    return bbdd.collection("artists")
        .doc(song)
        .get()
};

//Obtiene el artista segun el album pasado
export const getArtistDepensAlbumApi = (album) => {
    return bbdd.collection("albums")
        .doc(album)
        .get()
};

/* ------------------------------------- Settings -------------------------------- */
//Sube la imagen a firebase con el uid del usuario a la carpeta/tabla de imagenes
export const uploadImageApi = (id_user, file) => {
    const reference = fireBase
        .storage()
        .ref()
        .child(`avatar/${id_user}`);

    return reference.put(file);
};

//Actualiza la imagen del usuario en la bbdd de usuarios
export const updateUserAvatarApi = (urlAvatar) => {
    return fireBase
        .auth()
        .currentUser
        .updateProfile({ photoURL: urlAvatar });
};

//Devuelve el objeto usuario en bruto
export const reAuthenticateApi = (password) => {
    console.log(password);
    const user = firebase.auth().currentUser; //Objeto firebase distinto
    console.log(user);
    const credentials = firebase.auth.EmailAuthProvider.credential(user.email, password);//Objeto firebase distinto

    return user.reauthenticateWithCredential(credentials);
};

//Actualiza el email del usuario
export const updateEmailApi = (email) => {
    return fireBase.auth()
        .currentUser
        .updateEmail(email)
};

//Actualiza la contraseña del usuario
export const updatePasswordApi = (pass) => {
    return firebase.auth()
        .currentUser
        .updatePassword(pass)
};

//Actualiza el nombre del usuario
export const updateNameUser = (name) => {
    return firebase.auth().currentUser.updateProfile({ displayName: name })
};

/* ------------------------------------- BannerHome -------------------------------- */
//Recoge los banners principals de home
export const downloadBannersApi = () => {
    return firebase
        .storage()
        .ref("others/banner-home.jpg")
        .getDownloadURL();
};

/* ---------------------------------- Artists ----------------------------------------- */
//obtiene la imagen de la url pasada
export const getImageArtistApi = (url) => {
    return firebase
        .storage()
        .ref(url)
        .getDownloadURL()
};