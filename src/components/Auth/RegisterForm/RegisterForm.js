import React from 'react';
import { Icon, Button, Form, Input } from 'semantic-ui-react';
import fireBase from "../../../utils/firebase"
import "firebase/auth";

import "./RegisterForm.scss";

const RegisterForm = ({ setSelectedForm }) => {

    const onSumbit = (params) => {
     
    };
    return (
        <div className="register-form">
            <h1>Empieza a escuchar con una cuenta de up2volume gratis.</h1>
            <Form onSubmit={ onSumbit }>
                <Form.Field>
                    <Input 
                        type="text"
                        name="email"
                        placeholder="Email"
                        icon="mail outline"
                        // onChange={}
                        // error={}
                    />
                </Form.Field>
                <Form.Field>
                    <Input 
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        icon="eye"
                        // onChange={}
                        // error={}
                    />
                </Form.Field>
                <Form.Field>
                    <Input 
                        type="text"
                        name="userName"
                        placeholder="Como deberíamos llamarte?"
                        icon="user circle outline"
                        // onChange={}
                        // error={}
                    />
                </Form.Field>
                <Button>Continuar</Button>
            </Form>
            <div className="register-form__options">
                <p onClick={ () => setSelectedForm(null) }>Volver</p>
                <p>¿Ya tienes up2volume?{" "}
                   <span onClick={ () => setSelectedForm("login") }>Iniciar Sesión</span>
                </p>
            </div>
        </div>
    )
}

export default RegisterForm;