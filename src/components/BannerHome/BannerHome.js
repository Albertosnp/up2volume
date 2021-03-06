import React, { useEffect, useState } from 'react'
import { Image } from 'semantic-ui-react';
import alertErrors from '../../utils/AlertError';
import { downloadBannersApi } from '../../services/apiConnection';
import Slider from 'react-slick';
import "./BannerHome.scss";

export const BannerHome = () => {
    const [bannerUrls, setBannerUrls] = useState([]);
    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 5000,
        cssEase: "linear",
        arrows: false
      };

    //Recupera los banners principales
    useEffect(() => {
        const getUrl = async () => {
            try {
                const banner1 = await downloadBannersApi('banner1.png');
                const banner2 = await downloadBannersApi('banner2.png');
                const banner3 = await downloadBannersApi('banner3.png');
                const banner4 = await downloadBannersApi('banner4.png');
                const banner5 = await downloadBannersApi('banner5.png');
                setBannerUrls([banner5, banner2, banner3, banner4, banner1]); 
            } catch (error) {
                alertErrors(error.code);
            }
        };
        getUrl();
    }, []);

    if (!bannerUrls) return null;
    return (
        <div className="banner-home">
            <Slider {...settings}  >
                {
                    bannerUrls.map(url => <Image key={url} src={url} className="sliderClass"/>)
                }
            </Slider>
        </div>
        
    )
}
