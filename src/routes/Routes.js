import React from 'react'
import { Route, Switch } from 'react-router'
import { Home } from '../pages/Home/Home'


export const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact >
                <Home />
            </Route>
            <Route path="/artists" exact >
                <h1>Artistas</h1>
            </Route>
            <Route path="/settings" exact >
                <h1>Ajustes de cuenta</h1>
            </Route>
        </Switch>
    )
}
