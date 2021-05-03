import React, { useEffect, useState } from 'react'
import firebase from "../../utils/Firebase";
import { Image } from 'semantic-ui-react';
import "firebase/storage";

import "./BannerHome.scss";
import alertErrors from '../../utils/AlertError';


export const BannerHome = () => {
    const [bannerUrl, setBannerUrl] = useState(null);

    const downloadBanners = async () => {
        try {
            const url = await firebase
                            .storage()
                            .ref("others/banner-home.jpg")
                            .getDownloadURL();
            return url;
        } catch (error) {
            alertErrors(error.code);
        }
    };
    const style = {
        backgroundImage: `url('${bannerUrl}')`
    }

    useEffect(() => {
        const getUrl = async () => {
            const url = await downloadBanners();
            setBannerUrl(url);
        };
        getUrl();
    }, []);

    if (!bannerUrl) return null;
    return (
        <div className="banner-home" style={style}>
            {/* <Image src={bannerUrl} /> */}
        </div>
    )
}
