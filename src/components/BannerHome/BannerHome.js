import React, { useEffect, useState } from 'react'
import { Image } from 'semantic-ui-react';
import alertErrors from '../../utils/AlertError';
import { downloadBannersApi } from '../../services/apiConnection';
import "./BannerHome.scss";

export const BannerHome = () => {
    const [bannerUrl, setBannerUrl] = useState(null);

    const style = {
        backgroundImage: `url('${bannerUrl}')`
    }
    //Recupera los banners principales
    useEffect(() => {
        const getUrl = async () => {
            try {
                const url = await downloadBannersApi();
                setBannerUrl(url);
            } catch (error) {
                alertErrors(error.code);
            }    
        };
        getUrl();
    }, []);

    if (!bannerUrl) return null;
    return (
        <div className="banner-home" style={style}>
        </div>
    )
}
