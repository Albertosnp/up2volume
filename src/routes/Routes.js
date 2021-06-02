import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import Album from '../pages/Album/Album'
import { Albums } from '../pages/Albums/Albums'
import Artist from '../pages/Artist/Artist'
import { Artists } from '../pages/Artists/Artists'
import { Home } from '../pages/Home/Home'
import { Settings } from '../pages/Settings/Settings'
import { isUserAdmin } from '../utils/Api'

export const Routes = ({ user, setReloadApp, playerSong }) => {
    const [userAdmin, setUserAdmin] = useState(false)
    //Verifica si es administrador
    useEffect(() => {
        isUserAdmin(user.uid)
            .then(response => setUserAdmin(response))
    }, [user]);
    return (
        <Switch> 
            <Route path="/artists" exact >
                <Artists />
            </Route>
            <Route path="/albums" exact >
                <Albums />
            </Route>
            <Route path="/settings" exact >
                <Settings user={user} setReloadApp={setReloadApp}/>
            </Route>
            <Route path="/album/:id" exact >
                <Album playerSong={playerSong} userAdmin={userAdmin} />
            </Route>
            <Route path="/artist/:id" exact >
                <Artist playerSong={playerSong} userAdmin={userAdmin} />
            </Route>
            <Route path="/" exact>
                <Home playerSong={playerSong} />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}
