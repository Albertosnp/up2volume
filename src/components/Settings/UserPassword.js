import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Button, Form, Icon, Input } from 'semantic-ui-react';
import alertErrors from '../../utils/AlertError';
import { logOutApi, reAuthenticateApi, updatePasswordApi } from '../../services/apiConnection';

export const UserPassword = ({ setShowModal, setTitleModal, setContentModal }) => {
    const handlerSumbit = () => {
        setTitleModal("Actualiza tu contraseña");
        setContentModal(<ChangePasswordForm setShowModal={setShowModal} />);
        setShowModal(true);
    };

    return (
        <div className="user-password">
            <h3>Contraseña: xxxxxx</h3>
            <Button circular onClick={handlerSumbit}>Actualizar</Button>
        </div>
    )
}

const ChangePasswordForm = ({ setShowModal }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handlerShowPass = () => {
        setShowPassword(prevState => !prevState);
    };
    const handlerChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    };
    const checkPasswords = (currentPassword, newPass1, newPass2) => {
        const notValidPassword = (!currentPassword || !newPass1 || !newPass2);
        if (notValidPassword) {
           toast.warning("Has dejado algún campo vacío.");
           return false; 
        }

        const isEqualToAllPassword = currentPassword === newPass1;
        if (isEqualToAllPassword) {
            toast.warning("La nueva contraseña no puede ser la misma que la actual.");
            return false;
        }

        const notAreEqualsNewsPassword = newPass1 !== newPass2;
        if (notAreEqualsNewsPassword) {
            toast.warning("La nuevas contraseñas deben ser iguales.");
            return false
        } 

        const isCorrectSize = newPass1.length > 6;
        if (!isCorrectSize) {
            toast.warning("La nueva contraseña debe tener mas de 6 caractéres.");
            return false;
        }
        
        return true
    };

    const handlerSubmit = (event) => {
        event.preventDefault();
        const currentPassword = formData.currentPassword.trim();
        const newPass1 = formData.newPass1.trim();
        const newPass2 = formData.newPass2.trim();
        const isOkPass = checkPasswords(currentPassword, newPass1, newPass2);
        //Pasa todas las validaciones
        if (isOkPass) {
            setIsLoading(true);
            //Se reautentica el usuario
            reAuthenticateApi(currentPassword)
                .then( () => {//CAmbio de password
                    updatePasswordApi(newPass1)
                        .then(() => {
                            toast.success("La contraseña se cambió correctamente.");
                            logOutApi()//Se desloguea al usuario
                        })
                        .catch(error => alertErrors(error.code));

                    setShowModal(false);
                })
                .catch( error => {
                    alertErrors(error.code);
                }) 
            setIsLoading(false);
        }
    };

    return (
        <Form onSubmit={handlerSubmit} onChange={handlerChange} >
            <Form.Field>
                <Input
                    name="currentPassword"
                    placeholder="Contraseña actual"
                    type={showPassword ? "text" : "password"}
                    icon={<Icon name="eye" link onClick={handlerShowPass} />} />
            </Form.Field>
            <Form.Field>
                <Input
                    name="newPass1"
                    placeholder="Nueva contraseña"
                    type={showPassword ? "text" : "password"}
                    icon={<Icon name="eye" link onClick={handlerShowPass} />} />
            </Form.Field>
            <Form.Field>
                <Input
                    name="newPass2"
                    placeholder="Repite la nueva contraseña"
                    type={showPassword ? "text" : "password"}
                    icon={<Icon name="eye" link onClick={handlerShowPass} />} />
            </Form.Field>
            <Button loading={isLoading}>Actualizar</Button>
        </Form>
    )
};