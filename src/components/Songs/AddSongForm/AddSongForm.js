import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Form, Icon, Input } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import firebase from '../../../utils/Firebase';
import "firebase/firestore";

import "./AddSongForm.scss";

const bbdd = firebase.firestore(firebase);

export const AddSongForm = ({ setShowModal }) => {
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);
    const [artist, setArtist] = useState(null);

    // Obtiene todos los albumes segun el artista seleccionado de la bbdd
    useEffect(() => {
        console.log(artist);
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
    }, [])

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

    const handlerSubmit = () => {
     
    };

    const handlerChange = (event, data) => {
        //data solo viene con el dropdown
        setArtist({
            'id': data.value
        }) 
    };

    return (
        <Form className="add-song-form" onSubmit={handlerSubmit} >
            <Form.Field>
                <Input 
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
                    onChange={handlerChange}
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
                />
            </Form.Field>
            <Form.Field>

            </Form.Field>
            <Button>Añadir tema</Button>
        </Form>
    )
}
