import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "semantic-ui-react";
import firebase from "../../../../utils/Firebase";
import "firebase/storage";

import "./RenderItem.scss"


export const RenderItem = ({ item, folderImage, urlName }) => {
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
        .catch()
    }, [item, folderImage])

    return (
        // <div className="basic-slider-items__list-item">
        //     <div className="avatar" style={style}/>
        //     <h3>{item.name}</h3>
        // </div>
        <Link to={`/${urlName}/${item.id}`} >
            <div className="object__card">
                <Card  className="basic-slider-items__list-item"
                image={avatar}/>
                <h4>{item.name}</h4>
            </div>
        </Link>
        
    )
};