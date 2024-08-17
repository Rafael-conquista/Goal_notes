import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { useParams } from 'react-router-dom';
import AmigoFotoComponent from '../components/amigoFoto.js';
import LogoffButton from '../components/logoffButton.js'
import "./Style/navbar.css";

function Navbar() {
  const [show, setShow] = useState(false);
  const { id } = useParams();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <nav className="navbar navbar-light shadow navbar_view">
        <div className="container-fluid">
          <h1 className="menu_title" href="#">
              Goal notes
          </h1>
          <TiThMenu className="burguer_menu" onClick={handleShow} />
        </div>
        <Offcanvas
          show={show}
          placement="end"
          onHide={handleClose}
          className="offcanvas"
        >
          <Offcanvas.Header>
            <AmigoFotoComponent id = {id}/>
            <h2 className="menu_title_hide">Vamos navegar juntos pelo site!</h2>
          </Offcanvas.Header>
          <ul className="navbar_items">
            <li className="menu_item_nav" onClick={handleClose}>
              <a className="menu_link center" href="home" >
                <div className="item_home">
                  <a className="menu_link btn_navbar_home">
                    home
                  </a>
                </div>
              </a>
            </li>
            <li className="menu_item_nav" onClick={handleClose}>
              <a className="menu_link center" href="goals" >
                <div className="item_metas">
                  <a className="menu_link btn_navbar_metas">
                    metas
                  </a>
                </div>
              </a>
            </li>
            <li className="menu_item_nav" onClick={handleClose}>
              <a className="menu_link center" href="store" >
                <div className="item_loja">
                  <a className="menu_link btn_navbar_loja">
                    loja
                  </a>
                </div>
              </a>
            </li>
            <LogoffButton />
          </ul>
        </Offcanvas>
      </nav>
      <div className="fine_line"></div>
    </div>
  );
}

export default Navbar;
