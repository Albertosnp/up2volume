import React, { useEffect, useState } from 'react'
import { Icon, Table } from 'semantic-ui-react';
import { getUrlAvatarApi, getArtistDepensItemApi } from "../../../services/apiConnection"
import "./ListSongs.scss";

export const ListSongs = ({ songs, playerSong, title }) => {
    if (songs.length <= 0) return null
    //TODO no llega url del avatar hacer llamada a api
    return (
        <>
        <h2>{title}</h2>
        <Table inverted className="list-songs">
            <Table.Body>
                {
                    songs.map(song => (<Song key={song.id} song={song} avatar={song.avatar} playerSong={playerSong} />))
                }
            </Table.Body>
        </Table>
        </>
    )
}

const Song = ({ song, avatar, playerSong }) => {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [elementInfo, setElementInfo] = useState(null);

    //Recoge la imagen del item
    const getImage = (url) => {
        
        const fetchMyAPI = async () => {
            try {
                const urlAvatar = await getUrlAvatarApi(url)
                setAvatarUrl(urlAvatar)
            } catch (err){console.log(err);}
        }; 
        fetchMyAPI()
    }
    //Recoge el artista
    useEffect(() => {
        if (!song) return
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
         
    }, [song])

    const onPlay = (params) => {
        playerSong(avatarUrl, song.name, song.fileName);
    };

    return (
        <Table.Row onClick={onPlay} >
            <Table.Cell collapsing>
                <Icon name="play circle outline" />
            </Table.Cell>
            <Table.Cell>
                {song.name} 
            </Table.Cell>
        </Table.Row>
    )
};