import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import '../../components/Style/homeStyle.css';
import '../../components/Style/perfil.css';
import UserUpdateComponent from '../../components/userUpdate';
import CapUpdateComponent from '../../components/capUpdate';
import Dashboard from '../../components/Dashboard.js';
import AmigosConsultUltimosComponent from '../../components/amigosConsultUltimos';
import AmigosConsultComponent from '../../components/amigosConsult';
import { get_user } from '../../services/user_requests';
import { get_cap } from '../../services/cap_requests.js';
import { verify } from '../../utils/token_verify';
import { useParams } from 'react-router-dom';

const Homepage = () => {
  const [amigosGeral, setAmigosGeral] = useState(false);
  const [vez, setVez] = useState(false);
  const { id } = useParams();
  const [idToken, setIdToken] = useState();
  const [nicknameAntigo, setNicknameAntigo] = useState();
  const [emailAntigo, setEmailAntigo] = useState();
  const [capName, setCapName] = useState();
  const [selectedScreen, setSelectedScreen] = useState('main');

  const consultarAmigos = () => {
    setAmigosGeral(true);
  };

  const desconsultarAmigos = () => {
    setAmigosGeral(false);
  };

  async function verify_token() {
    const token_id = await verify(localStorage.getItem('token'));
    return token_id;
  }

  useEffect(() => {
    const first_acess = sessionStorage.getItem('first_acess');
    if (first_acess) {
      window.location.href = '/CapCreate';
    }
    verify_token().then((id) => {
      setIdToken(id);
    });
  }, []);

  async function get_surname(id) {
    const user = await get_user(id);
    setNicknameAntigo(user.surname);
    setEmailAntigo(user.email);
  }

  async function get_cap_name(id) {
    const cap = await get_cap(id);
    setCapName(cap.name);
  }

  useEffect(() => {
    if (!vez) {
      get_cap_name(id);
      get_surname(id);
      setVez(true);
    }
  }, [vez, id]);

  return (
    <div>
      <Navbar currentPage="perfil" />
      <div className='capScreen homeScreenStore homeScreenPerfil'>
        {idToken != id && !amigosGeral &&
          <a href={`/${idToken}/perfil`}><button className='botao_amigos'>Voltar para seu perfil</button></a>
        }
        <div className="cap_component_perfil">
          <div className="button-container">
            <button onClick={() => setSelectedScreen('newScreen')} className="perfilButton">visão geral</button>
            <button onClick={() => setSelectedScreen('main')} className="perfilButton">Editar Perfil</button>
          </div>

          {selectedScreen === 'main' && !amigosGeral && (
            <>
              <section className="component_cap_main">
                <CapUpdateComponent
                  idToken={idToken}
                  id={id}
                  nameAntigo={capName}
                />
                <UserUpdateComponent
                  idToken={idToken}
                  id={id}
                  nicknameAntigo={nicknameAntigo}
                  emailAntigo={emailAntigo}
                />
              </section>
              <section className="component_amigos">
                <button onClick={consultarAmigos} className="botao_amigos">Consultar amigos</button>
                <AmigosConsultUltimosComponent
                  idToken={idToken}
                  id={id}
                />
              </section>
            </>
          )}
          {selectedScreen === 'main' && amigosGeral && (
            <>
              <section className="component_amigos">
                <button onClick={desconsultarAmigos} className="botao_amigos">Perfil</button>
                <AmigosConsultComponent
                  idToken={idToken.toString()}
                  id={id.toString()}
                />
              </section>
            </>
          )}

          {selectedScreen === 'newScreen' && (
            <Dashboard id={id}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
