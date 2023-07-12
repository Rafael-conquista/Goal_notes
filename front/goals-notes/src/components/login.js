import React from 'react';
import { useState } from 'react'
import { login } from '../services/api_requests'

function LoginComponent(){
    const[surname, setsurname] = useState()
    const[password, setPassword] = useState()
    const[message,setMessage] = useState('')

    const surnameChange = (e) => {
        setsurname(e.target.value)
    }
    const passwordChange = (e) => {
        setPassword(e.target.value)
    }
    async function login_user(event) {
        event.preventDefault();
        const user_json = {
          "surname": surname,
          "password": password
        }
        const response = await login(user_json)
        console.log(response)
        if (response.message === "user is already logged in") {
          setMessage("usuário já se encontra logado")
        } else if(response.message === "login not found: wrong password or surname" || response === false ){
          setMessage("login Incorreto, por favor, verifique sua senha ou seu nickname")
        } else if(response.message === "user logged in successfully"){
            setMessage("logado com sucesso") //adicionar aqui um redirect para a página home
        }else{
            setMessage("erro inexperado")
        }
      }

    return(
        <>
            <form onSubmit={login_user}>
                <div>
                    <h3>Nome:</h3>
                    <input 
                        type="text"
                        required="required"
                        onChange={surnameChange}
                        id="surname"
                        placeholder="informe o seu nome"
                    />
                </div>
                <div>
                    <h3>Password:</h3>
                    <input 
                        type="password"
                        required="required"
                        onChange={passwordChange}
                        id="password"
                        placeholder="informe a sua senha"
                    />
                </div>
                <input type = "submit" value = "entar"/>
                <input type = "submit" value = "entar"/>
                {message ? <h3>{message}</h3> : ''}
            </form>
        </>
    )
}

export default LoginComponent