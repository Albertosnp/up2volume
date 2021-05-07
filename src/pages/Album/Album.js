import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import firebase from '../../utils/Firebase';
import "firebase/firestore";

import "./Album.scss";
import { Loader } from 'semantic-ui-react';
import { HeaderAlbum } from '../../components/Albums/HeaderAlbum/HeaderAlbum';

const bbdd = firebase.firestore(firebase);

const Album = ({ match }) => {
    const [album, setAlbum] = useState(null);
    const [urlAvatar, setUrlAvatar] = useState(null)
    const [artist, setArtist] = useState(null);
    

    //Obtiene el album con el id pasado 
    useEffect(() => {
        bbdd.collection("albums")
        .doc(match?.params?.id)
        .get()
        .then(album => {
            setAlbum({
                ...album.data(),
                id: album.id
            })
        })
        .catch(() => toast.warning("No se pudo cargar el álbum."));
    }, [match])

    //Obtiene la imagen del album segun id pasado
    useEffect(() => {
        if (!album) return
        firebase
            .storage()
            .ref(`albums/${album?.avatar}`)
            .getDownloadURL()
            .then(url => {
                setUrlAvatar(url)
            })
            .catch(() => toast.warning("No se pudo cargar la imagen del álbum."))
    }, [album])

    //Obtiene el artista segun el id pasado, añade al objeto su id
    useEffect(() => {
        if (!album) return;
        bbdd.collection("artists")
            .doc(album?.artist)
            .get()
            .then(artist => {
                setArtist({
                    ...artist.data(),
                    id: album.artist
                })
            })
            .catch(() => toast.warning("Error al cargar el nombre del artista."))
    }, [album])

    //Para mostrar mensaje de loading al usuario
    const isLoading = (!album || !artist)
    if (isLoading) return <Loader active >Cargando</Loader>

    return (
        <div className="album">
            <HeaderAlbum artist={artist} album={album} urlAvatar={urlAvatar} />
            <div className="album__songs">
                <p>Lista de canciones...</p>
            </div>
        </div>
    )
}

export default withRouter(Album)