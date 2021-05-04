import React, { useEffect, useState } from 'react';
import firebase from "../../utils/Firebase";
import "firebase/firestore";

import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import "./Artists.scss";
const bbdd = firebase.firestore(firebase);

export const Artists = () => {
    const [artists, setArtists] = useState([]);
    useEffect(() => {
        bbdd.collection("artists")
            .get()
            .then( response => {
                const arrayArtists = [];
                response?.docs?.map(artist => {
                    const data = artist.data();
                    data.id = artist.id;
                    arrayArtists.push(data);
                });
                setArtists(arrayArtists);
            })
    }, [])

    return (
        <div className="artists">
            <h1>Artistas</h1>
            <Grid>
                {artists.map(artist => (
                    <Grid.Column key={artist.id} mobile={8} tablet={4} computer={3}>
                        <Artist  artist={artist} />
                    </Grid.Column>
                     ))
                }
            </Grid>
        </div>
    )
}

const Artist = ({ artist }) => {
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        firebase
            .storage()
            .ref(`artists/avatars/${artist.avatar}`)
            .getDownloadURL()
            .then(url => {
                setAvatarUrl(url)
            })
    }, [artist])

    const style = {
        backgroundImage: `url('${avatarUrl}')`
    }
    return (
        <Link to={`/artist/${artist.id}`} >
            <div className="artists__item">
                <div className="avatar" style={style} />
                <h3>{artist.name}</h3>
            </div>
        </Link>
        
    )
};