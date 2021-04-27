import React from 'react';
import { toast } from 'react-toastify';
import { Button, Form, Input } from 'semantic-ui-react';
import firebase from "../../utils/Firebase";
import "firebase/auth";

export const UserName = ({ user }) => {

    const onEdit = () => {
        console.log("Actualizando nombre de usuario");
    };

    return (
        <div className="user-name">
            <h2>{user.displayName}</h2>
            <Button circular onClick={onEdit}>
                Actualizar
            </Button>
        </div>
    )
}
