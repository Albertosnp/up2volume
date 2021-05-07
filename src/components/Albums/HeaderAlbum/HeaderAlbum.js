import React from 'react'
import { Link } from 'react-router-dom';

import "./HeaderAlbum.scss";

export const HeaderAlbum = ({ album, artist, urlAvatar }) => {
    const style = {
        backgroundImage: `url('${urlAvatar}')`
    }

    return (
        <div className="album__header">
            <div className="image"
                style={style}
            />
            <div className="info">
                <h1>{album.name}</h1>
                <p>by 
                    <Link to={`/artist/${artist.id}`}>
                        <span> {artist.name} </span>
                    </Link>
                </p>
            </div>
        </div>
    )
}
