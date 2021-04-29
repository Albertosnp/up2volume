import React from 'react'
import { Button, Form, Icon, Input } from 'semantic-ui-react';

export const UserPassword = () => {
    const handlerSumbit = () => {
     
    };

    return (
        <div className="user-password">
            <h3>Contraseña: xxxxxx</h3>
            <Button onClick={handlerSumbit}>Actualizar</Button>
        </div>
    )
}
