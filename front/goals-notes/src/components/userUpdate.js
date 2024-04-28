import './Style/userStyle.css'
import React, { useState, useEffect } from 'react';
import { FaAngleLeft } from "react-icons/fa6";
import cap_default from '../images/cap_default.jpg';
import { update_user } from '../services/user_requests';
import { verify } from '../utils/token_verify';
import { Modal } from 'react-bootstrap';
import { IoMdClose } from "react-icons/io";

function UserUpdateComponent() {
    const [showModal, setShowModal] = useState(false);
    const [excluir, setExcluir] = useState(false);
    const [nickname, setNickname] = useState()
    const [id, setId] = useState()
    const [password, setPassword] = useState()
    const [message, setMessage] = useState('Para alterar seu usuário, basta alterar os respectivos campos e nos informar sua senha!')
    const [confirmPassword, setConfirmPassword] = useState()

    const nicknameChange = (e) => {
        setNickname(e.target.value)
    }

    const passwordChange = (e) => {
        setPassword(e.target.value)
    }

    const confirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleModal = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const submitChanges = (e) => {
        EraseForm()
        if ((password === confirmPassword) && (nickname)){
            user_update()
        }else{
            setMessage('A sua senha e a confirmação da senha estão diferentes')
        }
    }

    function EraseForm() {
        setNickname('')
        setPassword('')
        setConfirmPassword('')
    }

    async function user_update() {
        const user_json = {
            "surname": nickname,
            "password": password,
            "excluir": excluir
        };
        const response = await update_user(user_json, id);
        setMessage(response.message)
    }

    async function delete_user() {
        setExcluir(true)
        user_update()
        localStorage.removeItem('token')
        window.location.href = `/`;
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

    return (
        <div className="user_container">
            <div className='return_button'>
                <FaAngleLeft />
            </div>
            <div className='info_input'>
                <img src={cap_default} alt='vazio' className="cap_welcome_page" />
                <input type='text' placeholder='seu apelido' className='nickname_input' onChange={nicknameChange} value={nickname}/>
                <input type="password" placeholder='password' required="required" className='password_input' onChange={passwordChange} value={password}/>
                <input type="password" placeholder='confirm password' required="required" className='password_input' onChange={confirmPasswordChange} value={confirmPassword}/>
            </div>
            <div className='submit_buttons'>
                <div className='delete_button' onClick={handleModal}>
                    Excluir Perfil
                </div>
                <div className='submit_comment_button' onClick={submitChanges}>
                    Alterar
                </div>
            </div>
            <p>{message}</p>
            
            <Modal show={showModal} onHide={handleClose} centered size="xl">
                <Modal.Header>
                    <div className='form_grid'>
                        Você tem certeza de que deseja excluir seu perfil?
                    </div>
                </Modal.Header>
                <Modal.Footer className='modal_footer'>
                    <div className='buttons'>
                        <div className='botao' onClick={handleClose}>
                            <span>Não</span>
                        </div>
                        <div className='botao close' onClick={() => {
                            delete_user()
                        }}>
                            <span>Sim, por favor...</span>
                        </div>
                    </div>

                </Modal.Footer>
            </Modal>
            
        </div>
    )
}

export default UserUpdateComponent