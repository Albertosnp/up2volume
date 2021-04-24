import React, { useState } from 'react';
import { Icon, Button, Form, Input } from 'semantic-ui-react';
import { toast } from 'react-toastify'
import fireBase from "../../../utils/firebase"
import { isValidateEmail } from '../../../utils/validations';

import "firebase/auth";
import "./RegisterForm.scss";


const INITIAL_FORM = {
    email: '',
    password: '',
    userName: ''
};

const RegisterForm = ({ setSelectedForm }) => {

    const [formData, setFormData] = useState(INITIAL_FORM);//El valor del formulario se inicia vacio
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    //Guarda-Cambia en el estado los valores de los inputs 
    const handlerChange = (event) => {
        //al cambiar el campo, lo añade con ...spread y sobrescribe el cambiado
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };
    //Cambia el estado para mostrar u ocultar password
    const handlerShowPassword = () => {
        // showPassword ? setShowPassword(false) : setShowPassword(true); 
        setShowPassword(!showPassword);
    };

    //Funcion que envia al backend (firebase) el registro de usuario
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
        if (!formData.userName.trim()) {
            errors.userName = true;
            formOk = false;
        }
        //Cambia el estado de los errores para mostralos al usuario
        setFormError(errors);
        
        if (formOk) {
            //Añade el spinner de cargando
            setIsLoading(true);
            fireBase
                .auth()
                .createUserWithEmailAndPassword(formData.email, formData.password)
                .then(() => {
                    // toast.success("Registro completado");
                    changeUserName();
                    sendEmailVerification();
                })
                .catch(( error ) => toast.error("Error al crear la cuenta"))
                .finally(() => {
                    setIsLoading(false);
                    setSelectedForm(null);//Redirecciona al menu de eleccion de formulario (Login - )
                });
                
        }

    };
    //Conecta con Firebase y Registra el nombre de usuario en la bbdd del user actual
    const changeUserName = () => {
        fireBase.auth().currentUser.updateProfile({
            displayName: formData.userName
        })
        .catch(() => toast.error("Error al asignar el nombre de usuario."))    
    };

    //Enviar el email para verificar la cuenta 
    const sendEmailVerification = () => {
        fireBase.auth().currentUser.sendEmailVerification()
        .then(() => 
            toast.success("Se ha enviado un email de verificación."))
        .catch(() => 
            toast.error("Error al enviar el email de verificación."));
    };

    return (
        <div className="register-form">
            <h1>Empieza a escuchar con una cuenta de up2volume gratis.</h1>
            <Form onSubmit={handlerSubmit} onChange={handlerChange}>
                <Form.Field>
                    <Input
                        type="text"
                        name="email"
                        placeholder="Email"
                        icon="mail outline"
                        value={formData.email}
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
                        value={formData.password}
                        error={formError.password}
                    />
                    {formError.password ?
                        (<span className="error-text">La contraseña debe tener más de 5 caracteres</span>)
                        :
                        ""
                    }
                </Form.Field>
                <Form.Field>
                    <Input
                        type="text"
                        name="userName"
                        placeholder="Como deberíamos llamarte?"
                        icon="user circle outline"
                        value={formData.userName}
                        error={formError.userName}
                    />
                    {formError.userName ?
                        (<span className="error-text">Por favor, introduce un nombre de ususario válido</span>)
                        :
                        ""
                    }
                </Form.Field>
                <Button loading={isLoading} >Continuar</Button>
            </Form>
            <div className="register-form__options">
                <p onClick={() => setSelectedForm(null)}>Volver</p>
                <p>¿Ya tienes up2volume?{" "}
                    <span onClick={() => setSelectedForm("login")}>Iniciar Sesión</span>
                </p>
            </div>
        </div>
    )
}

export default RegisterForm;