import React from 'react'
import { Icon, Table } from 'semantic-ui-react';

import "./ListSongs.scss";

export const ListSongs = ({ songs, urlAvatar, playerSong, title }) => {
    if (songs.length <= 0) return null
    return (
        <>
        <h2>{title}</h2>
        <Table inverted className="list-songs">
            {/* <Table.Header>
                <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell>{title}</Table.HeaderCell>
                </Table.Row>
            </Table.Header> */}
            <Table.Body>
                {
                    songs.map(song => (<Song key={song.id} song={song} avatar={urlAvatar} playerSong={playerSong} />))
                }
            </Table.Body>
        </Table>
        </>
    )
}

const Song = ({ song, avatar, playerSong }) => {
    
    const onPlay = (params) => {
        playerSong(avatar, song.name, song.fileName);
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