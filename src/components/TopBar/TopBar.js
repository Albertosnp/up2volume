import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Icon, Image, Dropdown } from "semantic-ui-react";
import firebase from "../../utils/Firebase";
import "firebase/auth";

import UserImage from "../../assets/png/user.png";
import "./TopBar.scss";

const TopBar = ({ user, history }) => {
  const logOut = () => {
    firebase.auth().signOut();
  };

  const goBack = () => {
    history.goBack();
  };

  const trigger = (
    <span>
        <Image src={user.photoURL ? user.photoURL : UserImage} />
        {user.displayName}
    </span>
  )

  return (
    <div className="top-bar">
      <div className="top-bar__left">
        <Icon name="angle left" onClick={goBack} />
      </div>
      <div className="top-bar__right">
        <Dropdown item trigger={trigger}>
          <Dropdown.Menu>
            <Link to="/settings">
                <Dropdown.Item >Cuenta</Dropdown.Item>
            </Link>
            <Dropdown.Item onClick={logOut}>Cerrar session <Icon name="power off"  /></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {/* <Link to="/settings" >
                    <Image src={UserImage} />
                    {user.displayName}
                </Link>
                <Icon name="power off" onClick={logOut} /> */}
      </div>
    </div>
  );
};

export default withRouter(TopBar);