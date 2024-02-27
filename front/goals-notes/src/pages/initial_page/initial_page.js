import React from 'react';
import LoginComponent from '../../components/login.js';
import RegisterComponent from '../../components/register.js';
import Container from 'react-bootstrap/Container';
import '../../components/Style/loginStyle.css'

const Initial = () => {
  return (
    <section className='sectionLoginForm'>
      <img className='logoCapivara capivaraOlha' src='/content/capivaraSemOlhos.png' alt="capivaraSemOlhos" />
      <div id='cap' className="eyes">
          <div className="eye" id="leftEye"></div>
      </div>
      <div className='cardLogin grid'>
          <LoginComponent />
      </div>
      <div className='cardRegister grid'>
          <RegisterComponent />
      </div>
    </section>
  );
}

export default Initial;