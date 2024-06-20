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
    const [nickname, setNickname] = useState('')
    const [nicknameAntigo, setNicknameAntigo] = useState('')
    const [id, setId] = useState()
    const [message, setMessage] = useState('')
    const [loading, setloading] = useState(false);
    
    const nicknameChange = (e) => {
        setNickname(e.target.value)
    }

    const handleClose = () => {
        setShowModal(false);
    };

    const submitChanges = (e) => {
        if (nickname){
            user_update()
            setEditar(false)
        }else{
            setMessage('Favor inserir um apelido')
        }
    }

    const alterPerfil = (e) => {
        setEditar(true)
        setMessage('')
    }

    async function user_update() {
        const user_json = {
            "surname": nickname
        };
        const response = await update_user(user_json, id);
        setMessage(response.message)
        if(response.message == 'user updated successfully') {
            setNicknameAntigo(nickname);
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
                    setNickname(nicknameAntigo);
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
                <img src={cap_default} alt='vazio' className="cap_welcome_page" />
                {!editar &&
                    <input type='text' placeholder='Digite um apelido' readOnly className='nickname_input' value={nicknameAntigo}/>
                }
                {editar &&
                    <input type='text' placeholder='Digite um apelido' className='nickname_input_editando' onChange={nicknameChange} value={nickname}/>
                }
                <div className='submit_buttons'>
                {!editar && (
                    <div className='submit_comment_button' onClick={alterPerfil}>
                        Editar o perfil
                    </div>
                )}
                {editar && (
                    <div className='submit_comment_button' onClick={submitChanges}>
                        Alterar apelido
                    </div>
                )}
                </div>
                {(message != '' && message != 'user updated successfully') && (
                    <p className='texto_alerta'>{message}</p>
                )}
                {(message != '' && message == 'user updated successfully') && (
                    <p className='texto_sucesso'>Apelido atualizado</p>
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