import React, { useState, useEffect } from 'react';
import { token_storage } from '../utils/token_verify';
import { register } from '../services/api_requests'

function RegisterComponent(){
    const [email, setEmail] = useState()
    const [age, setAge] = useState()
    const [surname, setSurname] = useState()
    const [password, setPassword] = useState()
    const [confirm, setConfirm] = useState()
    const [message, setMessage] = useState('')
    const [loading, setloading] = useState(false);
    const [primeiraVez, setPrimeiraVez] = useState(true);

    const emailChange = (e) => {
      setEmail(e.target.value)
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
    const ageChange = (e) => {
      setAge(e.target.value)
    }
    
    async function register_user(event) {
      setloading(true);
      event.preventDefault();
      if (password !== confirm) {
        setMessage('Sua senha e sua confirmação de senha não coincidem')
        setPrimeiraVez(false);
        setloading(false);
        return
      }
      const user_json = {
        "email": email,
        "name": surname,
        "age": age,
        "surname": surname,
        "password": password
      }
      const response = await register(user_json)
      console.log(response)
      if (response.message === "the user has been created") {
        setMessage("usuário criado com sucesso")
        setPrimeiraVez(false);
        setloading(false);
        token_storage(response.token)
        sessionStorage.setItem('first_acess', true)
        window.location.href = '/capCreate'
      } else {
        setMessage("Ocorreu um erro durante a criação do usuário")
        setPrimeiraVez(false);
        setloading(false);
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

    const primeiraVezAtualizar = (event) => {
      setPrimeiraVez(true);
  }
  
    return(
    <form className='registroUsuario' onSubmit={register_user}>
        {loading && (
          <div className='loading'>
            <div fluid className='loadingRodar'>
            </div>
          </div>
        )}
        <div>
          <h1 className='textos'>Novo Aqui?</h1>
          <h2 className='textos'>Cadastre-se agora para poder organizar sua rotina e ter uma amiga "capivarinha" para te acompanhar nessa jornada!</h2>
        </div>
        <div className='formRegistroUsuario'>
            <input
              type="text"
              required="required"
              onChange={emailChange}
              id="email"
              placeholder='Informe o E-mail'
            />
            {!telaMaiorCelular &&(
              <input className='textos'
              type="text"
              required="required"
              onChange={surnameChange}
              id="surname"
              placeholder='Nome do Usuário'
            />
            )}
            {telaMaiorCelular &&(
              <input className='textos'
                type="text"
                required="required"
                onChange={surnameChange}
                id="surname"
                placeholder='Informe o seu nome de usuário'
              />
            )}
            <input className='textos'
              type="date"
              required="required"
              onChange={ageChange}
              id="age"
              placeholder='data de nascimento'
            />
        </div>
        <div className='formRegistroUsuario'>
          {!telaMaiorCelular &&(
            <>
              <input className='textos'
                type="password"
                required="required"
                onChange={passwordChange}
                id="password"
                placeholder='Insira sua Senha'
              />
              <input className='textos'
                type="password"
                id="confirm_password"
                required="required"
                onChange={confirmChange}
                placeholder="Confirme a Senha"
              />
            </>
          )}
          {telaMaiorCelular &&(
            <>
              <input className='textos'
                type="password"
                required="required"
                onChange={passwordChange}
                onFocus={() => capivaraOlhos(true)}
                onBlur={() => capivaraOlhos(false)}
                id="password"
                placeholder='Insira sua Senha'
              />
              <input className='textos'
                type="password"
                id="confirm_password"
                required="required"
                onChange={confirmChange}
                onFocus={() => capivaraOlhos(true)}
                onBlur={() => capivaraOlhos(false)}
                placeholder="confirme a Senha"
              />
            </>
          )}
        </div>
        {telaMaiorCelular &&(
            <button className='textos botaoLogar' type="submit" value="entar">Entrar</button>
        )}
        {!telaMaiorCelular &&(
            <div className='coletaneaBotoesLogar'>
                <button className='textos botaoLogar' type="submit" value="entar">Registrar-se</button>
                <a className='textos botaoLogar botaoUsuarUsuario' onClick={() => primeiraVezAtualizar(true)} href="#login">Usuar Usuário</a>
            </div>
        )}
        {!primeiraVez && (
          message ? <div className='alertaRegistro'>{message}</div> : ''
        )}
      </form>
    )
}

export default RegisterComponent