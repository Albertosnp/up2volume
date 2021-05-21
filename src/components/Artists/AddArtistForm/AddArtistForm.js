import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {Dropzone} from "./Dropzone";
import { Button, Form, Input } from 'semantic-ui-react';
import NoImage from "../../../assets/png/no-image.png";
import { v4 as uuidv4 } from 'uuid';
import { uploadArtistApi, uploadGenericImageApi,  } from '../../../services/apiConnection';

import "./AddArtistForm.scss";

//TODO: añadir genero de musica, descripcion...

export const AddArtistForm = ({ setShowModal }) => {
    const [formData, setFormData] = useState(initialForm)
    const [isLoading, setIsLoading] = useState(false);
    const [fileBanner, setFileBanner] = useState(null);
    const [fileAvatar, setFileAvatar] = useState(null);
    const [urlBanner, setUrlBanner] = useState({
        content: null,
        preview: null
    });
    const [urlAvatar, setUrlAvatar] = useState({
        content: null,
        preview: null
    })

    const styleBanner = { backgroundImage: `url('${urlBanner}')` }
    const styleAvatar = { backgroundImage: `url('${urlBanner ? urlBanner : NoImage}')`}

    const handlerChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value.trim()
        })
    }

    //resetea valores del formulario
    const resetForm = () => {
        setFormData(initialForm);
        setUrlBanner({
            content: null,
            preview: null
        });
        setUrlAvatar({
            content: null,
            preview: null
        });
    };
    
    const handlerSubmit = async (event) => {
        event.preventDefault();
        //Validacion de campos
        if (!formData.name) return toast.warning("Debes añadir el nombre del artista.");
        if (!urlBanner.content) return toast.warning("Debes añadir el banner del artista.");
        if (!urlAvatar.content) return toast.warning("Debes añadir el avatar del artista.");

        setIsLoading(true);
        try {
            const uidImageBanner = uuidv4();//Genera el uid unico para la imagen banner
            const uidImageAvatar = uuidv4();//Genera el uid unico para la imagen banner
            await uploadGenericImageApi(`artists/banners/${uidImageBanner}`, fileBanner); //Sube el banner
            await uploadGenericImageApi(`artists/avatars/${uidImageAvatar}`, fileAvatar); //Sube el avatar
            await uploadArtistApi(uidImageBanner, uidImageAvatar, formData.name); //Sube el artista
            resetForm(); //No es necesario
            toast.success("El artista se ha añadido correctamente.");
            setIsLoading(false);
            setShowModal(false);
        } catch (error) {
            toast.error("Ups... Algo salió mal.");
            setIsLoading(false);
        }
    };

    //TODO: añadir descripcion a los campos para el usuario -> banner y avatar 
    return (
        <Form className="add-artist-form" onSubmit={handlerSubmit} onChange={handlerChange}>
            <Dropzone classNameField={"artist-banner"} classNameDiv={"banner"} 
                file={urlBanner} setUrl={setUrlBanner} 
                styleMod={styleBanner}  setWholeFile={setFileBanner} />
            <Dropzone classNameField={"artist-avatar"} classNameDiv={"avatar"} 
                file={urlAvatar} setUrl={setUrlAvatar} 
                styleMod={styleAvatar} setWholeFile={setFileAvatar} />
            <Form.Field>
                <Input placeholder="Nombre del artista" name="name" />
            </Form.Field>
            <Button>Crear Artista</Button>
        </Form>
    )
}

const initialForm = () => {
    return {
        name: ""
    }
};