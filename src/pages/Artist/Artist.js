import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router';
import firebase from '../../utils/Firebase';
import "firebase/firestore";
import { BannerArtist } from '../../components/Artists/BannerArtist/BannerArtist';
import { AvatarArtist } from '../../components/Artists/AvatarArtist/AvatarArtist';
import { BasicSliderItems } from '../../components/Sliders/BasicSliderItems/BasicSliderItems'; 
import "./Artist.scss";
import { toast } from 'react-toastify';


const bbdd = firebase.firestore(firebase);

// match es un parametro de los props que llegan gracias a withRouter
const Artist = ({ match }) => {
    const [artist, setArtist] = useState(null);
    const [albums, setAlbums] = useState([]);
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
            </div>
            
        </div>
    )
}

export default withRouter(Artist);