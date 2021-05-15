import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Form, Icon, Input } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../../../utils/Firebase';
import "firebase/firestore";
import "firebase/storage";

import "./AddSongForm.scss";

const bbdd = firebase.firestore(firebase);

const INITIAL_FORM = {
    name: '',
    artist: '',
    album: ''
}

export const AddSongForm = ({ setShowModal }) => {
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);
    const [artist, setArtist] = useState(null);
    const [album, setAlbum] = useState(null)
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [isLoading, setIsLoading] = useState(false);

    // Obtiene todos los albumes segun el artista seleccionado de la bbdd
    useEffect(() => {
        if (!artist) return;
        bbdd.collection("albums")
            .where("artist", "==", artist.id)
            .get()
            .then(albums => {
                const arrayAlbums = [];
                albums?.docs?.map(album => arrayAlbums.push({
                    key: album.id,
                    value: album.id,
                    text: album.data().name
                }));
                setAlbums(arrayAlbums);
            })
            .catch(() => toast.warning("No se pudieron cargar los álbumes del artista."))
    }, [artist])

    //Obtiene todos los artistas de la bbdd
    useEffect(() => {
        bbdd.collection("artists")
            .get()
            .then(artists => {
                const arrayArtists = [];
                artists?.docs?.map(artist => {
                    arrayArtists.push({
                        key: artist.id,
                        value: artist.id,
                        text: artist.data().name
                    });
                })
                setArtists(arrayArtists);
            })
            .catch(() => toast.warning("No se han podido cargar los artistas"))
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        accept: ".mp3",
        noKeyboard: true,
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            setFile(file)
        }
    })

    //Sube a la bbdd el fichero y devuelve una promesa
    const uploadFile = (idFile) => {
        const ref = firebase.storage()
                            .ref()
                            .child(`songs/${idFile}`);
        
        return ref.put(file);                    
    };
    //Sube a la bbdd la informacion del tema
    const uploadDataSong = (idFile) => {
        bbdd.collection("songs")
            .add({
                name: formData.name,
                album: formData.album,
                fileName: idFile,
                artist: artist.id
            })
    };

    const handlerSubmit = async () => {
        //Validacion de campos
        if (!formData.name) return toast.warning("Debes añadir el nombre del tema.");
        if (!formData.artist) return toast.warning("Debes asignar el tema a un artista existente.");
        if (!file) return toast.warning("Debes añadir un archivo .mp3");

        setIsLoading(true);
        const idFileSong = uuidv4(); //para id unico
        //Sube el fichero
        try {
            await uploadFile(idFileSong);
        } catch {
            toast.warning("Hubo un error al subir el fichero.");
            setIsLoading(false);
        }
        //Sube la info del tema
        try {
            await uploadDataSong(idFileSong);
            toast.success("El tema se ha subido correctamente.");
            setIsLoading(false);
            setShowModal(false);
            setFormData(INITIAL_FORM);
        } catch {
            toast.warning("Hubo un error al guardar el tema.");
            setIsLoading(false);
        }
    };

    //Cambia el estado "artist" al seleccionarlo en el formulario
    const handlerChangeArtist = (event, data) => {
        //data solo viene con el dropdown
        //Cambia para poder filtrar sus albumes
        setArtist({
            'id': data.value
        }) 
        //Actualiza estado de datos de formulario
        setFormData({
            ...formData,
            artist: data.value
        })
    };

    //Cambia el estado "album" al seleccionarlo en el formulario
    const handlerChangeAlbum = (event, data) => {
        //data solo viene con el dropdown
        setAlbum({
            'id': data.value
        })
        setFormData({
            ...formData,
            album: data.value
        })
    };
    //Actualiza el nombre del tema segun teclea el usuario
    const handlerChangeName = (event) => {
        setFormData({
            ...formData,
            name: event.target.value
        })
    };

    return (
        <Form className="add-song-form" onSubmit={handlerSubmit} >
            <Form.Field>
                <Input 
                    onChange={handlerChangeName}
                    placeholder="Nombre del tema"
                />
            </Form.Field>
            <Form.Field>
                <Dropdown 
                    placeholder="Artistas disponibles..."
                    search
                    selection
                    lazyLoad
                    options={artists}
                    onChange={handlerChangeArtist}
                />
            </Form.Field>
            <Form.Field>
                <Dropdown 
                    placeholder="Álbumes disponibles..."
                    search
                    selection
                    lazyLoad
                    options={albums}
                    defaultValue=''
                    onChange={handlerChangeAlbum}
                />
            </Form.Field>
            <Form.Field>
                <div className="song-upload" { ...getRootProps() }>
                    <input { ...getInputProps() }/> 
                    <Icon name="cloud upload" className={file && "load"} />
                    <div>
                        {file? 
                            ( <p>Tema añadido: <span>{file.name}</span></p> )
                            :
                            ( <p>Arrasta tu tema o haz click <span>aquí</span>.</p> )
                        }
                    </div>
                </div>
            </Form.Field>
            <Button loading={isLoading}>Añadir tema</Button>
        </Form>
    )
}