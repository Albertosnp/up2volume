import React, { useState } from 'react';
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { isValidateEmail } from "../../../utils/validations";
import firebase from "../../../utils/firebase";
import "firebase/auth";

import "./LoginForm.scss";

const INITIAL_FORM = {
    email: '',
    password: '',
};

const LoginForm = ({ setSelectedForm }) => {
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userActive, setUserActive] = useState(false);
    const [user, setUser] = useState(null);

    //Guarda-Cambia en el estado los valores de los inputs 
    const handlerChange = (event) => {
        //al cambiar el campo, lo añade con ...spread y sobrescribe el cambiado
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
        console.log(formData);
    };

    const handlerShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handlerSubmit = () => {
        setFormError({});
        let errors = {};
        let formOk = true;

        if (!isValidateEmail(formData.email)) {
            errors.email = true;
            formOk = false;
        }
        if (formData.password.length < 6) {
            errors.password = true;
            formOk = false;
        }
        //Cambia el estado de los errores para mostralos al usuario
        setFormError(errors);

        if (formOk) {
            console.log("formulario correcto");
        }
        console.log("Login enviado...");
        console.log(formData);
    };

    return (
        <div className="login-form">
            <h1>Accede a toda la música gratis</h1>
            <Form onSubmit={handlerSubmit} onChange={handlerChange} >
                <Form.Field>
                    <Input
                        type="text"
                        name="email"
                        placeholder="Email"
                        icon="mail outline"
                        error={formError.email}
                    />
                    {formError.email ?
                        (<span className="error-text">Por favor, introduce un email válido</span>)
                        :
                        ""
                    }
                </Form.Field>
                <Form.Field>    
                    <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Contraseña"
                        icon=
                        {showPassword ?
                            (<Icon name="eye slash outline" link onClick={handlerShowPassword} />)
                            :
                            (<Icon name="eye" link onClick={handlerShowPassword} />)
                        }
                        error={formError.password}
                    />
                    {formError.password ?
                        (<span className="error-text">La contraseña debe tener más de 5 caracteres</span>)
                        :
                        ""
                    }
                </Form.Field>
                <Button>Iniciar sesión</Button>
            </Form>
            <div className="login-form__options">
                <p onClick={() => setSelectedForm(null)}>Volver</p>
                <p>¿Aún no te has registrado?{" "}
                    <span onClick={() => setSelectedForm("register")}>Regístrate</span>
                </p>
            </div>
        </div>
    )
}

export default LoginForm;