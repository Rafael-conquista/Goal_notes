import './Style/userStyle.css'
import React, { useState, useEffect } from 'react';
import { update_cap } from '../services/cap_requests.js';
import AmigoFotoComponent from '../components/amigoFoto.js';
import UsuarioFotoComponent from '../components/usuarioFoto.js';

function CapUpdateComponent({ idToken, id, nameAntigo }) {
    const [editar, setEditar] = useState(false);
    const [alterarFotoPerfil, setAlterarFotoPerfil] = useState(false);
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    
    const nameChange = (e) => {
        setName(e.target.value)
    }

    const voltar = (e) => {
        setEditar(false)
        setMessage('')
        if(name == '') {
            setName(nameAntigo)
        }
    }

    const submitChanges = (e) => {
        if (name){
            cap_update()
            setEditar(false)
        }else{
            setMessage('Favor inserir um apelido')
        }
    }

    const alterPerfil = (e) => {
        setEditar(true)
        setMessage('')
        if(name == '') {
            setName(nameAntigo)
        }
    }

    async function cap_update() {
        const user_json = {
            "name": name
        };
        const response = await update_cap(user_json, id);
        setMessage(response.message)
    }

    const alterFoto = (e) => {
        setAlterarFotoPerfil(true)
    }

    const handleCloseFotoPerfil = () => {
        setAlterarFotoPerfil(false);
      };    
    
    return (
        <div className={`component_cap ${editar ? 'border' : 'border_esquerda'}`}>
            <div className='card_esq text'>
                <h1>Edite sua capivara</h1>
                {!editar &&
                    <AmigoFotoComponent id = {id} perfil={true}/>
                }
                {editar &&
                    <a className='consultar_amigo' onClick={alterFoto}>
                        <AmigoFotoComponent id = {id} perfil={true} alterando={true}/>
                    </a>
                }
                {alterarFotoPerfil && <UsuarioFotoComponent idToken={id} onClose={handleCloseFotoPerfil} />}
                { id == idToken &&
                    <>
                        {!editar &&
                            <div className='label_input_user'>
                                <label>Nome da Cap</label>
                                { name != '' &&
                                    <input type='text' placeholder='Digite um apelido' readOnly className='nickname_input' value={name}/>
                                }
                                { name == '' &&
                                    <input type='text' placeholder='Digite um apelido' readOnly className='nickname_input' value={nameAntigo}/>
                                }
                            </div>
                        }
                        {editar &&
                            <div className='label_input_user'>
                                <label>Nome da Cap</label>
                                <input type='text' placeholder='Digite um apelido' className='nickname_input_editando' onChange={nameChange} value={name}/>
                            </div>
                        }
                        <div className='submit_buttons'>
                        {!editar && (
                            <button onClick={alterPerfil} class="Btn_cap">
                                Editar cap
                                <svg viewBox="0 0 512 512" class="svg_button">
                                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                                </svg>
                            </button>
                        )}
                        {editar && (
                            <>
                                <button onClick={submitChanges} class="Btn_cap">
                                    Salvar Cap
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
                { id != idToken &&
                    <div className='label_input_user'>
                        <label>Nome da Cap</label>
                        <input type='text' placeholder='Digite um apelido' readOnly className='nickname_input' value={nameAntigo}/>
                    </div>
                }
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