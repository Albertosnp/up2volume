import { set, uniqueId } from 'lodash-es';
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { Button, Dropdown, Form, Image, Input } from 'semantic-ui-react';
import firebase from '../../../utils/Firebase';
import "firebase/storage";

import NoImage from "../../../assets/png/no-image.png";
import "./AddAlbumForm.scss";

const bbdd = firebase.firestore(firebase);

const FORM_INITIAL_VALUE = {
    name: '',
    artist: ''
}

export const AddAlbumForm = ({ setShowModal }) => {
    const [imgAlbum, setImgAlbum] = useState(null);
    const [artists, setArtists] = useState([]);
    const [formData, setFormData] = useState(FORM_INITIAL_VALUE);
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState(null);

    const style = {
        backgroundImage: `url('${imgAlbum}')`
    }
    //Trae todos los artistas para mostrarlos en el desplegable
    useEffect(() => {
        bbdd.collection("artists")
            .get()
            .then(artists => {
                const arrayArtists = [];
                artists?.docs?.map(artist => {
                    const data = artist.data();
                    //Se crea el modelo
                    const artistMod = {
                        key: artist.id,
                        value: artist.id,
                        text: data.name
                    }
                    arrayArtists.push(artistMod);
                });
                setArtists(arrayArtists);
            })
            .catch(() => toast.warning("Ups... Algo salió mal."))
    }, [])
    
    const onDrop = useCallback(acceptedFile => {
        const fileUploated = acceptedFile[0];
        //VAlida que la imagen exceda de 1 Mb
        const isGoodSize = (1000000 > fileUploated.size)
        if (!isGoodSize) return toast.warning("La imagen no puede exceder de 1Mb");
        
        setFile(fileUploated);
        setImgAlbum(URL.createObjectURL(fileUploated));
    })

    const { getRootProps, getInputProps, } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    })

    const handlerChange = (event, data) => {
        //data solo viene con el dropdown
        data? setFormData({
            ...formData,
            'artist': data.value
        }) 
        :
        setFormData({
            ...formData,
            [event.target.name]: event.target.value.trim()
        })
        
    };

    // Crea la referencia de donde (ruta) y con que nombre se va a subir el fichero
    const uploadImage = (fileName) => {
        const ref = firebase 
                        .storage()
                        .ref()
                        .child(`albums/${fileName}`);
        return ref.put(file); // Sube el fichero a la ruta especificada               
    };
    //Sube el album completo a la coleccion de albums
    const uploadAlbum = (fileName) => {
        bbdd.collection("albums")
            .add({
                name: formData.name,
                artist: formData.artist,
                avatar: fileName
            })
    };

    const handlerSubmit = async (event) => {
        event.preventDefault();
        //Validacion de campos
        if (!formData.name) return toast.warning("Debes añadir el nombre del album.");
        if (!formData.artist) return toast.warning("Debes seleccionar un artista.");
        if (!imgAlbum) return toast.warning("Debes añadir la imagen del album.");
        
        setIsLoading(true);
        const fileName = uuidv4()//crea un id unico que será el nombre de la imagen del album
        try {
            await uploadImage(fileName);
        } catch {
            toast.warning("No se pudo subir la imagen del album.");
            setIsLoading(false);
        }
        try {
            await uploadAlbum(fileName);
            toast.success("El album se ha creado con éxito.")
            resetForm();
        } catch {
            toast.warning("No se pudo subir el album.");
            setIsLoading(false);
        }
        setIsLoading(false);
        setShowModal(false);
    };

    const resetForm = () => {
        setFile(null)
        setFormData(FORM_INITIAL_VALUE);
        setImgAlbum(null);
    };
    return (
        <Form className="add-album-form" onSubmit={handlerSubmit} onChange={handlerChange}>
            <Form.Group>
                <Form.Field className="album-avatar" width={5}>
                    <div { ...getRootProps() } className="avatar" style={style} >
                        <input { ...getInputProps() }/>
                    </div>
                    {!imgAlbum && <Image src={NoImage} />}
                </Form.Field>
                <Form.Field className="album-inputs" width={11}>
                    <Input placeholder="Nombre del album" name="name"  />
                    <Dropdown placeholder="El album pertenece..." 
                        item
                        fluid
                        search
                        selection
                        lazyLoad
                        options={artists} 
                        onChange={handlerChange} 
                        /> 
                </Form.Field>
            </Form.Group>
            <Button loading={isLoading}>Añadir album</Button>
        </Form>
    )
}
