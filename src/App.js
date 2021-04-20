import React, { useState } from 'react';
import firebase from './utils/firebase';
import "firebase/auth"
import { Auth } from './pages/Auth/Auth';


function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  firebase.auth().onAuthStateChanged(currentUser => {
    if (currentUser) 
      setUser(currentUser);
    
    setIsLoading(false);
  });

  if (isLoading) {
    return null;
  }

  return (
    user ? 
    <UserLogged /> 
    : 
    <Auth />
  );
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
