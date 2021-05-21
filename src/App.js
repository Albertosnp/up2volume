import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'
import firebase from './utils/Firebase';
import "firebase/auth"
import { Auth } from './pages/Auth/Auth';
import { LoggedLayout } from './layouts/LoggedLayout/LoggedLayout';
import { logOutApi } from './services/apiConnection';


function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadApp, setReloadApp] = useState(false)

  //Comprueba si el usuario ha cambiado de estado -> verificacion de email
  firebase.auth().onAuthStateChanged(currentUser => {
    //Si el usuario ha confirmado el email... ( ? por si la propiedad no existieses )
    if (currentUser?.emailVerified) setUser(currentUser);
    else{
      logOutApi() //deslogua porque no tiene el email verificado
      setUser(null);
    }
    setIsLoading(false);
  });

  if (isLoading) return null;

  return(
    <>
      { user ? <LoggedLayout user={user} setReloadApp={setReloadApp} /> : <Auth /> }
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover={false}
      />
    </>
  )
}

export default App;