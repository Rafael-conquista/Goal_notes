import React from 'react';
import Navbar from '../../components/navbar';
import cap_default from '../../images/cap_default.jpg';
import user_default from '../../images/user.webp';
import '../../components/Style/homeStyle.css';
import '../../components/Style/perfil.css';

const Homepage = () => {
  return (
    <div>
      <Navbar currentPage="perfil" />
      <div className='capScreen homeScreen'>
        <div className="cap_component_perfil">
          <section className='component_cap_main'>
            <div className='component_cap border_direita'>
              <h1>Modifique sua Capivarinha</h1>
              <img src={cap_default} alt='vazio' className="cap_welcome_page" />
              <div className='user_info'>
                <label for='cap_name'>Nome Capivara</label>
                <input readOnly id='cap_name'></input>
              </div>
            </div>
            <div className='component_cap border_esquerda'>
              <h1>Modifique seu perfil</h1>
              <img src={user_default} alt='vazio' className="cap_welcome_page" />
              <div className='user_info_main'>
                <div className='user_info'>
                  <label for='email'>E-mail</label>
                  <input readOnly id='email'></input>
                </div>
                <div className='user_info'>
                  <label for='nome'>Nome</label>
                  <input readOnly id='nome'></input>
                </div>
              </div>
            </div>
          </section>
          <section className='component_amigos_main'>
            <h1>Amizades feitas Recentemente</h1>
            <div className='amigo_main'>
              <div className='amigo'>
                <img src={cap_default} alt='vazio' className="cap_welcome_page" />
                <p>Fulaninho</p>
              </div>
              <div className='amigo'>
                <img src={cap_default} alt='vazio' className="cap_welcome_page" />
                <p>Beltraninho</p>
              </div>
              <div className='amigo'>
                <img src={cap_default} alt='vazio' className="cap_welcome_page" />
                <p>Racunamatata</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
