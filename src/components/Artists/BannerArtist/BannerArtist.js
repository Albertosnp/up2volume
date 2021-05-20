import React, { useEffect, useState } from 'react';
import { Image } from 'semantic-ui-react';
import { AvatarArtist } from "../AvatarArtist/AvatarArtist"
import { getImageArtistApi } from "../../../services/apiConnection"

import "./BannerArtist.scss";

export const BannerArtist = ({ artist }) => {
    const [bannerUrl, setBannerUrl] = useState(null);
    const style = {
        backgroundImage: `url('${bannerUrl}')`
    }
    //Saca la imagen de banner del artista con el id pasado
    useEffect(() => {
        getImageArtistApi(`artists/banners/${artist?.banner}`)
            .then(url => {
                setBannerUrl(url)
            })
    }, [artist])

    return (
        <div className="banner-artist" style={style}>
            <div className="banner-artist__gradient" />
            <div className="banner-artist__info">
                <h4>Artista</h4>
                <h1>{artist.name}</h1>
            </div>
        </div>
    )
}