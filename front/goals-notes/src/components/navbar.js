import React, { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import cap_coins from "../images/capCoin.png";
import { TiThMenu } from "react-icons/ti";
import { useParams } from "react-router-dom";
import AmigoFotoComponent from "../components/amigoFoto.js";
import LogoffButton from "../components/logoffButton.js";
import { get_user } from "../services/user_requests";
import "./Style/navbar.css";

function Navbar() {
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const [capcoins, setcapcoins] = useState();
  const [loading, setloading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function get_coins(id) {
    const user = await get_user(id);
    return user;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const update_coin = JSON.parse(sessionStorage.getItem("update_coin"));

      if (update_coin) {
        get_coins(id).then((user) => {
          if (user) {
            setcapcoins(user.capcoins);
            setloading(false);
          } else {
            setloading(true);
          }
        });
        sessionStorage.removeItem("update_coin");
      }
    }, 1600);

    return () => clearInterval(intervalId);
  }, [id]);

  useEffect(() => {
    get_coins(id).then((user) => {
      if (user) {
        setcapcoins(user.capcoins);
        setloading(false);
      } else {
        setloading(true);
      }
    });
  }, [id, capcoins]);

  return (
    <div>
      <nav className="navbar navbar-light shadow navbar_view">
        <div className="container-fluid">
          <h1 className="menu_title" href="#">
            Goal notes
          </h1>
          <TiThMenu className="burguer_menu" onClick={handleShow} />
        </div>
        <div className="cap_coin_nav">
          <img src={cap_coins} alt="vazio" className="cap_coins_img" />
          <p className="cap_coins">capcoins {capcoins}</p>
        </div>
        <Offcanvas
          show={show}
          placement="end"
          onHide={handleClose}
          className="offcanvas"
        >
          <Offcanvas.Header>
            <AmigoFotoComponent id={id} />
            <h2 className="menu_title_hide">Vamos navegar juntos pelo site!</h2>
          </Offcanvas.Header>
          <ul className="navbar_items">
            <li className="menu_item_nav" onClick={handleClose}>
              <a className="menu_link center" href="home">
                <div className="item_home">
                  <span className="menu_link btn_navbar_home">Home</span>
                </div>
              </a>
            </li>
            <li className="menu_item_nav" onClick={handleClose}>
              <a className="menu_link center" href="goals">
                <div className="item_metas">
                  <span className="menu_link btn_navbar_metas">metas</span>
                </div>
              </a>
            </li>
            <li className="menu_item_nav" onClick={handleClose}>
              <a className="menu_link center" href="store">
                <div className="item_loja">
                  <span className="menu_link btn_navbar_loja">loja</span>
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
