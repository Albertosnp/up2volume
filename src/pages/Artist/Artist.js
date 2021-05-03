import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router';
import firebase from '../../utils/Firebase';
import "firebase/firestore";
import { BannerArtist } from '../../components/Artists/BannerArtist/BannerArtist';
import { AvatarArtist } from '../../components/Artists/AvatarArtist/AvatarArtist';
import "./Artist.scss";


const bbdd = firebase.firestore(firebase);

// match es un parametro de los props que llegan gracias a withRouter
const Artist = ({ match }) => {
    const [artist, setArtist] = useState(null);

    useEffect(() => {
        bbdd.collection("artists")
            .doc(match?.params?.id)
            .get()
            .then(response => {
                setArtist(response.data())
            })
    }, [match])//match?.params?.id    

    return (
        <div className="artist">
            {artist && <BannerArtist artist={artist} />}
            {artist && <AvatarArtist artist={artist} />}
            <h2>Más informacion</h2>
        </div>
    )
}

export default withRouter(Artist);