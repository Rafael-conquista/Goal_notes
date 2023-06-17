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
    
    return(
    <form onSubmit={register_user}>
        <div>
          <h3>Nome: </h3>
          <input
            type="text"
            required="required"
            onChange={nameChange}
            id="name"
            placeholder='Informe o seu nome'
          />
        </div>
        <div>
          <h3>apelido: </h3>
          <input
            type="text"
            required="required"
            onChange={surnameChange}
            id="surname"
            placeholder='Informe o seu apelido'
          />
        </div>
        <div>
          <h3>senha: </h3>
          <input
            type="password"
            required="required"
            onChange={passwordChange}
            id="password"
            placeholder='Insira sua senha'
          />
        </div>
        <div>
          <h3>confirme sua senha: </h3>
          <input
            type="password"
            id="confirm_password"
            required="required"
            onChange={confirmChange}
            placeholder="confirme a sua senha"
          />
        </div>
  
        <div>
          <button type="submit">registrar-se</button>
        </div>
        {
          message ? <h3>{message}</h3> : ''
        }
      </form>
    )
}

export default RegisterComponent