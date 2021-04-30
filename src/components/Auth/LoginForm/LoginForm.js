import React, { useState } from 'react';
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { isValidateEmail } from "../../../utils/Validations";
import firebase from "../../../utils/Firebase";
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
    const [userActive, setUserActive] = useState(true);
    const [user, setUser] = useState(null);

    //Guarda-Cambia en el estado los valores de los inputs 
    const handlerChange = (event) => {
        //al cambiar el campo, lo añade con ...spread y sobrescribe el cambiado
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
        // console.log(formData);
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
            setIsLoading(true);
            
            firebase
            .auth()
            .signInWithEmailAndPassword( formData.email, formData.password)
            .then(response  => {
                setUser(response.user);
                setUserActive(response.user.emailVerified);
                //Si evaluo el estado no entra...
                if (!response.user.emailVerified) {
                    toast.warning("Debes verificar la cuenta.")    
                }
            })
            .catch( error =>  handlerErrors(error.code))
            .finally(() => setIsLoading(false));
        }

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
                <Button loading={isLoading}>Iniciar sesión</Button>
            </Form>

            {   //Si el usuario no esta activo, se muestra componente para reenvio de email
                !userActive ?
                    <ButtonReSendEmailVerification user={user} setIsLoading={setIsLoading} setUserActive={setUserActive}/>
                :
                ""   
            }        

            <div className="login-form__options">
                <p onClick={() => setSelectedForm(null)}>Volver</p>
                <p>¿No te has registrado?{" "}
                    <span onClick={() => setSelectedForm("register")}>Regístrate</span>
                </p>
            </div>
        </div>
    )
}

//Componente que al clicarlo reevia una confirmacion al email
const ButtonReSendEmailVerification = ({ user, setIsLoading, setUserActive }) => {

    const reSendVerificationEmail = () => {
        user.sendEmailVerification()
        .then(() => toast.success("Se ha enviado el email de verificación."))
        .catch( error => handlerErrors(error.code))
        .finally( () => {
            setIsLoading(false);
            setUserActive(true);
        })
    };

    return (
        <div className="resend-verification-email">
            <p>Si no has recibido el email de verificación puedes 
                volver a enviarlo haciendo click <span onClick={reSendVerificationEmail}>aquí.</span>
            </p>
        </div>
    )
};
//Manejador del error pasado por parametro, y lanza un toast
const handlerErrors = (code) => {
    switch (code) {
        case "auth/wrong-password": 
            toast.warning("El usuario o la contraseña no son correctos.");
            break;
        case "auth/too-many-requests":
            toast.warning("Has enviado demasiadas solicitudes de confirmación.");
        break;
        case "auth/user-not-found":
            toast.warning("El usuario o la contraseña no son correctos.");
        break;
        default:
            break;
    }

};

export default LoginForm;