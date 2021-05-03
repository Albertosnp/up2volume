import React, { useEffect, useState } from "react";
import { map } from "lodash";
import { BannerHome } from "../../components/BannerHome/BannerHome";
import firebase from "../../utils/Firebase";
import "firebase/firestore";

import "./Home.scss";

const bbdd = firebase.firestore(firebase);

export const Home = () => {
    const [artists, setArtists] = useState([]);
    
    useEffect(() => {
        bbdd.collection("artists")
        .get()
        .then(response => {
            const arrayArtists = [];
            response?.docs.map(artist => {
                const data = artist.data();
                data.id = artist.id;
                arrayArtists.push(data);
            })
            setArtists(arrayArtists);
            // con el objeto map de lodash...
            // map(response?.docs, artist => {
            //     const data = artist.data();
            //     data.id = artist.id;
            //     arrayArtists.push(data);
            // })
        })
    }, [])

    return (
        <>
            <BannerHome />
            <div className="home">
                <h2>Mas...</h2>
            </div>
        </>
    );
};
