import React, { useState } from 'react'
import { Button, Form, Icon, Input } from 'semantic-ui-react'


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
            <Button circular onClick={ onEdit } >Actualizar</Button>
        </div>
        
    )
}

const ChangeEmailForm = ({ email, setShowModal }) => {
    const [isVisible, setIsVisible] = useState(false)
    
    const handlerSubmit = () => {
        setShowModal(false)
    };

    const handlerVisiblePass = () => {
        setIsVisible( prevState => !prevState )
    };

    return (
        <Form onSubmit={ handlerSubmit }>
            <Form.Field>
                <Input 
                    defaultValue={email}
                    type="text"
                />
            </Form.Field>
            <Form.Field>
                <Input 
                    placeholder="Contraseña"
                    type={isVisible? "text" : "password" }
                    icon={
                        <Icon name={isVisible? "eye slash outline" : "eye" } 
                            link 
                            onClick={ handlerVisiblePass } 
                            />
                    }
                />
            </Form.Field>
            <Button>Actualizar</Button>
        </Form>
    )
};