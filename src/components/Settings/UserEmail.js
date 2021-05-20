import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Button, Form, Icon, Input } from 'semantic-ui-react'
import alertErrors from '../../utils/AlertError';
import { logOutApi, reAuthenticateApi, sendEmailVerificationApi, updateEmailApi } from '../../services/apiConnection';

export const UserEmail = ({ user, setShowModal, setTitleModal, setContentModal }) => {

    const onEdit = () => {
        // setReloadApp={setReloadApp}
        setContentModal(<ChangeEmailForm email={user.email} setShowModal={setShowModal} />);
        setTitleModal("Actualizar email");
        setShowModal(true);
    };

    return (
        <div className="user-email">
            <h3>Email: {user.email}</h3>
            <Button circular onClick={onEdit} >Actualizar</Button>
        </div>

    )
}

const ChangeEmailForm = ({ email, setShowModal }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [formData, setFormData] = useState({ email: email, password: '' })
    const [isLoading, setIsLoading] = useState(false)

    const handlerSubmit = (event) => {
        event.preventDefault();
        const isValidEmail = (formData.email !== email && formData.email !== '')
        const isEqual = formData.email === email

        if (!isValidEmail) {
            isEqual ?
                toast.warning("El email no puede ser el mismo.")
                :
                toast.warning("El email no se puede dejar vacío")
        }
        if (isValidEmail) {
            setIsLoading(true);
            //Asegura los credenciales mediante password
            reAuthenticateApi(formData.password)
                .then(() => {
                    const fetchMyAPI = async() => {
                        try {
                            await updateEmailApi(formData.email)//Se actualiza el email
                            toast.success("Email actualizado.")
                            setIsLoading(false)
                            setShowModal(false)
                            //se envia verificacion por email
                            await sendEmailVerificationApi()
                            await logOutApi()
                        } catch (error) {
                            alertErrors(error.code)
                            setIsLoading(false)
                        }
                    };
                    fetchMyAPI()
                })
                .catch(error => {
                    alertErrors(error?.code) 
                })
        }
        setIsLoading(false)
    };

    const handlerChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    };

    const handlerVisiblePass = () => {
        setIsVisible(prevState => !prevState)
    };

    return (
        <Form onSubmit={handlerSubmit}>
            <Form.Field>
                <Input
                    name="email"
                    defaultValue={email}
                    type="text"
                    onChange={handlerChange}
                />
            </Form.Field>
            <Form.Field>
                <Input
                    name="password"
                    placeholder="Contraseña"
                    onChange={handlerChange}
                    type={isVisible ? "text" : "password"}
                    icon={
                        <Icon name={isVisible ? "eye slash outline" : "eye"}
                            link
                            onClick={handlerVisiblePass}
                        />
                    }
                />
            </Form.Field>
            <Button loading={isLoading}>Actualizar</Button>
        </Form>
    )
};