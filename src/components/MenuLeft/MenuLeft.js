import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";
import { isUserAdmin } from "../../utils/Api";
import { AddAlbumForm } from "../Albums/AddAlbumForm/AddAlbumForm";
import { AddArtistForm } from "../Artists/AddArtistForm/AddArtistForm";
import { BasicModal } from "../Modal/BasicModal/BasicModal";

import "./MenuLeft.scss";

const MenuLeft = ({ user, location }) => {
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [userAdmin, setUserAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState("");

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);

  useEffect(() => {
    isUserAdmin(user.uid)
      .then(response => setUserAdmin(response))
  }, [user]);

  const handlerMenu = (event, menu) => {
    //CAmbia el estado por la propiedad de Menu.Item (to) que es la direccion donde estamos
    setActiveMenu(menu.to);
  };

  const handlerModal = (type) => {
    switch (type) {
      case "artist":
        setTitleModal("Nuevo artista");
        setContentModal(<AddArtistForm setShowModal={setShowModal} />);
        setShowModal(true);
        break;
      case "song":
        setTitleModal("Nuevo tema");
        setContentModal(<h2>Formulario nuevo tema</h2>);
        setShowModal(true);
        break;
      case "album":
        setTitleModal("Nuevo album");
        setContentModal(<AddAlbumForm setShowModal={setShowModal} />);
        setShowModal(true);
        break;
      default:
        setTitleModal('');
        setContentModal('');
        setShowModal(false);
        break;
    }
  };

  return (
    <>
      <Menu className="menu-left" vertical>
        <div className="top">
          <Menu.Item
            as={Link}
            to="/"
            name="home"
            active={activeMenu === "/"}
            onClick={handlerMenu}
          >
            <Icon name="home" /> Inicio
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/artists"
            name="artists"
            active={activeMenu === "/artists"}
            onClick={handlerMenu}
          >
            <Icon name="music" /> Artistas
          </Menu.Item>
        </div>

        {userAdmin ?
          <div className="footer">
            <Menu.Item name="artist" onClick={() => handlerModal('artist')} >
              <Icon name="plus square outline" /> Nuevo Artista
            </Menu.Item>
            <Menu.Item name="tema" onClick={() => handlerModal('song')} >
              <Icon name="plus square outline" /> Nuevo Tema
            </Menu.Item>
            <Menu.Item name="tema" onClick={() => handlerModal('album')} >
              <Icon name="plus square outline" /> Nuevo Album
            </Menu.Item>


            <BasicModal show={showModal} setShow={setShowModal} title={titleModal} >
              {contentModal}
            </BasicModal>
          </div>
          :
          ""
        }
      </Menu>
    </>
  );
};

export default withRouter(MenuLeft);
