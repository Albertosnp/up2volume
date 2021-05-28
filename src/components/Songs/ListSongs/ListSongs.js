import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Icon, Table } from 'semantic-ui-react';
import { getUrlAvatarApi, getArtistDepensItemApi, deleteDataSongApi, deleteFileSongApi, getAlbumDepensIdApi } from "../../../services/apiConnection"
import "./ListSongs.scss";

export const ListSongs = ({ songs, playerSong, title, userAdmin }) => {
    useEffect(() => {

    }, [songs])
    if (songs.length <= 0) return null
    return (
        <>
            <h2>{title}</h2>
            <Table inverted className="list-songs">
                <Table.Body>
                    {
                        songs.map(song => (<Song key={song.id} song={song} avatar={song.avatar} playerSong={playerSong} userAdmin={userAdmin} />))
                    }
                </Table.Body>
            </Table>
        </>
    )
}

const Song = ({ song, avatar, playerSong, userAdmin }) => {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [elementInfo, setElementInfo] = useState(null);

    //Recoge la imagen del item
    const getImage = (url) => {

        const fetchMyAPI = async () => {
            try {
                const urlAvatar = await getUrlAvatarApi(url)
                setAvatarUrl(urlAvatar)
            } catch (err) { console.log(err); }
        };
        fetchMyAPI()
    }

    //Si no esta asignado a un album -> es un single, trae la info e id de la imagen del artista en vez del album
    useEffect(() => {
        if (!song) return
        if (song.album === '') {
            const fetchMyAPI = async () => {
                try {
                    const artist = await getArtistDepensItemApi(song.artist)
                    setElementInfo({
                        ...artist.data(),
                        id: artist.id
                    })
                    getImage(`artists/avatars/${artist.data().avatar}`);
                } catch {}
            };
            fetchMyAPI()
        } else {
            const fetchMyAPI = async () => {
                try {
                    const album = await getAlbumDepensIdApi(song.album)
                    setElementInfo({
                        ...album.data(),
                        id: album.id
                    })
                    getImage(`albums/${album.data().avatar}`);
                } catch {}
            };
            fetchMyAPI()
        }
    }, [song])

    const onPlay = (params) => {
        playerSong(avatarUrl, song.name, song.fileName);
    };
    //Elimina de la bbdd el archivo y su info
    const deleteSong = () => {
        deleteDataSongApi(song.id)
            .then(() => {
                deleteFileSongApi(song.fileName)
            })
            .catch(() => toast.warning("No se ha podido eliminar el tema."))
    };

    return (
        <Table.Row  >
            <Table.Cell collapsing onClick={onPlay}>
                <Icon name="play circle outline" />
            </Table.Cell>
            <Table.Cell onClick={onPlay}>
                {song.name}
            </Table.Cell>
            {userAdmin &&
                <Table.Cell onClick={deleteSong}>
                    <Icon className="trash alternate outline" />
                </Table.Cell>
            }
        </Table.Row>
    )
};