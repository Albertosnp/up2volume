import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Form, Image, Input } from 'semantic-ui-react';
import NoImage from "../../../assets/png/no-image.png";

import "./AddArtistForm.scss";

export const AddArtistForm = ({ setShowModal }) => {
    const [urlBanner, setUrlBanner] = useState(null);
    const [file, setFile] = useState(null);

    const style = { backgroundImage: `url('${urlBanner}')`}
    const styleAvatar = { 
        backgroundImage:  `url('${urlBanner? urlBanner : NoImage}')` 
    }

    const onDrop = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        setFile(file);
        setUrlBanner(URL.createObjectURL(file));
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    })

    const handlerSubmit = () => {
    
    };
    //TODO: añadir descripcion a los campos para el usuario -> banner y avatar 
    return (
        <Form className="add-artist-form" onSubmit={handlerSubmit}>
            <Form.Field className="artist-banner">
                <div {...getRootProps()} className="banner" style={style}>
                    <input {...getInputProps()}/>
                    {!urlBanner&& <Image src={NoImage}/> }
                </div>
            </Form.Field>
            <Form.Field className="artist-avatar">
                <div className="avatar" style={styleAvatar} />
            </Form.Field>
            <Form.Field>
                <Input placeholder="Nombre del artista" />
            </Form.Field>
            <Button>Crear artistas</Button>
        </Form>
    )
}


// const {
    //     getRootProps,
    //     getInputProps,
    //     isDragActive,
    //     isDragAccept,
    //     isDragReject
    //   } = useDropzone({
    //     accept: 'image/jpeg, image/png',
    //     noKeyboard: true,
    //     maxSize: 300000
    //   });
    
    //   const style = useMemo(() => ({
    //     ...baseStyle,
    //     ...(isDragActive ? activeStyle : {}),
    //     ...(isDragAccept ? acceptStyle : {}),
    //     ...(isDragReject ? rejectStyle : {})
    //   }), [
    //     isDragActive,
    //     isDragReject,
    //     isDragAccept
    //   ]);


// const baseStyle = {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: '20px',
//     borderWidth: 2,
//     borderRadius: 2,
//     borderColor: '#eeeeee',
//     borderStyle: 'dashed',
//     backgroundColor: '#fafafa',
//     color: '#bdbdbd',
//     outline: 'none',
//     transition: 'border .24s ease-in-out'
//   };
  
//   const activeStyle = {
//     borderColor: '#2196f3'
//   };
  
//   const acceptStyle = {
//     borderColor: '#00e676'
//   };
  
//   const rejectStyle = {
//     borderColor: '#ff1744'
//   };