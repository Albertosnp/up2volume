import React from 'react';
import { Button } from 'semantic-ui-react';

import "./AuthOptions.scss";

const AuthOptions = ({ setSelectedForm }) => {

    return (
        <div className="auth-options">
            <h2>Millones de canciones gratis en up2volume</h2>
            <Button primary className="register" onClick={ () => setSelectedForm("register") }>
                Registrarse gratis
            </Button>
            <Button primary className="login" onClick={ () => setSelectedForm("login") }>
                Iniciar sesión
            </Button>
        </div>
    )
}

export default AuthOptions;