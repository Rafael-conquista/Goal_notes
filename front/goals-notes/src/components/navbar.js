import React, { useState, useEffect } from 'react';
import './Style/navbar.css';
import LogoffButton from './logoffButton';

function Navbar({ currentPage }) {
  const [atual, setAtual] = useState(currentPage);
  const [telaMaiorCelular, setTelaMaiorCelular] = useState(window.innerWidth > 1000);
  const [dropdown, setDropdown] = useState(false);

  // Este useEffect maneja a atualização do estado 'atual' baseado na prop 'currentPage'
  useEffect(() => {
    switch (currentPage) {
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
  }, [currentPage]);

  function moveIndicator(item) {
    const navItems = document.querySelectorAll('.option');
    const offsetLeft = item.offsetLeft;
    const indicator = document.querySelector('.indicator');
    if (indicator) {
      indicator.style.transform = `translateX(${offsetLeft}px)`;
      mudarCor(Array.from(navItems).indexOf(item));
    }
  }

  function resetIndicator() {
    const navItems = document.querySelectorAll('.option');
    const indicator = document.querySelector('.indicator');
    if (navItems[atual] && indicator) {
      const offsetLeft = navItems[atual].offsetLeft;
      indicator.style.transform = `translateX(${offsetLeft}px)`;
      mudarCor(atual);
    }
  }

  function mudarCor(numeroCor) {
    const indicator = document.querySelector('.indicator');
    if (indicator) {
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
  }

  // Consolidado para reduzir duplicação
  useEffect(() => {
    const verificarTamanhoDaTela = () => {
      resetIndicator();
      setTelaMaiorCelular(window.innerWidth > 1000);
    };

    window.addEventListener('resize', verificarTamanhoDaTela);
    resetIndicator(); // Chama ao montar e ao ajustar o tamanho da tela

    const navItems = document.querySelectorAll('.option');
    const header = document.querySelector('.menu');
    navItems.forEach(item => {
      item.addEventListener('mouseenter', () => moveIndicator(item));
    });
    header.addEventListener('mouseleave', resetIndicator);

    return () => {
      window.removeEventListener('resize', verificarTamanhoDaTela);
      navItems.forEach(item => {
        item.removeEventListener('mouseenter', () => moveIndicator(item));
      });
      header.removeEventListener('mouseleave', resetIndicator);
    };
  }, [atual]); // Dependências ajustadas

  function handleCheckboxClick() {
    setDropdown(!dropdown);
  }

  return (
    <div>
      {telaMaiorCelular && (
        <header className="navbar navbar-light shadow navbar_view menu best_buton">
          <h1 style={{ float: 'left', position: 'fixed' }} className='logo_navbar'>Goal notes</h1>
          <div style={{ float: 'left', position: 'fixed', left: '380px', height: '110px' }} className='cap_navbar' alt="capivaraSemOlhos"></div>
          <div className='navbarGeral' style={{ display: 'flex', height: '100%' }}>
            <div className="container-fluid indicator"></div>
            <a className="option" href="home" onClick={() => setAtual(0)}>
              <p className="text_menu">Home</p>
            </a>
            <a className="option" href="Goals" onClick={() => setAtual(1)}>
              <p className="text_menu">Metas</p>
            </a>
            <a className="option" href="Amigos" onClick={() => setAtual(2)}>
              <p className="text_menu">Amigos</p>
            </a>
            <a className="option" href="Perfil" onClick={() => setAtual(3)}>
              <p className="text_menu">Perfil</p>
            </a>
            <LogoffButton/>
          </div>
        </header>
      )}
      {!telaMaiorCelular && (
        <header className="navbar navbar-light shadow navbar_view menu best_buton">
          <input type="checkbox" id="checkbox" onClick={handleCheckboxClick}></input>
          <label htmlFor="checkbox" className="toggle">
            <div className="bars" id="bar1"></div>
            <div className="bars" id="bar2"></div>
            <div className="bars" id="bar3"></div>
          </label>
          {!dropdown && (
            <div className='navbarGeral navbarGeralCelFechar' style={{ position: 'absolute', top: '109px', width: '100%', background: '#131F24', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {atual == 0 &&(
                <a className="option" style={{ color:'#228B22',  height: 'auto' }} href="home" onClick={() => setAtual(0)}>
                  <p className="text_menu">Home</p>
                </a>
              )}
              {atual != 0 &&(
                <a className="option" style={{ height: 'auto' }} href="home" onClick={() => setAtual(0)}>
                  <p className="text_menu">Home</p>
                </a>
              )}
              {atual == 1 &&(
                <a className="option" style={{ color:'#87CEEB',  height: 'auto' }} href="Goals" onClick={() => setAtual(1)}>
                  <p className="text_menu">Metas</p>
                </a>
              )}
              {atual != 1 &&(
                <a className="option" style={{ height: 'auto' }} href="Goals" onClick={() => setAtual(1)}>
                  <p className="text_menu">Metas</p>
                </a>
              )}
              {atual == 2 &&(
                <a className="option" style={{ color:'#8B4513',  height: 'auto' }} href="Amigos" onClick={() => setAtual(2)}>
                  <p className="text_menu">Amigos</p>
                </a>
              )}
              {atual != 2 &&(
                <a className="option" style={{ height: 'auto' }} href="Amigos" onClick={() => setAtual(2)}>
                  <p className="text_menu">Amigos</p>
                </a>
              )}
              {atual == 3 &&(
                <a className="option" style={{ color:'#FFD700', height: 'auto' }} href="Perfil" onClick={() => setAtual(3)}>
                  <p className="text_menu">Perfil</p>
                </a>
              )}
              {atual != 3 &&(
                <a className="option" style={{ height: 'auto' }} href="Perfil" onClick={() => setAtual(3)}>
                  <p className="text_menu">Perfil</p>
                </a>
              )}
            </div>
          )}
          {dropdown && (
            <div className='navbarGeral navbarGeralCelAbrir' style={{ position: 'absolute', top: '109px', width: '100%', background: '#131F24', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {atual == 0 &&(
                <a className="option" style={{ color:'#228B22',  height: 'auto' }} href="home" onClick={() => setAtual(0)}>
                  <p className="text_menu">Home</p>
                </a>
              )}
              {atual != 0 &&(
                <a className="option" style={{ height: 'auto' }} href="home" onClick={() => setAtual(0)}>
                  <p className="text_menu">Home</p>
                </a>
              )}
              {atual == 1 &&(
                <a className="option" style={{ color:'#87CEEB',  height: 'auto' }} href="Goals" onClick={() => setAtual(1)}>
                  <p className="text_menu">Metas</p>
                </a>
              )}
              {atual != 1 &&(
                <a className="option" style={{ height: 'auto' }} href="Goals" onClick={() => setAtual(1)}>
                  <p className="text_menu">Metas</p>
                </a>
              )}
              {atual == 2 &&(
                <a className="option" style={{ color:'#8B4513',  height: 'auto' }} href="Amigos" onClick={() => setAtual(2)}>
                  <p className="text_menu">Amigos</p>
                </a>
              )}
              {atual != 2 &&(
                <a className="option" style={{ height: 'auto' }} href="Amigos" onClick={() => setAtual(2)}>
                  <p className="text_menu">Amigos</p>
                </a>
              )}
              {atual == 3 &&(
                <a className="option" style={{ color:'#FFD700', height: 'auto' }} href="Perfil" onClick={() => setAtual(3)}>
                  <p className="text_menu">Perfil</p>
                </a>
              )}
              {atual != 3 &&(
                <a className="option" style={{ height: 'auto' }} href="Perfil" onClick={() => setAtual(3)}>
                  <p className="text_menu">Perfil</p>
                </a>
              )}
            </div>
            )}
        </header>
      )}
    </div>
  );
}

export default Navbar;
