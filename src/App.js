import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'
import firebase from './utils/Firebase';
import "firebase/auth"
import { Auth } from './pages/Auth/Auth';
import { LoggedLayout } from './layouts/LoggedLayout/LoggedLayout';


function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadApp, setReloadApp] = useState(false)

  firebase.auth().onAuthStateChanged(currentUser => {
    //Si el usuario ha confirmado el email... ( ? por si la propiedad no existieses )
    if (currentUser?.emailVerified) setUser(currentUser);
    else{
      firebase.auth().signOut();
      setUser(null);
    }
    setIsLoading(false);
    
  });

  if (isLoading) {
    return null;
  }

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
