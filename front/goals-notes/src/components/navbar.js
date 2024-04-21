import React from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { TiThMenu } from "react-icons/ti";
import { useState } from 'react';
import './Style/navbar.css'

function Navbar() {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <nav className="navbar navbar-light shadow navbar_view">
                <div className="container-fluid">
                    <h1 className="menu_title" href="#">Goal notes</h1>
                    <TiThMenu className='burguer_menu' onClick={handleShow} />
                </div>
                <Offcanvas show={show} placement='end' onHide={handleClose} className="offcanvas">
                    <TiThMenu className='burguer_menu' onClick={handleClose} />
                    <Offcanvas.Header>
                        <div>
                            <h2 className='menu_title'>Bem-vindo!</h2>
                        </div>
                    </Offcanvas.Header>
                    <ul>
                        <li className="menu_item_nav" onClick={handleClose}><a href="#" className="menu_link">Teste</a></li>
                        <li className="menu_item_nav" onClick={handleClose}><a href="#about" className="menu_link">Teste</a></li>
                        <li className="menu_item_nav" onClick={handleClose}><a href="#skills" className="menu_link">Teste</a></li>
                    </ul>
                </Offcanvas>
            </nav>
        </div>
    );
}

export default Navbar;