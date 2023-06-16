import React from 'react';
import { useState } from 'react'

const Initial = () =>{
  const[name, setName] = useState()
  const[surname, setSurname] = useState()
  const[password, setPassword] = useState()
  const[confirm, setConfirm] = useState()
  const nameChange = (e) =>{
    setName(e.target.value)
  }
  const surnameChange = (e) =>{
    setSurname(e.target.value)
  }
  const passwordChange = (e) =>{
    setPassword(e.target.value)
  }
  const confirmChange = (e) =>{
    setConfirm(e.target.value)
  }
  console.log('nome: '+name)
  console.log('apelido: '+surname)
  console.log('password: '+password)
  console.log('confirma senha: '+confirm)
  return (
    <form>
      <div>
          <label for="name">Nome: </label>
          <input type="text" onChange={nameChange} id="name" />
      </div>
      <div>
          <label for="surname">apelido: </label>
          <input type="text" onChange={surnameChange} id="surname" />
      </div>
      <div>
          <label for="password">senha: </label>
          <input type="password" onChange={passwordChange} id="password" />
      </div>
      <div>
          <label for="confirm_password">confirme sua senha: </label>
          <input type="password" id="confirm_password" onChange={confirmChange}></input>
      </div>

      <div>
        <button type="submit">registrar-se</button>
      </div>
    </form>
  );
}

export default Initial;