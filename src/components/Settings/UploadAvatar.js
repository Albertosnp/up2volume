import React, { useState, useCallback } from "react";
import { Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import AvatarDefault from "../../assets/png/user.png";
import firebase from "../../utils/Firebase";
import "firebase/storage";
import "firebase/database"
import "firebase/auth";


export const UploadAvatar = ({ user, setReloadApp }) => {
  const [avatarUrl, setAvatarUrl] = useState(user.photoUrl);

  //No permite subir imagenes de mas de 300kb
  const onDrop = useCallback((acceptedFiles) => {
    
    const file = acceptedFiles[0]; 
    console.log(file); 
    const isGoodSize = (300000 > file.size)
    
    if (isGoodSize) {
        //TODO averiguar porque no crea el objeto
        const url = URL.createObjectURL(file)
        setAvatarUrl(url);
        uploadImage(file).then(() => updateUserAvatar());
    }
    if (!isGoodSize) toast.warning("El avatar no puede exceder de 300kb");

  });

  //destructuring de los dos metodos que necesito y establece config aceptada
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });
  //Sube la imagen a firebase con el uid del usuario a la carpeta/tabla de imagenes
  const uploadImage = (file) => {
    const reference = firebase
    .storage()
    .ref()
    .child(`avatar/${user.uid}`);

    return reference.put(file);
  };
    
  //Actualiza la imagen del usuario en la bbdd de usuarios
  const updateUserAvatar = () => {
    firebase
    .storage()
    .ref(`avatar/${user.uid}`) //con referencia del usuario, trae la url del avatar
    .getDownloadURL()
    .then( async response => {//llamada a bbdd (coleccion de usuarios) y actualiza la img
        await firebase.auth().currentUser.updateProfile({ photoURL: response});
        setReloadApp( prevState => !prevState); // Hace recargar todos los componentes
    })
    .catch(() => toast.error("Error al actualizar el avatar"));
  };

  return (
    <div className="user-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Image src={AvatarDefault} />
      ) : ( 
        <Image src={user.photoURL ? user.photoURL : AvatarDefault} />
      )}
    </div>
  );
};
