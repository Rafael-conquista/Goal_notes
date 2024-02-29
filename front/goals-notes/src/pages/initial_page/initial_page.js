import React, { useState, useEffect } from 'react';
import LoginComponent from '../../components/login.js';
import RegisterComponent from '../../components/register.js';
import Container from 'react-bootstrap/Container';
import '../../components/Style/loginStyle.css';

const Initial = () => {
  const [telaMaiorCelular, setTelaMaiorCelular] = useState(window.innerWidth > 1000);

  useEffect(() => {
    const verificarTamanhoDaTela = () => {
      setTelaMaiorCelular(window.innerWidth > 1000);
    };

    window.addEventListener('resize', verificarTamanhoDaTela);

    return () => {
      window.removeEventListener('resize', verificarTamanhoDaTela);
    };
  }, []);

  return (
    <section className='sectionLoginForm'>
      { telaMaiorCelular &&(
        <>
          <img className='logoCapivara capivaraOlha' src='/content/capivaraSemOlhos.png' alt="capivaraSemOlhos"></img>
          <div id='cap' className="eyes">
            <div className="eye" id="leftEye"></div>
          </div>
        </>
      )}
      <div id='login' className='cardLogin grid'>
          <LoginComponent />
      </div>
      <div id='registro' className='cardRegister grid'>
          <RegisterComponent />
      </div>
    </section>
  );
}

export default Initial;
