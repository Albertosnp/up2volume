import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, Input } from 'semantic-ui-react';
import { updateNameUser } from '../../services/apiConnection';

export const UserName = ({ user, setShowModal, setTitleModal, setContentModal, setReloadApp }) => {

    const onEdit = () => {
        setContentModal(<ChangeDisplayNameForm displayName={user.displayName} setShowModal={setShowModal} setReloadApp={setReloadApp} />)
        setTitleModal("Actualizar nombre")
        setShowModal(true)
    };

    return (
        <div className="user-name">
            <h2>{user.displayName}</h2>
            <Button circular onClick={onEdit}>
                Actualizar
            </Button>
        </div>
    )
}

const ChangeDisplayNameForm = ({ displayName, setShowModal, setReloadApp }) => {
    const [name, setName] = useState(displayName);
    const [isLoading, setIsLoading] = useState(false)

    const handlerSubmit = () => {

        const notChange = (displayName === name || !name);
        if (!notChange) {
            setIsLoading(true)
            updateNameUser(name)
                .then(() => {
                    setReloadApp(prevState => !prevState)
                    toast.success("El nombre se cambió correctamente.")
                    setIsLoading(false);
                    setShowModal(false);
                })
                .catch(() => {
                    toast.error("No se pudo cambiar el nombre.")
                    setIsLoading(false);
                    setShowModal(false);
                })
        } else
            setShowModal(false)

    };

    return (
        <Form onSubmit={handlerSubmit} >
            <Form.Field>
                <Input defaultValue={displayName} name="userName" onChange={e => setName(e.target.value)} />
            </Form.Field>
            <Button loading={isLoading}>Actualizar</Button>
        </Form>
    )
};