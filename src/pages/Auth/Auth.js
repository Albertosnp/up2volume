import React, { useState } from 'react'
import AuthOptions from "../../components/Auth/AuthOptions/AuthOptions";
import RegisterForm from "../../components/Auth/RegisterForm";
import LoginForm from "../../components/Auth/LoginForm";
import BackGroundAuth from "../../assets/jpg/background-auth.jpg"
import BackGroundAuth2 from "../../assets/png/fondo.png"
import LogoNameWhite from "../../assets/png/logo-blanco.png"

import "./Auth.scss";

export const Auth = () => {
    const [selectedForm, setSelectedForm] = useState(null);

    const handlerForm = () => {
        switch (selectedForm) {
            case "login":
                return <LoginForm setSelectedForm={ setSelectedForm } />;
            case "register":
                return <RegisterForm setSelectedForm={ setSelectedForm } />;
            default:
                return <AuthOptions setSelectedForm={ setSelectedForm } />;
        }
    };

    return (
        <div
            className="auth"
            style={{ backgroundImage: `url( ${BackGroundAuth2} )` }} >
                
            <div className="auth__dark" />
            <div className="auth__box" >
                <div className="auth__box-logo">
                    <img src={LogoNameWhite} alt="up2volume" />
                </div>
                { handlerForm() }
            </div>      
        </div>
    )
}
