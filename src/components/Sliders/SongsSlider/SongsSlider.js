import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import firebase from '../../../utils/Firebase';
import "firebase/firestore";
import "firebase/storage";
import { toast } from 'react-toastify';
import { Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import "./SongsSlider.scss";

const bbdd = firebase.firestore(firebase);

export const SongsSlider = ({ title, data }) => {
    //ajustes del slider -> semantic-ui
    const settings = {
        className: "songs-slider__list",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 5,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    if (data.lenght < 5) return null;

    return (
        <div className="songs-slider">
            <h2>{title}</h2>
            <Slider {...settings}>
                {data.map(song => (
                    <Song key={song.id} item={song} />
                ))}
            </Slider>
        </div>
    )
}

const Song = ({ item }) => {
    const [avatar, setAvatar] = useState(null);
    const [songInfo, setSongInfo] = useState(null);

    //Trae la imagen correspondiente
    const getImage = (url) => {
        firebase.storage()
            .ref(url)
            .getDownloadURL()
            .then(imageUrl => {
                setAvatar(imageUrl);
            })
            .catch()
    };

    //Si no esta asignado a un album -> es un single, trae la info e id de la imagen del artista en vez del album
    useEffect(() => {
        if (!item) return
        if (item.album === '') {
            bbdd.collection("artists")
                .doc(item.artist)
                .get()
                .then(artist => {
                    setSongInfo({
                        ...artist.data(),
                        id: artist.id
                    })
                    getImage(`artists/${artist.data().avatar}`);
                })
        } else {
            bbdd.collection("albums")
                .doc(item.album)
                .get()
                .then(album => {
                    setSongInfo({
                        ...album.data(),
                        id: album.id
                    })
                    getImage(`albums/${album.data().avatar}`);
                })
        }
    }, [item])

    // const style = {
    //     backgroundImage: `url('${avatar}')`
    // }

    return (
        <div className="songs-slider__list-song">
            <div className="avatar" >
                {!item.album ?
                (<Link to={`/artist/${songInfo?.id}`} >
                    <div className="object__card">
                        <Card className="basic-slider-items__list-item"
                            image={avatar} />
                        <Icon name="play circle outline" />
                        <h4>{item.name}</h4>
                    </div>
                </Link>)
                :
                <Link to={`/album/${songInfo?.id}`} >
                    <div className="object__card">
                        <Card className="basic-slider-items__list-item"
                            image={avatar}
                            />
                        <Icon name="play circle" />
                        <h4>{item.name}</h4>
                    </div>
                </Link>
            }
            </div>
            

        </div>
    )
};