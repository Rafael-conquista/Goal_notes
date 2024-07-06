import './Style/userStyle.css'
import React, { useState, useEffect } from 'react';
import { update_user } from '../services/user_requests';
import Loading from './loading.js';

function UserUpdateComponent({ idToken, id, nicknameAntigo, emailAntigo }) {
    const [editar, setEditar] = useState(false);
    const [alteraSenha, setAlteraSenha] = useState(false);
    const [alteraSensivel, setalteraSensivel] = useState(false);
    const [nickname, setNickname] = useState(nicknameAntigo);
    const [email, setEmail] = useState(emailAntigo);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setloading] = useState(false);
    
    const nicknameChange = (e) => {
        setNickname(e.target.value)
    }
    
    const emailChange = (e) => {
        setEmail(e.target.value)
        if (e.target.value == emailAntigo){
            setalteraSensivel(false)
        }
        else {
            setalteraSensivel(true)
        }
    }

    const validaEmail = (e) => {
        const emailRegex = /^[a-z0-9+_.-]+@[a-z0-9.-]+$/;
        if (emailRegex && emailRegex.test(email)) {
            user_update()
        } 
        else {
            setloading(false)
            setMessage('Por favor, insira um e-mail válido.');
        }
    }

    const passwordChange = (e) => {
        setPassword(e.target.value)
        setalteraSensivel(true)
    }

    const newPasswordChange = (e) => {
        setNewPassword(e.target.value)
    }

    const confirmNewPasswordChange = (e) => {
        setConfirmNewPassword(e.target.value)
    }

    const submitChanges = (e) => {
        if (alteraSensivel && email == emailAntigo && password == '') {
            if (nickname && email){
                user_update()
                setloading(true)
            }
            else if (!nickname){
                setMessage('Favor inserir um apelido')
            }
            else if (!email){
                setMessage('Favor inserir um e-mail')
            }
        }
        else if (alteraSensivel && email != emailAntigo && password != '') {
            if (nickname && email){
                setloading(true)
                validaEmail()
            }
            else if (!nickname){
                setMessage('Favor inserir um apelido')
            }
            else if (!email){
                setMessage('Favor inserir um e-mail')
            }
        }
        else if (!alteraSensivel) {
            if (nickname && email){
                user_update()
                setloading(true)
            }
            else if (!nickname){
                setMessage('Favor inserir um apelido')
            }
            else if (!email){
                setMessage('Favor inserir um e-mail')
            }
        }
        else if (email == emailAntigo && nickname == nicknameAntigo) {
            setMessage('user updated successfully')
            setEditar(false)
        }
        else {
            setMessage('Para alterar informações sensíveis, favor preencher a senha')
        }
    }

    const submitChangesPassword = (e) => {
        if (newPassword == '' || password == '' ) {
            setMessage('Favor preencher os campos obrigatórios')
        }
        else if (newPassword != confirmNewPassword){
            setMessage('Senhas não conferem')            
        }
        else if (newPassword == password) {
            setMessage('Nova senha não pode ser igual a senha antiga')
        }
        else {
            setMessage('Teste')
            user_update()
            setloading(true)
        }
    }

    const alterPerfil = (e) => {
        setEditar(true)
        setMessage('')
    }

    const alterSenha = (e) => {
        setEditar(true)
        setAlteraSenha(true)
        setMessage('')
    }
    
    const voltar = (e) => {
        setEditar(false)
        setAlteraSenha(false)
        setalteraSensivel(false)
        setNickname(nicknameAntigo)
        setEmail(emailAntigo)
        setPassword('')
        setNewPassword('')
        setConfirmNewPassword('')
        setMessage('')
    }

    async function user_update() {
        if (email == emailAntigo && password == '' && !alteraSenha) {
            const user_json = {
                "surname": nickname,
                "sensivel": false
            };
            const response = await update_user(user_json, id);
            setMessage(response.message)
            if(response.message == 'user updated successfully') {
                setEditar(false)
                setalteraSensivel(false);
                setPassword("");
                setloading(false)
                setNewPassword("")
                setConfirmNewPassword("")
            }
            else {
                setloading(false)
            }
        }
        else if (email != emailAntigo && password != '' && !alteraSenha) {
            const user_json = {
                "email": email,
                "surname": nickname,
                "password": password,
                "sensivel": true
            };
            const response = await update_user(user_json, id);
            setMessage(response.message)
            if(response.message == 'user updated successfully') {
                setEditar(false)
                setalteraSensivel(false);
                setPassword("");
                setloading(false)
                setNewPassword("")
                setConfirmNewPassword("")
            }
            else {
                setloading(false)
            }
        }
        else if (password != '' && alteraSenha) {
            const user_json = {
                "password": password,
                "newPassword": newPassword,
                "sensivel": true
            };
            const response = await update_user(user_json, id);
            setMessage(response.message)
            if(response.message == 'user updated successfully') {
                setEditar(false)
                setalteraSensivel(false);
                setPassword("");
                setloading(false)
                setAlteraSenha(false)
                setNewPassword("")
                setConfirmNewPassword("")
            }
            else {
                setloading(false)
            }
        }
    }
    
    return (
        <div className={`component_cap ${editar ? 'border' : 'border_esquerda'}`}>
            {loading && <Loading/>}
            <div className='card text'>
                { id == idToken &&
                    <>
                        <h1>Edite seu perfil</h1>
                        {!editar &&
                            <div className='infosUser'>
                                <div className='label_input_user'>
                                    <label>Apelido do Usuário</label>
                                    <input type='text' placeholder='Digite um apelido' readOnly className='nickname_input' value={nicknameAntigo}/>
                                </div>
                                <div className='label_input_user'>
                                    <label>e-mail do Usuário</label>
                                    <input type='text' placeholder='Digite um e-mail' readOnly className='nickname_input' value={emailAntigo}/>
                                </div>
                            </div>
                        }
                        {editar && !alteraSenha &&
                            <>
                                <div className='infosUser'>
                                    <div className='label_input_user'>
                                        <label>Apelido do Usuário</label>
                                        <input type='text' required placeholder='Digite um apelido' className='nickname_input_editando' onChange={nicknameChange} value={nickname}/>
                                    </div>
                                    <div className='label_input_user'>
                                        <label>e-mail do Usuário</label>
                                        <input type='email' required placeholder='Digite o seu e-mail' className='nickname_input_editando' onChange={emailChange} value={email}/>
                                    </div>
                                </div>
                                {alteraSensivel &&
                                    <div className='infosUser'>
                                        <div className='label_input_user'>
                                            <label>Digite a senha do usuário</label>
                                            <input type='password' placeholder='Digite sua senha' className='nickname_input_editando' onChange={passwordChange} value={password}/>
                                        </div>
                                    </div>
                                }
                            </>
                        }
                        {editar && alteraSenha &&
                        <>
                            <div className='infosUser'>
                                <div className='label_input_user'>
                                    <label>Digite a nova senha do usuário</label>
                                    <input type='password' placeholder='Digite sua nova senha' className='nickname_input_editando' onChange={newPasswordChange} value={newPassword}/>
                                </div>
                                <div className='label_input_user'>
                                    <label>Confirme a nova senha do usuário</label>
                                    <input type='password' placeholder='Confirme sua nova senha' className='nickname_input_editando' onChange={confirmNewPasswordChange} value={confirmNewPassword}/>
                                </div>
                            </div>
                            <div className='infosUser'>
                                <div className='label_input_user'>
                                    <label>Confirme a nova senha do usuário</label>
                                    <input type='password' placeholder='Digite sua senha atual' className='nickname_input_editando' onChange={passwordChange} value={password}/>
                                </div>
                            </div>
                        </>
                        }
                        <div className='submit_buttons'>
                        {!editar && (
                            <>
                                <button onClick={alterPerfil} class="Btn">
                                    Editar o perfil
                                    <svg viewBox="0 0 512 512" class="svg_button">
                                        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                                    </svg>
                                </button>
                                <button onClick={alterSenha} class="Btn_senha">
                                    Editar senha
                                    <svg viewBox="0 0 512 512" class="svg_button">
                                        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                                    </svg>
                                </button>
                            </>
                        )}
                        {editar && !alteraSenha && (
                            <>
                                <button onClick={submitChanges} class="Btn">
                                    Alterar Perfil
                                    <svg viewBox="0 0 512 512" class="svg_button">
                                        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                                    </svg>
                                </button>
                                <button onClick={voltar} class="Btn_voltar">
                                    Voltar
                                    <svg viewBox="0 0 46 40" className="svg_button" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
                                    </svg>
                                </button>
                            </>
                        )}
                        {editar && alteraSenha && (
                            <>
                                <button onClick={submitChangesPassword} class="Btn">
                                Alterar senha
                                    <svg viewBox="0 0 512 512" class="svg_button">
                                        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                                    </svg>
                                </button>
                                <button onClick={voltar} class="Btn_voltar">
                                    Voltar
                                    <svg viewBox="0 0 46 40" className="svg_button" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
                                    </svg>
                                </button>
                            </>
                        )}
                        </div>
                    </>
                }
                {id != idToken &&
                    <>
                        <h1>perfil do usuário {nicknameAntigo}</h1>
                        <div className='infosUser'>
                            <div className='label_input_user'>
                                <label>Apelido do Usuário</label>
                                <input type='text' placeholder='Digite um apelido' readOnly className='nickname_input' value={nicknameAntigo}/>
                            </div>
                            <div className='label_input_user'>
                                <label>e-mail do Usuário</label>
                                <input type='text' placeholder='Digite um e-mail' readOnly className='nickname_input' value={emailAntigo}/>
                            </div>
                        </div>
                    </>
                }
                {(message != '' && message != 'user updated successfully') && (
                    <p className='texto_alerta'>{message}</p>
                )}
                {(message != '' && message == 'user updated successfully') && (
                    <p className='texto_sucesso'>Usuário atualizado</p>
                )}

            </div>
        </div>
    )
}

export default UserUpdateComponent;