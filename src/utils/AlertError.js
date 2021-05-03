import { toast } from "react-toastify";

const alertErrors = (typeOfError = 'default') => {
    switch (typeOfError) {
        case "auth/wrong-password":
            toast.warning("La contraseña no es correcta.")
            break;
        case "auth/email-already-in-use":
            toast.warning("El email ya está en uso.")
            break;
        case "storage/object-not-found":
            toast.warning("Algún elemento no se pudo cargar.");
            break;  
        default:
            toast.warning("Ups... Algo salió mal.")
            break;
    }
};

export default alertErrors;