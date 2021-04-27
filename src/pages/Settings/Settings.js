import React, { useState } from 'react';
import { UploadAvatar } from '../../components/Settings/UploadAvatar';
import { UserName } from '../../components/Settings/UserName';

import "./Settings.scss";

export const Settings = ({ user, setReloadApp }) => {
    // const [state, setstate] = useState(initialState);
    return (
        <div className="settings">
            <h1>Configuración</h1>
            <div className="avatar-name">
                <UploadAvatar user={user} setReloadApp={setReloadApp} />
                <UserName user={user} />
            </div>
            
        </div>
    )
}
