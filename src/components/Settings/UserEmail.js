import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Button, Form, Icon, Input } from 'semantic-ui-react'
import alertErrors from '../../utils/AlertError';
import { reAuthenticate } from "../../utils/Api";
import firebase from '../../utils/Firebase';
import "firebase/auth"

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

    const handlerSubmit = () => {
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
            reAuthenticate(formData.password)
                .then(() => {
                    //Se actualiza el email
                    firebase.auth()
                        .currentUser
                        .updateEmail(formData.email)
                        .then(() => {
                            toast.success("Email actualizado.")
                            setIsLoading(false)
                            setShowModal(false)
                            //verificacion por email
                            firebase.auth().currentUser.sendEmailVerification()
                                .then(() => firebase.auth().signOut())
                        })
                        .catch(error => {
                            alertErrors(error.code)
                            setIsLoading(false)
                        })
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