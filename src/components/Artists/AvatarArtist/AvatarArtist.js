import React, { useEffect, useState } from 'react';
import { getImageArtistApi } from '../../../services/apiConnection';

import "./AvatarArtist.scss";

export const AvatarArtist = ({ artist }) => {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const style = {
        backgroundImage: `url('${avatarUrl}')`
    }
    useEffect(() => {
        getImageArtistApi(`artists/avatars/${artist?.avatar}`)
            .then(url => {
                setAvatarUrl(url)
            });
    }, [artist])

    return (
        <div className="avatar-artist" style={style}></div>
    )
}
