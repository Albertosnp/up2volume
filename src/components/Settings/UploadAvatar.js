import React, { useState } from 'react';
import { Image } from 'semantic-ui-react';
import avatarDefecto from "../../assets/png/user.png";

export const UploadAvatar = ({ user }) => {
    const [avatarUrl, setAvatarUrl] = useState(user.photoUrl);

    return (
        <div className="user-avatar">
            <Image src={avatarUrl ? avatarUrl : avatarDefecto} />
            
        </div>
    )
}
