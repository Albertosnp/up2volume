import React from 'react'
import { Route, Switch } from 'react-router'
import Artist from '../pages/Artist/Artist'
import { Artists } from '../pages/Artists/Artists'
import { Home } from '../pages/Home/Home'
import { Settings } from '../pages/Settings/Settings'


export const Routes = ({ user, setReloadApp }) => {
    return (
        <Switch>
            <Route path="/" exact >
                <Home />
            </Route>
            <Route path="/artists" exact >
                <Artists />
            </Route>
            <Route path="/settings" exact >
                <Settings user={user} setReloadApp={setReloadApp}/>
            </Route>
            <Route path="/artist/:id" exact >
                <Artist />
            </Route>
        </Switch>
    )
}
