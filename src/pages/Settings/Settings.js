import React, { useState } from 'react';
import { UploadAvatar } from '../../components/Settings/UploadAvatar';
import { UserName } from '../../components/Settings/UserName';
import { BasicModal } from '../../components/Modal/BasicModal/BasicModal';
import { UserEmail } from '../../components/Settings/UserEmail';

import "./Settings.scss";
import { UserPassword } from '../../components/Settings/UserPassword';


export const Settings = ({ user, setReloadApp }) => {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [contentModal, setContentModal] = useState(null)

    return (
        <div className="settings">
            <h1>Configuración</h1>
            <div className="avatar-name">
                <UploadAvatar user={user} setReloadApp={setReloadApp} />
                <UserName user={user} 
                    setShowModal={setShowModal} 
                    setTitleModal={setTitleModal} 
                    setContentModal={setContentModal} 
                    setReloadApp={setReloadApp} />       
            </div>
            <UserEmail 
                user={user} 
                setShowModal={setShowModal} 
                setTitleModal={setTitleModal} 
                setContentModal={setContentModal}/> 

            <UserPassword />

            <BasicModal show={showModal} setShow={setShowModal} title={titleModal} children={contentModal} />

            
        </div>
    )
}
