import './Style/userStyle.css'
import React, { useState, useEffect } from 'react';
import { FaAngleLeft } from "react-icons/fa6";
import cap_default from '../images/cap_default.jpg';
import { update_user } from '../services/api_requests';

function UserUpdateComponent() {
    const [nickname, setNickname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('Para alterar seu usuário, basta alterar os respectivos campos e nos informar sua senha!')
    const [confirmPassword, setConfirmPassword] = useState('')

    const nicknameChange = (e) => {
        setNickname(e.target.value)
    }

    const emailChange = (e) => {
        setEmail(e.target.value)
    }

    const passwordChange = (e) => {
        setPassword(e.target.value)
    }

    const confirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    const submitChanges = (e) => {
        EraseForm()
        if ((password === confirmPassword) && (nickname||email)){
            user_update()
        }else{
            setMessage('A sua senha e a confirmação da senha estão diferentes')
        }
    }

    function EraseForm() {
        setNickname('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }

    async function user_update() {
        const user_json = {
            "surname": nickname,
            "email": email,
            "password": password,
        };
        const response = await update_user(user_json);
        setMessage(response.message)
        // if (response.message === "user is already logged in") {
        //     setMessage("usuário já se encontra logado");
        //     setPrimeiraVez(false);
        //     setloading(false);
        // } else if (response.message === "login not found: wrong password or email" || response === false) {
        //     setMessage("login Incorreto, por favor, verifique sua senha ou seu nickname");
        //     setPrimeiraVez(false);
        //     setloading(false);
        // } else if (response.message === "user logged in successfully") {
        //     setMessage("logado com sucesso"); //adicionar aqui um redirect para a página home
        //     token_storage(response.token)
        //     setloading(false);
        // } else {
        //     setMessage("erro inexperado");
        //     setPrimeiraVez(false);
        //     setloading(false);
        // }
    }
    return (
        <div className="user_container">
            <div className='return_button'>
                <FaAngleLeft />
            </div>
            <div className='info_input'>
                <img src={cap_default} alt='vazio' className="cap_welcome_page" />
                <input type='text' placeholder='seu apelido' className='nickname_input' onChange={nicknameChange} value={nickname}/>
                <input type='text' placeholder='seu email' className='email_input' onChange={emailChange} value={email}/>
                <input type="password" placeholder='password' required="required" className='password_input' onChange={passwordChange} value={password}/>
                <input type="password" placeholder='confirm password' required="required" className='password_input' onChange={confirmPasswordChange} value={confirmPassword}/>
            </div>
            <div className='submit_buttons'>
                <div className='delete_button'>
                    Excluir Perfil
                </div>
                <div className='submit_comment_button' onClick={submitChanges}>
                    Alterar
                </div>
            </div>
            <p>{message}</p>
        </div>
    )
}

export default UserUpdateComponent