import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import "./Style/navbar.css";

function Navbar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <nav className="navbar navbar-light shadow navbar_view">
        <div className="container-fluid">
          <h1 className="menu_title" href="#">
            <a href="#" className="menu_link">
              Portifólio
            </a>
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
            <h2 className="menu_title">Bem-vindo ao meu portifólio!</h2>
            <TiThMenu className="burguer_menu" onClick={handleClose} />
          </Offcanvas.Header>
          <ul>
            <li className="menu_item_nav" onClick={handleClose}>
              <a href="#" className="menu_link">
                Início
              </a>
            </li>
            <li className="menu_item_nav" onClick={handleClose}>
              <a href="#about" className="menu_link">
                Sobre mim
              </a>
            </li>
            <li className="menu_item_nav" onClick={handleClose}>
              <a href="#skills" className="menu_link">
                Habilidades
              </a>
            </li>
            <li className="menu_item_nav" onClick={handleClose}>
              <a href="#projetos" className="menu_link">
                Projetos
              </a>
            </li>
            <li className="menu_item_nav" onClick={handleClose}>
              <a href="#footer" className="menu_link">
                Entrar em contato
              </a>
            </li>
          </ul>
        </Offcanvas>
      </nav>
      <div className="fine_line"></div>
    </div>
  );
}

export default Navbar;
