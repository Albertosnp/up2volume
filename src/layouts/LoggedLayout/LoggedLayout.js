import React, { useState } from 'react';
import { Grid } from "semantic-ui-react";
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from '../../routes/Routes';
import MenuLeft from '../../components/MenuLeft/MenuLeft';
import TopBar from '../../components/TopBar/TopBar';
import { Player } from '../../components/Player/Player';

import "./LoggedLayout.scss";


export const LoggedLayout = ({ user, setReloadApp }) => {
    const [songData, setSongData] = useState(null);

    const playerSong = (albumImage, songName, urlSong) => {
        // setSongData({
        //     url: urlSong,
        //     image: albumImage,
        //     name: songName
        // })
    };

    return (
        <Router>
            <Grid className="logged-layout">
                <Grid.Row>
                    <Grid.Column width={3}>
                        <MenuLeft user={user} />
                    </Grid.Column>
                    <Grid.Column className="content" width={13}>
                        <TopBar user={user}/>
                        <Routes user={user} setReloadApp={setReloadApp} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Player songData={songData} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Router>
    )
}
