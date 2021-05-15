import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router';
import firebase from '../../utils/Firebase';
import "firebase/firestore";
import { BannerArtist } from '../../components/Artists/BannerArtist/BannerArtist';
import { AvatarArtist } from '../../components/Artists/AvatarArtist/AvatarArtist';
import { BasicSliderItems } from '../../components/Sliders/BasicSliderItems/BasicSliderItems';
import "./Artist.scss";
import { toast } from 'react-toastify';
import { SongsSlider } from '../../components/Sliders/SongsSlider/SongsSlider';
import { ListSongs } from '../../components/Songs/ListSongs/ListSongs';


const bbdd = firebase.firestore(firebase);

// match es un parametro de los props que llegan gracias a withRouter
const Artist = ({ match, playerSong }) => {
    const [artist, setArtist] = useState();
    const [albums, setAlbums] = useState([]);
    const [songs, setSongs] = useState([]);
    const [singles, setSingles] = useState([]);
    const [allSongs, setAllSongs] = useState([]);
    const [statematch, setstatematch] = useState(match)
    console.log(songs);
    //Saca el artista con el id pasado 
    useEffect(() => {
        bbdd.collection("artists")
            .doc(match?.params?.id)
            .get()
            .then(response => {
                setArtist({
                    ...response.data(),
                    id: response.id
                })
            });
    }, [match])//match?.params?.id    

    //Obtiene todos los albumes del artista y los guarda en el estado Albums
    useEffect(() => {
        if (!artist) return;
        bbdd.collection("albums")
            .where("artist", "==", artist.id)
            .get()
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
    
    //Obtiene los singlesdel artista
    const getAllSingles = async () => {
        if (!artist) return null;
        await bbdd.collection("songs")
            .where("album", "==", "")
            .where("artist", "==", artist.id)
            .get()
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
    
    };

    const getAllSongsForAlbum = async () => {
        const arraySongs = [];
        albums.map(async album => {
            await bbdd.collection("songs")
                .where("album", "==", album.id)
                .get()
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
        
    };
    //carga en el estado todas las canciones por album
    useEffect(() => {
        const autoExe = async () => {
            await getAllSongsForAlbum();
        };    
        autoExe();
        
    }, [albums])
    //carga ene el stado todos los singles del artista
    useEffect(() => {
        const autoExe = async () => {
            await getAllSingles(); 
            setAllSongs([...songs, ...singles]);
        };    
        autoExe();
    }, [songs])

    return (
        <div className="artist">
            {artist && <BannerArtist artist={artist} />}
            {artist && <AvatarArtist artist={artist} />}
            <div className="artist__content">
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
                <div className="album__songs">
                <ListSongs songs={songs} playerSong={playerSong} />
            </div>
            </div>

        </div>
    )
}

export default withRouter(Artist);