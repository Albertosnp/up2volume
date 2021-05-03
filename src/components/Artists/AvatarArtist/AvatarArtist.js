import React, { useEffect, useState } from 'react';
import firebase from '../../../utils/Firebase';
import "firebase/storage";

import "./AvatarArtist.scss";

export const AvatarArtist = ({ artist }) => {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const style = {
        backgroundImage: `url('${avatarUrl}')`
    }
    useEffect(() => {
        firebase
            .storage()
            .ref(`artists/avatars/${artist?.avatar}`)
            .getDownloadURL()
            .then(url => {
                setAvatarUrl(url)
            });
    }, [artist])

    return (
        <div className="avatar-artist" style={style}>
            
        </div>
    )
}
