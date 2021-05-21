import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { getAllOfArtistApi, getImageApi } from '../../services/apiConnection';
import { toast } from 'react-toastify';

import "./Artists.scss";

export const Artists = () => {
    const [artists, setArtists] = useState([]);
    
    //Obtiene todos los artistas de la bbdd
    useEffect(() => {
        getAllOfArtistApi()
            .then( response => {
                const arrayArtists = [];
                response?.docs?.map(artist => {
                    const data = artist.data();
                    data.id = artist.id;
                    arrayArtists.push(data);
                });
                setArtists(arrayArtists);
            })
            .catch(() => toast.warning("No se pudieron cargar los Artistas."))            
    }, [])

    return (
        <div className="artists">
            <h1>Artistas</h1>
            <Grid>
                {artists.map(artist => (
                    <Grid.Column key={artist.id} mobile={8} tablet={4} computer={3}>
                        <Artist  artist={artist} />
                    </Grid.Column>
                     ))
                }
            </Grid>
        </div>
    )
}

const Artist = ({ artist }) => {
    const [avatarUrl, setAvatarUrl] = useState(null);
    //Obtiene la imagen del artista
    useEffect(() => {
        getImageApi(`artists/avatars/${artist.avatar}`)
            .then(url => {
                setAvatarUrl(url)
            })
    }, [artist])

    const style = { backgroundImage: `url('${avatarUrl}')` }
    
    return (
        <Link to={`/artist/${artist.id}`} >
            <div className="artists__item">
                <div className="avatar" style={style} />
                <h3>{artist.name}</h3>
            </div>
        </Link>
    )
};