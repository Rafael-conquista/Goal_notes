import React from 'react';
import { useState } from 'react'
import { register } from '../services/api_requests'

function RegisterComponent(){
    const [name, setName] = useState()
    const [surname, setSurname] = useState()
    const [password, setPassword] = useState()
    const [confirm, setConfirm] = useState()
    const [message, setMessage] = useState('')

    const nameChange = (e) => {
      setName(e.target.value)
      console.log(e.target.value)
    }
    const surnameChange = (e) => {
      setSurname(e.target.value)
    }
    const passwordChange = (e) => {
      setPassword(e.target.value)
    }
    const confirmChange = (e) => {
      setConfirm(e.target.value)
    }
    async function register_user(event) {
      event.preventDefault();
      if (password !== confirm) {
        setMessage('Sua senha e sua confirmação de senha não coincidem')
        return
      }
      const user_json = {
        "name": name,
        "surname": surname,
        "password": password
      }
      const response = await register(user_json)
      if (response.message === "the user has been created") {
        setMessage("usuário criado com sucesso")
      } else {
        setMessage("Ocorreu um erro durante a criação do usuário")
      }
    }
     
    const capivaraOlhos = (focus) => {
      const olhos = document.getElementById("cap");
      if (focus) {
          olhos.classList.add("fecha");
      } else {
          olhos.classList.remove("fecha");
      }
    };

    document.addEventListener("mousemove", function(e) {
      const eyes = document.querySelectorAll(".eye");
      
      eyes.forEach(eye => {
          const bounds = eye.getBoundingClientRect();
          const x = bounds.left + bounds.width / 2;
          const y = bounds.top + bounds.height / 2;
          const radianAngle = Math.atan2(e.clientY - y, e.clientX - x);
          const angle = radianAngle * (180 / Math.PI);
          const distance = Math.min(Math.hypot(e.clientX - x, e.clientY - y), 12);
          eye.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translate(${distance}px)`;
        });
      });

    return(
    <form className='registroUsuario' onSubmit={register_user}>
        <div>
          <h1 className='textos'>Novo Aqui?</h1>
          <h2 className='textos'>Cadastre-se agora para poder organizar sua rotina e ter uma amiga "capivarinha" para te acompanhar nessa jornada!</h2>
        </div>
        <div className='formRegistroUsuario'>
            <input
              type="text"
              required="required"
              onChange={nameChange}
              id="name"
              placeholder='Informe o E-mail'
            />
            <input className='textos'
              type="text"
              required="required"
              onChange={surnameChange}
              id="surname"
              placeholder='Informe o seu nome de usuário'
            />
        </div>
        <div className='formRegistroUsuario'>
          <input className='textos'
            type="password"
            required="required"
            onChange={passwordChange}
            onFocus={() => capivaraOlhos(true)}
            onBlur={() => capivaraOlhos(false)}
            id="password"
            placeholder='Insira sua senha'
          />
          <input className='textos'
            type="password"
            id="confirm_password"
            required="required"
            onChange={confirmChange}
            onFocus={() => capivaraOlhos(true)}
            onBlur={() => capivaraOlhos(false)}
            placeholder="confirme a sua senha"
          />
        </div>
        <button className='textos botaoLogar' type="submit">Registrar-se</button>
        {
          message ? <div className='alertaRegistro'>{message}</div> : ''
        }
      </form>
    )
}

export default RegisterComponent