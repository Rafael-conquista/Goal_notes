import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import cap_default from '../../images/cap_default.jpg';
import user_default from '../../images/user.webp';
import '../../components/Style/homeStyle.css';
import '../../components/Style/perfil.css';
import UserUpdateComponent from '../../components/userUpdate';
import CapUpdateComponent from '../../components/capUpdate';
import AmigosConsultUltimosComponent from '../../components/amigosConsultUltimos';
import AmigosConsultComponent from '../../components/amigosConsult';

const Homepage = () => {
  const [amigosGeral, setAmigosGeral] = useState(false);

  const consultarAmigos = (e) => {
    setAmigosGeral(true);
  }
  const desconsultarAmigos = (e) => {
    setAmigosGeral(false);
  }

  return (
    <div>
      <Navbar currentPage="perfil" />
      <div className='capScreen homeScreen'>
        <div className="cap_component_perfil">
          {!amigosGeral &&
          <>
            <section className='component_cap_main'>
              <CapUpdateComponent/>
              <UserUpdateComponent/>
            </section>
            <section className='component_amigos'>
              <button onClick={consultarAmigos} className='botao_amigos'>Consultar amigos</button>
              <AmigosConsultUltimosComponent/>
            </section>
          </>
          }
          {amigosGeral &&
          <>
            <section className='component_amigos'>
              <button onClick={desconsultarAmigos} className='botao_amigos'>Perfil</button>
              <AmigosConsultComponent/>
              </section>
          </>
          }
        </div>
      </div>
    </div>
  );
}

export default Homepage;
