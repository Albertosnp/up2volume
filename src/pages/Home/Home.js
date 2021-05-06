import React, { useEffect, useState } from "react";
import { map } from "lodash";
import { BannerHome } from "../../components/BannerHome/BannerHome";
import { BasicSliderItems } from "../../components/Sliders/BasicSliderItems/BasicSliderItems";
import firebase from "../../utils/Firebase";
import "firebase/firestore";


import "./Home.scss";

const bbdd = firebase.firestore(firebase);

export const Home = () => {
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        bbdd.collection("albums")
            .get()
            .then(albums => {
                const arrayAlbums = [];
                albums?.docs?.map( album => {
                    const data = album.data();
                    data.id = album.id;
                    arrayAlbums.push(data);
                })
                setAlbums(arrayAlbums);
            })
    }, [])

    useEffect(() => {
        bbdd.collection("artists")
        .get()
        .then(response => {
            const arrayArtists = [];
            response?.docs?.map(artist => {
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
                <BasicSliderItems 
                    title="Últimos artistas" 
                    data={artists}  
                    folderImage="artists/avatars" 
                    urlName="artist" />
                <BasicSliderItems 
                    title="Últimos álbumes" 
                    data={albums}  
                    folderImage="albums" 
                    urlName="album" />
                <h2>Mas...</h2>
            </div>
        </>
    );
};
