import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Dropdown, Grid, Loader } from 'semantic-ui-react';
import { getAllOfAlbumsApi, getImageApi } from '../../services/apiConnection';


import "./Albums.scss";

export const Albums = () => {
    const [albumes, setAlbumes] = useState([]);
    const [album, setAlbum] = useState(null)
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
                    objectAlbum.key = album.id;
                    objectAlbum.value =  album.id;
                    objectAlbum.text = album.data().name
                    arrayAlbums.push(objectAlbum);
                })
                const arrayOrdenado = orderAlbumsByName(arrayAlbums)
                setAlbumes(arrayOrdenado);
            })
            .catch(() => {
                toast.warning("No se pudieron cargar los Álbumes.");
            })

    }, [])

    const handlerChangeArtist = (event, data) => {
        //data solo viene con el dropdown
        setAlbum({
            'id': data.value
        })
    };

    //Para mostrar mensaje de loading al usuario
    const isLoading = (!albumes)
    if (isLoading) return <Loader active >Cargando</Loader>

    //Si selecciona un artista desde dropdown
    if (album) return <Redirect to={`/album/${album.id}`} />

    return (
        <div className="albums">
            <div className="artists__header">
                <h1>Álbumes</h1>
                <Dropdown
                    placeholder="Álbumes disponibles..."
                    search
                    selection
                    lazyLoad
                    defaultValue=''
                    options={albumes}
                    onChange={handlerChangeArtist}
                    icon="search"
                />
            </div>
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

    //Recoge la imagen del album de la bbdd
    useEffect(() => {
        getImageApi(`albums/${album.avatar}`)
            .then(avatarAlbum => {
                setAvatarUrl(avatarAlbum);
            })
            .catch(() => toast.warning("No se pudo cargar la imagen del Álbum."))
    }, [])

    if (!avatarUrl) {
        return (
            <Link to={`/album/${album.id}`} >
                <div className="albums__item">
                    <Loader className="avatar" active indeterminate style={{ color: "white" }}>Cargando...</Loader>
                </div>
            </Link>
        )
    }
    const style = {backgroundImage: `url('${avatarUrl}')`}
    return (
        <Link to={`/album/${album.id}`} >
            <div className="albums__item">
                <div className="avatar" style={style} />
                <h3>{album.name}</h3>
            </div>
        </Link>
    )
};