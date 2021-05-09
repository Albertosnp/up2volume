import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "semantic-ui-react";
import firebase from "../../../../utils/Firebase";
import "firebase/storage";

import "./RenderItemArtist.scss"

export const RenderItemArtist = ({ item, folderImage, urlName }) => {
    const [avatar, setAvatar] = useState(null);
    
    const style = {
        backgroundImage: `url(${avatar})`,
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

        <Link to={`/${urlName}/${item.id}`} >
            <div className="object__card">
                <Card  className="basic-slider-items__list-artist"
                image={avatar}/>
                <h4>{item.name}</h4>
            </div>
        </Link>
        
    )
};