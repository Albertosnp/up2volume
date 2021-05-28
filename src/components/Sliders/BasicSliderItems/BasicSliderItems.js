import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import { RenderItemArtist } from '../RenderItems/RenderItemArtist/RenderItemArtist';
import { RenderItem } from '../RenderItems/RenderItem/RenderItem';

import "./BasicSliderItems.scss";


//Componente Slider que muestra albums. artistas, canciones...
export const BasicSliderItems = ({ title, data, folderImage, urlName}) => {
    //ajustes del slider -> react slick
    const settings = {
        className: "basic-slider-items__list",
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
    //Si el array no tiene suficientes elementos no se muestra
    if(data.length < 4) return null; 

    return (
        <div className="basic-slider-items">
        <h2>{title}</h2>
        <Slider {...settings}>
          { data.map( object => 
            urlName==="artist"?
            // renderiza distinto para imagen circular
            (<RenderItemArtist key={object.id} item={object} folderImage={folderImage} urlName={urlName} />)
            :
            (<RenderItem key={object.id} item={object} folderImage={folderImage} urlName={urlName} />)
          )}
        </Slider>
      </div>
    )
}