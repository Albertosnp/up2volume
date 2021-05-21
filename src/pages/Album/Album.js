import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { Loader } from 'semantic-ui-react';
import { HeaderAlbum } from '../../components/Albums/HeaderAlbum/HeaderAlbum';
import { ListSongs } from '../../components/Songs/ListSongs/ListSongs';
import { getAlbumApi, getSongsDependsAlbumApi, getImageApi, getArtistDepensItemApi } from '../../services/apiConnection';

import "./Album.scss";

const Album = ({ match, playerSong }) => {
    const [album, setAlbum] = useState(null);
    const [urlAvatar, setUrlAvatar] = useState(null)
    const [artist, setArtist] = useState(null);
    const [songs, setSongs] = useState([])

    //Trae los temas segun el album pasado
    useEffect(() => {
        if (album){
            getSongsDependsAlbumApi(album.id)
            .then(songs => {
                const arraySongs = [];
                songs?.docs?.map(song => {
                    arraySongs.push({
                        ...song.data(),
                        id: song.id
                    })
                })
                setSongs(arraySongs);
            })
        }
        
    }, [album])

    //Obtiene el album con el id pasado 
    useEffect(() => {
        getAlbumApi(match?.params?.id)
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
        getImageApi(`albums/${album?.avatar}`)
            .then(url => {
                setUrlAvatar(url)
            })
            .catch(() => toast.warning("No se pudo cargar la imagen del álbum."))
    }, [album])

    //Obtiene el artista segun el id pasado, añade al objeto su id
    useEffect(() => {
        if (!album) return;
        getArtistDepensItemApi(album?.artist)
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
                <ListSongs songs={songs} urlAvatar={urlAvatar} playerSong={playerSong} title="Titulo" />
            </div>
        </div>
    )
}

export default withRouter(Album)