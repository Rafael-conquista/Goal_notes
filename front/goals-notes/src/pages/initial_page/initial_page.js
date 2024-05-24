import React, { useState, useEffect } from 'react';
import LoginComponent from '../../components/login.js';
import RegisterComponent from '../../components/register.js';
import { token_verify } from '../../services/api_requests.js';
import '../../components/Style/loginStyle.css';
import { remove_token } from '../../utils/token_verify.js';

const Initial = () => {
  const [telaMaiorCelular, setTelaMaiorCelular] = useState(window.innerWidth > 1500);

  async function verify(token) {
    try {
      const response = await token_verify(token)
      const id = response.id
      if (sessionStorage.getItem("first_acess")){
        window.location.href = `/CapCreate`;
      } else if (id) {
        window.location.href = `${id}/goals`;
      } else {
        console.log('é necessário realizar o login');
        remove_token();
      }
    } catch {
      console.log('validation error');
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verify(token);
    }
  }, []);

  useEffect(() => {
    const verificarTamanhoDaTela = () => {
      setTelaMaiorCelular(window.innerWidth > 1500);
    };

    window.addEventListener('resize', verificarTamanhoDaTela);

    return () => {
      window.removeEventListener('resize', verificarTamanhoDaTela);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <section className='sectionLoginForm'>
      {telaMaiorCelular && (
        <>
          <img className='logoCapivara capivaraOlha' src='/content/capivaraSemOlhos.png' alt="capivaraSemOlhos" />
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
