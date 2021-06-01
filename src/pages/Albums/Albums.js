import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Grid, Loader } from 'semantic-ui-react';
import { getAllOfAlbumsApi, getImageApi } from '../../services/apiConnection';

import "./Albums.scss";

export const Albums = () => {
    const [albumes, setAlbumes] = useState([]);

    //Para ordenar los albumes alfabeticamente
    const orderAlbumsByName = (arrayAlbums) => {
        const arrayOrdenado = arrayAlbums.sort(function (album1, album2) {
                if (album1.name > album2.name) { //comparación lexicogŕafica
                    return 1;
                } 
                if (album1.name < album2.name) {
                    return -1;
                } 
                return 0;
            });
        return arrayOrdenado    
    };

    //Obtiene todos los albumes 
    useEffect(() => {
        getAllOfAlbumsApi()
            .then(albums => {
                const arrayAlbums = [];
                albums?.docs?.map(album => {
                    const objectAlbum = album.data();
                    objectAlbum.id = album.id;
                    arrayAlbums.push(objectAlbum);
                })
                const arrayOrdenado = orderAlbumsByName(arrayAlbums)
                setAlbumes(arrayOrdenado);
            })
            .catch(() => {
                toast.warning("No se pudieron cargar los Álbumes.");
            })

    }, [])

    //Para mostrar mensaje de loading al usuario
    const isLoading = (!albumes)
    if (isLoading) return <Loader active >Cargando</Loader>

    return (
        <div className="albums">
            <h1>Álbumes</h1>
            <Grid>
                {albumes.map(album => (
                    <Grid.Column key={album.id} mobile={8} tablet={4} computer={3}>
                        <Album album={album} />
                    </Grid.Column>
                ))
                }
            </Grid>
        </div>
    )
}

const Album = ({ album, setImages }) => {
    const [avatarUrl, setAvatarUrl] = useState(null);

    const style = {
        backgroundImage: `url('${avatarUrl}')`
    }
    //Recoge la imagen del album de la bbdd
    useEffect(() => {
        getImageApi(`albums/${album.avatar}`)
            .then(avatarAlbum => {
                setAvatarUrl(avatarAlbum);
            })
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