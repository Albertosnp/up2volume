import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "semantic-ui-react";

import "./RenderItem.scss"
import { getUrlAvatarApi } from "../../../../services/apiConnection";

export const RenderItem = ({ item, folderImage, urlName }) => {
    const [avatar, setAvatar] = useState(null);
    
    const style = {
        backgroundImage: `url(${avatar})`,
    }

    //Recoge la imagen del item
    useEffect(() => {
        const fetchMyAPI = async () => {
            try {
                const urlAvatar = await getUrlAvatarApi(`${folderImage}/${item.avatar}`)
                setAvatar(urlAvatar)
            } catch {}
        }; 
        fetchMyAPI()
    }, [item, folderImage])

    return (
        <Link to={`/${urlName}/${item.id}`} >
            <div className="object__card">
                <Card  className="basic-slider-items__list-item"
                image={avatar}/>
                <h4>{item.name}</h4>
            </div>
        </Link>
    )
};