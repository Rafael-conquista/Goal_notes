import React, { useState, useEffect } from 'react';
import './Style/navbar.css';

function Navbar({ currentPage }) {  // Adiciona propriedade currentPage como prop
    const [atual, setAtual] = useState(currentPage); // Inicializa com a página atual


    if (typeof atual === 'string') {
      switch (atual) {
        case 'home':
          setAtual(0);
          break;
        case 'metas':
          setAtual(1);
          break;
        case 'amigos':
          setAtual(2);
          break;
        case 'perfil':
          setAtual(3);
          break;
        default:
          setAtual(0);
      }
    }

    function moveIndicator(item) {
      let navItems = document.querySelectorAll('.option');
      let offsetLeft = item.offsetLeft;
      let indicator = document.querySelector('.indicator');
      indicator.style.transform = `translateX(${offsetLeft}px)`;
      mudarCor(Array.from(navItems).indexOf(item));
    }

    function resetIndicator() {
      let navItems = document.querySelectorAll('.option');
      let indicator = document.querySelector('.indicator');
      let offsetLeft = navItems[atual].offsetLeft;
      indicator.style.transform = `translateX(${offsetLeft}px)`;
      mudarCor(atual);
    }

    function mudarCor(numeroCor) {
      let indicator = document.querySelector('.indicator');
      switch (numeroCor) {
        case 0:
          indicator.style.backgroundColor = '#228B22';
          break;
        case 1:
          indicator.style.backgroundColor = '#87CEEB';
          break;
        case 2:
          indicator.style.backgroundColor = '#8B4513';
          break;
        case 3:
          indicator.style.backgroundColor = '#FFD700';
          break;
        default:
          indicator.style.backgroundColor = '#6A5ACD';
      }
    }

    useEffect(() => {
      const navItems = document.querySelectorAll('.option');
      const header = document.querySelector('.menu');
      navItems.forEach(item => {
        item.addEventListener('mouseenter', () => moveIndicator(item));
      });
      header.addEventListener('mouseleave', resetIndicator);
      resetIndicator();

      return () => {
        navItems.forEach(item => {
          item.removeEventListener('mouseenter', () => moveIndicator(item));
        });
        header.removeEventListener('mouseleave', resetIndicator);
      };
    }, []);

    useEffect(() => {
      setAtual(currentPage);  // Atualiza o estado quando a prop currentPage muda
    }, [currentPage]);

    useEffect(() => {
      resetIndicator();  // Chama o resetIndicator quando 'atual' muda
    }, [atual]);

    return (
        <div>
            <header className="navbar navbar-light shadow navbar_view menu best_buton">
                <h1 style={{ float: 'left', color: 'white', position: 'fixed', left: '10px' }}>Goal notes</h1>
                <img style={{ float: 'left', color: 'white', position: 'fixed', left: '380px', height: '110px' }} className='logoCapivara capivaraOlha' src='/content/capivaraSemOlhos.png' alt="capivaraSemOlhos"></img>
                <div className='navbarGeral' style={{ display: 'flex', height: '100%' }}>
                    <div className="container-fluid indicator"></div>
                    <a className="option" href="home">
                        <p className="text_menu">Home</p>
                    </a>
                    <a className="option" onClick={() => setAtual(1)} href="Goals">
                        <p className="text_menu">Metas</p>
                    </a>
                    <a className="option" onClick={() => setAtual(2)} href="Amigos">
                        <p className="text_menu">Amigos</p>
                    </a>
                    <a className="option" onClick={() => setAtual(3)} href="Perfil">
                        <p className="text_menu">Perfil</p>
                    </a>
                </div>
            </header>
        </div>
    );
}

export default Navbar;
