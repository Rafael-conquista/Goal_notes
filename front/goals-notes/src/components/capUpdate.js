import './Style/userStyle.css'
import React, { useState, useEffect } from 'react';
import { FaAngleLeft } from "react-icons/fa6";
import cap_default from '../images/cap_default.jpg';
import { get_cap } from '../services/cap_requests.js';
import { update_cap } from '../services/cap_requests.js';
import { verify } from '../utils/token_verify.js';
import { Modal } from 'react-bootstrap';
import Loading from './loading.js';

function CapUpdateComponent() {
    const [showModal, setShowModal] = useState(false);
    const [editar, setEditar] = useState(false);
    const [name, setName] = useState('')
    const [nameAntigo, setNameAntigo] = useState('')
    const [id, setId] = useState()
    const [message, setMessage] = useState('')
    const [loading, setloading] = useState(false);
    
    const nameChange = (e) => {
        setName(e.target.value)
    }

    const handleClose = () => {
        setShowModal(false);
    };

    const submitChanges = (e) => {
        if (name){
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
            "name": name
        };
        const response = await update_cap(user_json, id);
        setMessage(response.message)
        if(response.message == 'Cap updated successfully') {
            setNameAntigo(name);
        }
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
    
    async function get_cap_name(id){
        const user = await get_cap(id);
        return user
    }

    useEffect(() => {
            get_cap_name(id).then((user) => {
                if (user) {
                    setNameAntigo(user.name);
                    setName(nameAntigo);
                    setloading(false);
                }
                else {
                    setloading(true);
                    get_cap_name(id);
                }
            });
    }, [nameAntigo, id])
    
    return (
        <div className={`component_cap ${editar ? 'border' : 'border_esquerda'}`}>
            {loading && <Loading/>}
            <div className='card_esq text'>
                <h1>Edite sua capivara</h1>
                <img src={cap_default} alt='vazio' className="cap_welcome_page" />
                {!editar &&
                    <input type='text' placeholder='Digite um apelido' readOnly className='nickname_input' value={nameAntigo}/>
                }
                {editar &&
                    <input type='text' placeholder='Digite um apelido' className='nickname_input_editando' onChange={nameChange} value={name}/>
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
                {(message != '' && message != 'Cap updated successfully') && (
                    <p className='texto_alerta'>{message}</p>
                )}
                {(message != '' && message == 'Cap updated successfully') && (
                    <p className='texto_sucesso'>Nome da Cap atualizado</p>
                )}

            </div>
           
        </div>
    )
}

export default CapUpdateComponent;