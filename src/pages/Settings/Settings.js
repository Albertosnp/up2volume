import React, { useState } from 'react';
import { UploadAvatar } from '../../components/Settings/UploadAvatar';

import "./Settings.scss";

export const Settings = ({ user }) => {
    // const [state, setstate] = useState(initialState);
    console.log(user);
    return (
        <div className="settings">
            <h1>Configuración</h1>
            <div className="avatar-name">
                <UploadAvatar user={user}/>
                <h2>{user.displayName}</h2>
            </div>
            
        </div>
    )
}
