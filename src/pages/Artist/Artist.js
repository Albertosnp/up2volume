import React, { useEffect, useState } from 'react'
import { Redirect, withRouter } from 'react-router';
import { BannerArtist } from '../../components/Artists/BannerArtist/BannerArtist';
import { AvatarArtist } from '../../components/Artists/AvatarArtist/AvatarArtist';
import { BasicSliderItems } from '../../components/Sliders/BasicSliderItems/BasicSliderItems';
import { toast } from 'react-toastify';
import { SongsSlider } from '../../components/Sliders/SongsSlider/SongsSlider';
import { ListSongs } from '../../components/Songs/ListSongs/ListSongs';
import { getAlbumsOfArtistApi, getAllSongsForAlbumApi, getArtistDepensItemApi, getSinglesOfArtistApi } from '../../services/apiConnection';
import { isUserAdmin } from '../../utils/Api';

import "./Artist.scss";
import { Loader } from 'semantic-ui-react';

// match es un parametro de los props que llegan gracias a withRouter
const Artist = ({ match, playerSong, userAdmin }) => {
    const [exist, setExist] = useState(true)
    const [artist, setArtist] = useState();
    const [albums, setAlbums] = useState([]);
    const [songs, setSongs] = useState([]);
    const [singles, setSingles] = useState([]);
    const [allSongs, setAllSongs] = useState([]);

    //Saca el artista con el id pasado 
    useEffect(() => {
        getArtistDepensItemApi(match?.params?.id)
            .then(artist => {
                if (!artist.exists) setExist(false)
                setArtist({
                    ...artist.data(),
                    id: artist.id
                })
            });
    }, [match])//match?.params?.id    
    
    //Obtiene los albumes del artista y los guarda en el estado Albums
    useEffect(() => {
        if (!artist) return;
        getAlbumsOfArtistApi(artist.id)
            .then(albums => {
                const arrayAlbums = [];
                albums?.docs?.map(album => arrayAlbums.push({
                    ...album.data(),
                    id: album.id
                }));
                setAlbums(arrayAlbums);
            })
            .catch(() => toast.warning("No se pudieron cargar los álbumes del artista."))
    }, [artist])

    //carga en el estado todas las canciones por album
    useEffect(() => {
        const arraySongs = [];
        albums.map(async album => {
            getAllSongsForAlbumApi(album.id)//Obtiene los los temas segun el album
                .then(response => {
                    response?.docs.map(song => {
                        arraySongs.push({
                            ...song.data(),
                            id: song.id
                        })
                    });
                    setSongs(arraySongs);
                })
        })
    }, [albums])

    //carga ene el stado todos los singles del artista
    useEffect(() => {
        if (!artist) return null;
        getSinglesOfArtistApi(artist.id)//Obtiene los singles del artista
            .then(response => {
                const arraySingles = [];
                response?.docs.map(song => {
                    arraySingles.push({
                        ...song.data(),
                        id: song.id
                    })
                })
                setSingles(arraySingles);
            })
    }, [songs])
    
    useEffect(() => {
        if (!songs || !singles) return null
        setAllSongs([...songs, ...singles]);
    }, [songs, singles])

    if (!exist) return <Redirect to="/"/>
    //Para mostrar mensaje de loading al usuario
    const isLoading = (!artist)
    if (isLoading) return <Loader active >Cargando</Loader>

    return (
        <div className="artist">
            {artist && <BannerArtist artist={artist} />}
            {artist && <AvatarArtist artist={artist} />}
            {/* {userAdmin && "Borrar Artista" } */}
            <div className="artist__content">    
                <div className="artist__singlesSongs">
                    <ListSongs songs={singles} playerSong={playerSong} title="Singles" userAdmin={userAdmin}/>
                </div>
                <BasicSliderItems
                    title="Álbumes"
                    data={albums}
                    folderImage="albums"
                    urlName="album"
                />
                <SongsSlider
                    title="Temas"
                    data={allSongs}
                    playerSong={playerSong}
                />
            </div>

        </div>
    )
}

export default withRouter(Artist);