import React, { useEffect, useState } from "react";
import { BannerHome } from "../../components/BannerHome/BannerHome";
import { BasicSliderItems } from "../../components/Sliders/BasicSliderItems/BasicSliderItems";
import { SongsSlider } from "../../components/Sliders/SongsSlider/SongsSlider";
import firebase from "../../utils/Firebase";
import "firebase/firestore";


import "./Home.scss";

const bbdd = firebase.firestore(firebase);

export const Home = ({ playerSong }) => {
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [songs, setSongs] = useState([]);

    //obtiene las ultimas 10 canciones añadidas
    useEffect(() => {
        bbdd.collection("songs")
            .limit(10)
            .get()
            .then(songs => {
                const arraySongs = [];
                songs?.docs?.map(song => {
                    arraySongs.push({
                        ...song.data(),
                        id: song.id
                    })
                })
                setSongs(arraySongs);
            })
    }, [])

    //obtiene los 10 ultimos albumes
    useEffect(() => {
        bbdd.collection("albums")
            .limit(10)
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

    //Obtiene los ultimos 10 artistas
    useEffect(() => {
        bbdd.collection("artists")
        .limit(10)
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
                    urlName="artist" 
                    />
                <BasicSliderItems 
                    title="Últimos álbumes" 
                    data={albums}  
                    folderImage="albums" 
                    urlName="album" />
                <SongsSlider 
                    title="Últimas temas añadidos"
                    data={songs}
                    playerSong={playerSong}
                />    
            </div>
        </>
    );
};
