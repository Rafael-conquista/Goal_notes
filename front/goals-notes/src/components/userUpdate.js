import './Style/userStyle.css'
import React, { useState, useEffect } from 'react';
import { FaAngleLeft } from "react-icons/fa6";
import cap_default from '../images/cap_default.jpg';
import { get_user } from '../services/user_requests';
import { update_user } from '../services/user_requests';
import { verify } from '../utils/token_verify';
import { Modal } from 'react-bootstrap';
import Loading from './loading.js';

function UserUpdateComponent() {
    const [showModal, setShowModal] = useState(false);
    const [editar, setEditar] = useState(false);
    const [alteraSenha, setAlteraSenha] = useState(false);
    const [alteraSencivel, setAlteraSencivel] = useState(false);
    const [nickname, setNickname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [nicknameAntigo, setNicknameAntigo] = useState('')
    const [emailAntigo, setEmailAntigo] = useState('')
    const [id, setId] = useState()
    const [message, setMessage] = useState('')
    const [loading, setloading] = useState(false);
    
    const nicknameChange = (e) => {
        setNickname(e.target.value)
    }
    
    const emailChange = (e) => {
        setEmail(e.target.value)
        if (e.target.value == emailAntigo){
            setAlteraSencivel(false)
        }
        else {
            setAlteraSencivel(true)
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
        setAlteraSencivel(true)
    }

    const confirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    const newPasswordChange = (e) => {
        setNewPassword(e.target.value)
    }

    const confirmNewPasswordChange = (e) => {
        setConfirmNewPassword(e.target.value)
    }

    const handleClose = () => {
        setShowModal(false);
    };

    const submitChanges = (e) => {
        if (alteraSencivel && email == emailAntigo && password == '') {
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
        else if (alteraSencivel && email != emailAntigo && password != '' && password == confirmPassword) {
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
        else if (!alteraSencivel) {
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
        else if (email == emailAntigo && nickname == nicknameAntigo && password == confirmPassword) {
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
        else if (newPassword != confirmNewPassword || password != confirmPassword){
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
        setMessage('')
    }

    async function user_update() {
        if (email == emailAntigo && password == '' && !alteraSenha) {
            const user_json = {
                "surname": nickname,
                "sencivel": false
            };
            const response = await update_user(user_json, id);
            setMessage(response.message)
            if(response.message == 'user updated successfully') {
                setEditar(false)
                setNicknameAntigo(nickname);
                setEmailAntigo(email);
                setAlteraSencivel(false);
                setPassword("");
                setConfirmPassword("");
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
                "sencivel": true
            };
            const response = await update_user(user_json, id);
            setMessage(response.message)
            if(response.message == 'user updated successfully') {
                setEditar(false)
                setNicknameAntigo(nickname);
                setEmailAntigo(email);
                setAlteraSencivel(false);
                setPassword("");
                setConfirmPassword("");
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
                "sencivel": true
            };
            const response = await update_user(user_json, id);
            setMessage(response.message)
            if(response.message == 'user updated successfully') {
                setEditar(false)
                setNicknameAntigo(nickname);
                setEmailAntigo(email);
                setAlteraSencivel(false);
                setPassword("");
                setConfirmPassword("");
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

    async function del_update(excluir=false) {
            const user_json = {
                "excluir":true
            };
            const response = await update_user(user_json, id);
            setMessage(response.message)
    }

    async function delete_user() {
        del_update()
    }

    async function verify_token(){
        const token_id = await verify(localStorage.getItem('token'))
        return token_id
    }

    useEffect(() => {
        const first_acess = sessionStorage.getItem('first_acess')
        if (first_acess) {
            window.location.href = '/CapCreate';
        }
        verify_token().then((id) => {
            setId(id)
        });
    }, [])
    
    async function get_surname(id){
        const user = await get_user(id);
        return user
    }

    useEffect(() => {
            get_surname(id).then((user) => {
                if (user) {
                    setNicknameAntigo(user.surname);
                    setEmailAntigo(user.email);
                    setNickname(nicknameAntigo);
                    setEmail(emailAntigo);
                    setloading(false);
                }
                else {
                    setloading(true);
                    get_surname(id);
                }
            });
    }, [nicknameAntigo, id])
    
    return (
        <div className={`component_cap ${editar ? 'border' : 'border_esquerda'}`}>
            {loading && <Loading/>}
            <div className='card text'>
                <h1>Edite seu perfil</h1>
                {!editar &&
                    <div className='infosUser'>
                        <input type='text' placeholder='Digite um apelido' readOnly className='nickname_input' value={nicknameAntigo}/>
                        <input type='text' placeholder='Digite um e-mail' readOnly className='nickname_input' value={emailAntigo}/>
                    </div>
                }
                {editar && !alteraSenha &&
                    <>
                        <div className='infosUser'>
                            <input type='text' required placeholder='Digite um apelido' className='nickname_input_editando' onChange={nicknameChange} value={nickname}/>
                            <input type='email' required placeholder='Digite o seu e-mail' className='nickname_input_editando' onChange={emailChange} value={email}/>
                        </div>
                        {alteraSencivel &&
                            <div className='infosUser'>
                                <input type='password' placeholder='Digite sua senha' className='nickname_input_editando' onChange={passwordChange} value={password}/>
                                <input type='password' placeholder='Confirme sua senha' className='nickname_input_editando' onChange={confirmPasswordChange} value={confirmPassword}/>
                            </div>
                        }
                    </>
                }
                {editar && alteraSenha &&
                <>
                    <div className='infosUser'>
                        <input type='password' placeholder='Digite sua nova senha' className='nickname_input_editando' onChange={newPasswordChange} value={newPassword}/>
                        <input type='password' placeholder='Confirme sua nova senha' className='nickname_input_editando' onChange={confirmNewPasswordChange} value={confirmNewPassword}/>
                    </div>
                    <div className='infosUser'>
                        <input type='password' placeholder='Digite sua senha atual' className='nickname_input_editando' onChange={passwordChange} value={password}/>
                        <input type='password' placeholder='Confirme sua senha atual' className='nickname_input_editando' onChange={confirmPasswordChange} value={confirmPassword}/>
                    </div>
                </>
                }
                <div className='submit_buttons'>
                {!editar && (
                    <>
                        <div className='submit_comment_button' onClick={alterPerfil}>
                            Editar o perfil
                        </div>
                        <div className='alter_password' onClick={alterSenha}>
                            Editar sua senha
                        </div>
                    </>
                )}
                {editar && !alteraSenha && (
                    <>
                        <div className='submit_comment_button' onClick={submitChanges}>
                            Alterar perfil
                        </div>
                        <div className='alter_password' onClick={voltar}>
                            Voltar
                        </div>
                    </>
                )}
                {editar && alteraSenha && (
                    <>
                        <div className='submit_comment_button' onClick={submitChangesPassword}>
                            Alterar senha
                        </div>
                        <div className='alter_password' onClick={voltar}>
                            Voltar
                        </div>
                    </>
                )}
                </div>
                {(message != '' && message != 'user updated successfully') && (
                    <p className='texto_alerta'>{message}</p>
                )}
                {(message != '' && message == 'user updated successfully') && (
                    <p className='texto_sucesso'>Usuário atualizado</p>
                )}

            </div>
          
            <Modal show={showModal} onHide={handleClose} centered size="xl">
                <Modal.Footer className='modal_footer'>
                    <div className='buttons'>
                        <div className='botao' onClick={handleClose}>
                            <span>Não</span>
                        </div>
                        <div className='botao close' onClick={() => {
                            delete_user().then(() =>{
                                localStorage.removeItem('token')
                                window.location.href = `/`;
                            })
                        }}>
                            <span>Sim, por favor...</span>
                        </div>
                    </div>

                </Modal.Footer>
            </Modal>
            
        </div>
    )
}

export default UserUpdateComponent;