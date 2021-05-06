import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import firebase from '../../../utils/Firebase';
import "firebase/storage";

import "./BasicSliderItems.scss";
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

//Componente Slider que muestra albums. artistas, canciones...
export const BasicSliderItems = ({ title, data, folderImage, urlName }) => {
    //ajustes del slider -> semantic-ui
    const settings = {
        className: "basic-slider-items__list",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 5,
        swipeToSlide: true,
    }
    //Si el array no tiene suficientes elementos no se muestra
    if(data.length < 5) return null; 

    return (
        <div className="basic-slider-items">
        <h2>{title}</h2>
        <Slider {...settings}>
          { data.map( artist => (
              <RenderItem key={artist.id} item={artist} folderImage={folderImage} urlName={urlName} />
            ))
          }
        </Slider>
      </div>
    )
}

const RenderItem = ({ item, folderImage, urlName }) => {
    const [avatar, setAvatar] = useState(null);
    
    const style = {
        backgroundImage: `url(${avatar})`
    }

    useEffect(() => {
        firebase
        .storage()
        .ref(`${folderImage}/${item.avatar}`)
        .getDownloadURL()
        .then(urlAvatar => {
            setAvatar(urlAvatar)
        })
    }, [item, folderImage])

    return (
        // <div className="basic-slider-items__list-item">
        //     <div className="avatar" style={style}/>
        //     <h3>{item.name}</h3>
        // </div>
        <Link to={`/${urlName}/${item.id}`} >
            <div className="artist">
                <Card  className="basic-slider-items__list-item"
                image={avatar}/>
                <h4>{item.name}</h4>
            </div>
        </Link>
        
    )
};
