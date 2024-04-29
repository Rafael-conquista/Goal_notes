import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { TiThMenu } from "react-icons/ti";
import './Style/navbar.css';

function Navbar() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Defina a função moveIndicator aqui
    function moveIndicator(item) {
      let navItems = document.querySelectorAll('.option');
      let offsetLeft = item.offsetLeft;
      let indicator = document.querySelector('.indicator');
      indicator.style.transform = `translateX(${offsetLeft}px)`;
      mudarCor(Array.from(navItems).indexOf(item) + 1);
    }

    function resetIndicator() {
      let navItems = document.querySelectorAll('.option');
      let offsetLeft = navItems[0].offsetLeft; // Alterado para pegar o primeiro item
      let indicator = document.querySelector('.indicator');
      indicator.style.transform = `translateX(${offsetLeft}px)`;
      mudarCor(1)
    }

    function mudarCor(numeroCor) {
      let indicator = document.querySelector('.indicator');
      switch (numeroCor) {
        case 1:
          indicator.style.backgroundColor = '#228B22';
          break;
        case 2:
          indicator.style.backgroundColor = '#87CEEB';
          break;
        case 3:
          indicator.style.backgroundColor = '#8B4513';
          break;
        case 4:
          indicator.style.backgroundColor = '#FFD700';
          break;
        default:
          indicator.style.backgroundColor = '#6A5ACD';
      }
    }

    useEffect(() => {
      let navItems = document.querySelectorAll('.option');
      let header = document.querySelector('.menu'); // Selecionando o header
      let indicator = document.querySelector('.indicator');

      // Adicionando listeners para cada item da lista
      navItems.forEach(item => {
        item.addEventListener('mouseenter', () => moveIndicator(item));
      });

      // Adicionando listener para resetar o indicador quando o mouse sair do menu
      header.addEventListener('mouseleave', resetIndicator);

      // Resetando o indicador inicialmente
      resetIndicator();

      // Limpando os event listeners ao desmontar o componente
      return () => {
        navItems.forEach(item => {
          item.removeEventListener('mouseenter', () => moveIndicator(item));
        });
        header.removeEventListener('mouseleave', resetIndicator);
      };
    }, []);

    return (
        <div>
            <header className="navbar navbar-light shadow navbar_view menu best_buton">
                <h1 style={{ float: 'left', color: 'white', position: 'fixed', left: '10px' }}>Goal notes</h1>
                <img style={{ float: 'left', color: 'white', position: 'fixed', left: '380px', height: '110px' }} className='logoCapivara capivaraOlha' src='/content/capivaraSemOlhos.png' alt="capivaraSemOlhos"></img>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div className="container-fluid indicator"></div>
                    <a className="option" href="resumo.html">
                        <p className="text_menu">Home</p>
                    </a>
                    <a className="option" href="bestiario.html">
                        <p className="text_menu">Metas</p>
                    </a>
                    <a className="option" href="jogarDados.html">
                        <p className="text_menu">Amgios</p>
                    </a>
                    <a className="option">
                        <p className="text_menu">Perfil</p>
                    </a>
                </div>
            </header>
        </div>
    );
}

export default Navbar;
