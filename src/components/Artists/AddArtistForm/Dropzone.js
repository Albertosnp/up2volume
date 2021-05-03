import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import {  Form, Image } from 'semantic-ui-react';
import NoImage from "../../../assets/png/no-image.png";

import "./AddArtistForm.scss";

export const Dropzone = ({ file, setFile, classNameField, classNameDiv, setWholeFile }) => {
    const {
        getRootProps,
        getInputProps,
    } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop: (acceptedFile) => {
            const fileUploated = acceptedFile[0];
            //VAlida que la imagen exceda de 1 Mb
            const isGoodSize = (1000000 > fileUploated.size)
            if (!isGoodSize) return toast.warning("La imagen no puede exceder de 1Mb");
            setWholeFile(fileUploated)
            setFile({
                ...file,
                content: URL.createObjectURL(fileUploated)
            })
        }
    });

    return (
        <Form.Field className={classNameField} >
            <div className={classNameDiv} {...getRootProps()} style={{ backgroundImage: `url('${file.content}')` }}>
                <input {...getInputProps()} />
                {!file.content &&<Image src={NoImage} />}
            </div>
        </Form.Field>  
    )
}
