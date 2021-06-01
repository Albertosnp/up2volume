import React, { useEffect, useState } from "react";
import { BannerHome } from "../../components/BannerHome/BannerHome";
import { BasicSliderItems } from "../../components/Sliders/BasicSliderItems/BasicSliderItems";
import { SongsSlider } from "../../components/Sliders/SongsSlider/SongsSlider";
import { getLast10Albums, getLast10Songs, getLast10Artists } from "../../services/apiConnection";

import "./Home.scss";

export const Home = ({ playerSong }) => {
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [songs, setSongs] = useState([]);

    //obtiene las ultimas 10 canciones añadidas
    useEffect(() => {
        getLast10Songs()
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
        getLast10Albums()
            .then(albums => {
                const arrayAlbums = [];
                albums?.docs?.map(album => {
                    const data = album.data();
                    data.id = album.id;
                    arrayAlbums.push(data);
                })
                setAlbums(arrayAlbums);
            })
    }, [])

    //Obtiene los ultimos 10 artistas
    useEffect(() => {
        getLast10Artists()
            .then(response => {
                const arrayArtists = [];
                response?.docs?.map(artist => {
                    const data = artist.data();
                    data.id = artist.id;
                    arrayArtists.push(data);
                })
                setArtists(arrayArtists);
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
                    title="Últimos temas"
                    data={songs}
                    playerSong={playerSong}
                />
            </div>
        </>
    );
};