import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { Button, Form, Image, Input } from 'semantic-ui-react';
import NoImage from "../../../assets/png/no-image.png";
import { v4 as uuidv4 } from 'uuid';
import firebase from "../../../utils/Firebase";
import "firebase/storage";
import "firebase/firestore";

import "./AddArtistForm.scss";

//Se inicializa la bbdd pasandole mis credenciales de la app
const bbdd = firebase.firestore(firebase);

//TODO: añadir genero de musica, descripcion...

export const AddArtistForm = ({ setShowModal }) => {
    const [formData, setFormData] = useState(initialForm)
    const [urlBanner, setUrlBanner] = useState(null);
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    console.log(file);
    const styleBanner = { backgroundImage: `url('${urlBanner}')` }
    const styleAvatar = {
        backgroundImage: `url('${urlBanner ? urlBanner : NoImage}')`
    }

    //VAlida que la imagen exceda de 1 Mb
    const onDrop = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        const isGoodSize = (1000000 > file.size)
        if (isGoodSize) {
            setFile(file);
            setUrlBanner(URL.createObjectURL(file));
        }
        if (!isGoodSize) toast.warning("La imagen no puede exceder de 1Mb");
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    })

    const handlerChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value.trim()
        })
    }
    //Sube la imagen del artista a bbdd
    const uploadImageArtist = (uidImage) => {
        const reference = firebase.storage().ref().child(`artists/${uidImage}`); //Se crea el uid en la coleccion artists de la bbdd
        return reference.put(file); //Se sube-asocia la imagen a la bbdd con el uid 
    };
    //Sube el artista en la coleccion-tabla y asocia la imagen con el uid
    const uploadArtist = (uidImage) => {
        return bbdd.collection("artists").add({
            name: formData.name,
            banner: uidImage
        })
    }

    const resetForm = () => {
        setFormData(initialForm);
        setFile(null);
        setUrlBanner(null);
    };

    const handlerSubmit = async () => {
        //Validacion de campos
        if (!formData.name) return toast.warning("Debes añadir el nombre del artista.");
        if (!file) return toast.warning("Debes añadir una foto del artista.");

        setIsLoading(true);
        try {
            const uidImage = uuidv4();//Genera el uid unico para la imagen 
            await uploadImageArtist(uidImage); //Sube la imagen
            await uploadArtist(uidImage); //Sube el artista
            resetForm(); //No es necesario
            toast.success("El artista se ha añadido correctamente.");
            setShowModal(false);
        } catch (error) {
            toast.error("Ups... Algo salió mal.");
        } finally {
            setIsLoading(false);
            console.log(formData);
        }
    };
    //TODO: añadir descripcion a los campos para el usuario -> banner y avatar 
    return (
        <Form className="add-artist-form" onSubmit={handlerSubmit} onChange={handlerChange}>
            <Form.Field className="artist-banner">
                <div {...getRootProps()} className="banner" style={styleBanner}>
                    <input {...getInputProps()} />
                    {!urlBanner && <Image src={NoImage} />}
                </div>
            </Form.Field>
            <Form.Field className="artist-avatar">
                <div className="avatar" style={styleAvatar} />
            </Form.Field>
            <Form.Field>
                <Input placeholder="Nombre del artista" name="name" />
            </Form.Field>
            <Button loading={isLoading}>Crear artistas</Button>
        </Form>
    )
}

const initialForm = () => {
    return {
        name: ""
    }
};

// const {
    //     getRootProps,
    //     getInputProps,
    //     isDragActive,
    //     isDragAccept,
    //     isDragReject
    //   } = useDropzone({
    //     accept: 'image/jpeg, image/png',
    //     noKeyboard: true,
    //     maxSize: 300000
    //   });

    //   const style = useMemo(() => ({
    //     ...baseStyle,
    //     ...(isDragActive ? activeStyle : {}),
    //     ...(isDragAccept ? acceptStyle : {}),
    //     ...(isDragReject ? rejectStyle : {})
    //   }), [
    //     isDragActive,
    //     isDragReject,
    //     isDragAccept
    //   ]);


// const baseStyle = {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: '20px',
//     borderWidth: 2,
//     borderRadius: 2,
//     borderColor: '#eeeeee',
//     borderStyle: 'dashed',
//     backgroundColor: '#fafafa',
//     color: '#bdbdbd',
//     outline: 'none',
//     transition: 'border .24s ease-in-out'
//   };

//   const activeStyle = {
//     borderColor: '#2196f3'
//   };

//   const acceptStyle = {
//     borderColor: '#00e676'
//   };

//   const rejectStyle = {
//     borderColor: '#ff1744'
//   };