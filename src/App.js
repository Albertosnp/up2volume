import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify'
import firebase from './utils/firebase';
import "firebase/auth"
import { Auth } from './pages/Auth/Auth';


function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  firebase.auth().onAuthStateChanged(currentUser => {
    console.log(currentUser);
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
      { user ? <UserLogged /> : <Auth /> }
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

const UserLogged = () => {
  const logOut = () => {
    firebase.auth().signOut();
  };

  return(
    <div 
      style={{ 
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column",
        height: "100vh"
     }}
    >
      <h1>Usuario Logueado</h1>
      <button onClick={ logOut }>Cerrar session</button>
    </div>
  )
};

export default App;
