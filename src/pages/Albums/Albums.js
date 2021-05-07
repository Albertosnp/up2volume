import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Grid } from 'semantic-ui-react';
import firebase from '../../utils/Firebase';
import "firebase/firestore";

import "./Albums.scss";

const bbdd = firebase.firestore(firebase);

export const Albums = () => {
    const [albumes, setAlbumes] = useState([]);
    
    useEffect(() => {
        bbdd.collection("albums")
            .get()
            .then(albums => {
                const arrayAlbums = [];
                albums?.docs?.map( album => {
                    const objectAlbum = album.data();
                    objectAlbum.id = album.id;
                    arrayAlbums.push(objectAlbum);
                })
                setAlbumes(arrayAlbums);
            })
            .catch(() => {
                toast.warning("No se pudieron cargar los Álbumes.");
            })
            
    }, [])

    return (
        <div className="albums">
            <h1>Álbumes</h1>
            <Grid>
                {albumes.map(album => (
                    <Grid.Column key={album.id} mobile={8} tablet={4} computer={3}>
                        <Album  album={album} />
                    </Grid.Column>
                     ))
                }
            </Grid>
        </div>
    )
}

const Album = ({ album }) => {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const style = {
            backgroundImage: `url('${avatarUrl}')`
    }
    //Recoge la imagen del album de la bbdd
    useEffect(() => {
        firebase.storage()
        .ref(`albums/${album.avatar}`)
        .getDownloadURL()
        .then(avatarAlbum => setAvatarUrl(avatarAlbum))
        .catch(() => toast.warning("No se pudo cargar la imagen del Álbum.")) 
    }, [])
    
    
    return (
        <Link to={`/album/${album.id}`} >
            <div className="albums__item">
                <div className="avatar" style={style} />
                <h3>{album.name}</h3>
            </div>
        </Link>
        
    )
};