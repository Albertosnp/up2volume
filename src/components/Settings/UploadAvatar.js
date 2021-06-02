import React, { useState, useCallback } from "react";
import { Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import AvatarDefault from "../../assets/png/user.png";
import { getUrlAvatarApi, uploadImageApi, updateUserAvatarApi } from "../../services/apiConnection";

import "./UploadAvatar.scss"

export const UploadAvatar = ({ user, setReloadApp }) => {
  const [avatarUrl, setAvatarUrl] = useState(user.photoUrl);

  //No permite subir imagenes de mas de 300kb
  const onDrop = useCallback((acceptedFiles) => {
    
    const file = acceptedFiles[0]; 
    if (!file) return toast.warning("El avatar no tiene un formato permitido ( jpg / png )");
    const isGoodSize = (300000 > file.size)
    
    if (isGoodSize) {
        //TODO averiguar porque no crea el objeto
        const url = URL.createObjectURL(file)
        setAvatarUrl(url);
        //Sube la imagen a firebase con el uid del usuario a la carpeta/tabla de imagenes
        uploadImageApi(user.uid, file)
          .then(() => updateUserAvatar());
    }
    if (!isGoodSize) toast.warning("El avatar no puede exceder de 300kb");

  });

  //destructuring de los dos metodos que necesito y establece config aceptada
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });
    
  //Actualiza la imagen del usuario en la bbdd de usuarios
  const updateUserAvatar = () => {
    const fetchMyAPI = async () => {
      try {
        const urlAvatar = await getUrlAvatarApi(`avatar/${user.uid}`)
        await updateUserAvatarApi(urlAvatar)//llamada a bbdd (coleccion de usuarios) y actualiza la img
        setReloadApp( prevState => !prevState); // Hace recargar todos los componentes
      } catch {
        toast.error("Error al actualizar el avatar")
      }

    };
    fetchMyAPI()
  };

  return (
    <div className="user-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Image src={AvatarDefault} />
      ) : ( 
        <Image src={user.photoURL ? user.photoURL : AvatarDefault} className="classAvatar"/>
      )}
    </div>
  );
};
