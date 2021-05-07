import React, { useEffect, useState } from 'react';
import firebase from '../../../utils/Firebase';
import { Image } from 'semantic-ui-react';
import { AvatarArtist } from "../AvatarArtist/AvatarArtist"
import "firebase/storage";

import "./BannerArtist.scss";


export const BannerArtist = ({ artist }) => {
    const [bannerUrl, setBannerUrl] = useState(null);
    const style = {
        backgroundImage: `url('${bannerUrl}')`
    }
    //Saca la imagen de banner del artista con el id pasado
    useEffect(() => {
        firebase
            .storage()
            .ref(`artists/banners/${artist?.banner}`)
            .getDownloadURL()
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
                {/* {artist && <AvatarArtist artist={artist} />} */}
            </div>
            {/* <Image src={bannerUrl} /> */}
        </div>
    )
}