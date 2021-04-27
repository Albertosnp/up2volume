import React from 'react'
import { Route, Switch } from 'react-router'
import { Home } from '../pages/Home/Home'
import { Settings } from '../pages/Settings/Settings'


export const Routes = ({ user, setReloadApp }) => {
    return (
        <Switch>
            <Route path="/" exact >
                <Home />
            </Route>
            <Route path="/artists" exact >
                <h1>Artistas</h1>
            </Route>
            <Route path="/settings" exact >
                <Settings user={user} setReloadApp={setReloadApp}/>
            </Route>
        </Switch>
    )
}
