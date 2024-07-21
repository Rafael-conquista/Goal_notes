import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import '../../components/Style/homeStyle.css';
import '../../components/Style/perfil.css';
import UserUpdateComponent from '../../components/userUpdate';
import CapUpdateComponent from '../../components/capUpdate';
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
  const [nicknameAntigo, setNicknameAntigo] = useState()
  const [emailAntigo, setEmailAntigo] = useState()
  const [capName, setCapName] = useState()


  const consultarAmigos = (e) => {
    setAmigosGeral(true);
  }
  const desconsultarAmigos = (e) => {
    setAmigosGeral(false);
  }

  async function verify_token(){
    const token_id = await verify(localStorage.getItem('token'))
    return token_id
  }
  
  useEffect(() => {
      const first_acess = sessionStorage.getItem('first_acess');
      if (first_acess) {
          window.location.href = '/CapCreate';
      }
      verify_token().then((id) => {
        setIdToken(id);
      });
  });

  async function get_surname(id){
    const user = await get_user(id);
    setNicknameAntigo(user.surname) 
    setEmailAntigo(user.email)
  }

  async function get_cap_name(id){
      const cap = await get_cap(id);
      setCapName(cap.name)
  }

  useEffect(() => {
    if (!vez) {
      get_cap_name(id)
      get_surname(id)
      setVez(true)
    }
  })

  return (
    <div>
      <Navbar currentPage="perfil" />
      <div className='capScreen homeScreen'>
        {idToken != id &&
          <a href={`/${idToken}/perfil`}><button className='botao_amigos'>Voltar para seu perfil</button></a>
        }
        <div className="cap_component_perfil">
          {!amigosGeral &&
          <>
            <section className='component_cap_main'>
              <CapUpdateComponent
                idToken = {idToken}
                id = {id}
                nameAntigo = {capName}
              />
              <UserUpdateComponent
                idToken = {idToken}
                id = {id}
                nicknameAntigo={nicknameAntigo}
                emailAntigo={emailAntigo}
              />
            </section>
            <section className='component_amigos'>
              <button onClick={consultarAmigos} className='botao_amigos'>Consultar amigos</button>
              <AmigosConsultUltimosComponent
                idToken = {idToken}
                id = {id}
              />
            </section>
          </>
          }
          {amigosGeral &&
          <>
            <section className='component_amigos'>
              <button onClick={desconsultarAmigos} className='botao_amigos'>Perfil</button>
              <AmigosConsultComponent
                idToken = {idToken.toString()}
                id = {id.toString()}
              />
              </section>
          </>
          }
        </div>
      </div>
    </div>
  );
}

export default Homepage;
