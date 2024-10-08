import './Style/userStyle.css';
import React, { useState, useEffect } from 'react';
import cap_default from '../images/cap_default.jpeg';
import Loading from './loading.js';
import { getAmigosUser } from '../services/amigos_requests.js';
import { makeFriend } from '../services/amigos_requests.js';
import { getAmigosUserPendente } from '../services/amigos_requests.js';
import { aceitar_amizade } from '../services/amigos_requests.js';
import { negar_amizade } from '../services/amigos_requests.js';
import { desfazer_amizade } from '../services/amigos_requests.js';
import { searchFriend } from '../services/user_requests.js';
import Conquista from './Conquista';
import AmigoFotoComponent from '../components/amigoFoto.js';
import { get_user_conquistas } from "../services/user_requests";

function AmigosConsultComponent({ idToken, id }) {
    const [message, setMessage] = useState('');
    const [friendSearchApelido, setfriendSearchApelido] = useState('');
    const [friendSearchId, setfriendSearchId] = useState('');
    const [consultarRecebidoPendente, setConsultarRecebidoPendente] = useState(false);
    const [consultarEnviadoPendente, setConsultarEnviadoPendente] = useState(false);
    const [loading, setLoading] = useState(true);
    const [friends, setFriends] = useState([]);
    const [friendsPendente, setFriendsPendente] = useState([]);
    const [friendsConsult, setFriendsConsult] = useState([]);
    const [activeSection, setActiveSection] = useState('amigos');
    const [enumConquista, setEnumConquista] = useState('');
    const [nomeConquista, setNomeConquista] = useState('');

    const friendSearchApelidoChange = (e) => {
        setfriendSearchApelido(e.target.value);
    };

    const friendSearchIdChange = (e) => {
        setfriendSearchId(e.target.value);
    };

    async function aceitarAmizade(idAmizade) {
        await aceitar_amizade(idAmizade.toString());
        const atualizaConquista = JSON.parse(sessionStorage.getItem('conquistas_userAmigo'));
        if (atualizaConquista && atualizaConquista.progresso !== undefined) {  
            if ((atualizaConquista.progresso + 1) < atualizaConquista.Meta) {
                console.log(atualizaConquista.progresso)
                console.log(atualizaConquista.Meta)
                setEnumConquista('')
                setNomeConquista('')
                atualizaConquista.progresso++
                sessionStorage.setItem('conquistas_userAmigo', JSON.stringify(atualizaConquista));
            }
            else if ((atualizaConquista.progresso + 1) == atualizaConquista.Meta){
                console.log(atualizaConquista.progresso)
                console.log(atualizaConquista.Meta)
                setEnumConquista(atualizaConquista.enum_image)
                setNomeConquista(atualizaConquista.nome_conquista)
                sessionStorage.removeItem('conquistas_userAmigo');
            }
        }
        loadFriends();
    }
    
    useEffect(() => {
      if (!sessionStorage.getItem('conquistas_userAmigo')) {
        get_user_conquistas(id).then((conquistas) => {
            const conquistasFiltradas = conquistas.conquistas.filter(conquista => conquista.data_finalizada === null);
            console.log(conquistasFiltradas)
            if (conquistasFiltradas.length > 0) {
              for (let i = 0; i < conquistasFiltradas.length; i++) {
                  const element = conquistasFiltradas[i];
                  sessionStorage.setItem('conquistas_user' + element.tipo_descrisao, JSON.stringify({ progresso: element.progresso, Meta: element.finalizacao, Type: element.tipo_descrisao, id_conquista: element.id_conquista, enum_image: element.enum_image, nome_conquista: element.nome_conquista }));
              }
            }else {
              sessionStorage.setItem('conquistas_userAmigo', JSON.stringify({ progresso: 0, Meta: 1, Type: 'Amigo', id_conquista: 2, enum_image: 2, nome_conquista: "Faça um amigo" }));
            }
        });
    }});

    async function negarAmizade(idAmizade) {
        await negar_amizade(idAmizade.toString());
        loadFriends();
    }

    async function desfazerAmizade(idAmizade) {
        await desfazer_amizade(idAmizade.toString());
        loadFriends();
    }

    async function loadFriends() {
        setLoading(true);
        try {
            const amigos = await getAmigosUser(id, false);
            setFriends(amigos || []);
            const amigosPendente = await getAmigosUserPendente(id);
            setFriendsPendente(amigosPendente || []);
        } catch {
            setFriends([]);
            setFriendsPendente([]);
        }
        setLoading(false);
    }

    useEffect(() => {
        loadFriends();
    }, [id]);

    async function requestSearchFriend() {
        if (friendSearchApelido || friendSearchId) {
            setLoading(true);
            try {
                const amigos = await searchFriend(friendSearchApelido, friendSearchId, id.toString());
                setFriendsConsult(amigos.users || []);
            } catch {
                setFriendsConsult([]);
            }
            setLoading(false);
        } else {
            setMessage("Favor inserir o apelido ou o ID do usuário para consulta");
        }
    }

    async function consultaEnviadas() {
        if (consultarEnviadoPendente){
            setConsultarEnviadoPendente(false)
        }
        else if (!consultarEnviadoPendente){
            setConsultarEnviadoPendente(true)
        }
    }

    async function consultaRecebidas() {
        if (consultarRecebidoPendente){
            setConsultarRecebidoPendente(false)
        }
        else if (!consultarRecebidoPendente){
            setConsultarRecebidoPendente(true)
        }
    }

    async function requestFriend(idAmigo) {
        setLoading(true);
        const response = await makeFriend(id.toString(), idAmigo.toString());
        setMessage(response.message);
        if (response.message === 'Solicitação enviada') {
            await loadFriends();
            setFriendsConsult([]);
            setfriendSearchApelido('');
            setfriendSearchId('');
        }
        setLoading(false);
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <section className='component_amigos_main'>
            {enumConquista != '' && nomeConquista != '' &&
                <Conquista 
                idImage={enumConquista}
                name={nomeConquista}/>
            }
            <div className='amigo_main_geral'>
                <div className="nav_buttons">
                    <button onClick={() => setActiveSection('amigos')} className={`nav_button ${activeSection === 'amigos' ? 'active' : ''}`}>Amigos</button>
                    <button onClick={() => setActiveSection('solicitacoes')} className={`nav_button ${activeSection === 'solicitacoes' ? 'active' : ''}`}>Solicitações</button>
                    <button onClick={() => setActiveSection('pesquisa')} className={`nav_button ${activeSection === 'pesquisa' ? 'active' : ''}`}>Pesquisa</button>
                </div>

                {activeSection === 'amigos' && (
                    <div className='amizades_geral amizades'>
                        <h1 className='texto_tema'>Todas as amizades</h1>
                        <div className='amizades_amigos'>
                            {friends.length > 0 ? friends.map((friend) => (
                                <div key={friend.id} className='amigo'>
                                    <AmigoFotoComponent id = {friend.userId}/>
                                    <p>{friend.name} #{friend.userId}</p>
                                    { id == idToken &&
                                        <button type="button" onClick={() => desfazerAmizade(friend.id)} class="button_perfil_negar">
                                            <span class="button__text">Remover</span>
                                            <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" height="25" width="25">
                                                <path fill="#FFFFFF" d="M8.78842 5.03866C8.86656 4.96052 8.97254 4.91663 9.08305 4.91663H11.4164C11.5269 4.91663 11.6329 4.96052 11.711 5.03866C11.7892 5.11681 11.833 5.22279 11.833 5.33329V5.74939H8.66638V5.33329C8.66638 5.22279 8.71028 5.11681 8.78842 5.03866ZM7.16638 5.74939V5.33329C7.16638 4.82496 7.36832 4.33745 7.72776 3.978C8.08721 3.61856 8.57472 3.41663 9.08305 3.41663H11.4164C11.9247 3.41663 12.4122 3.61856 12.7717 3.978C13.1311 4.33745 13.333 4.82496 13.333 5.33329V5.74939H15.5C15.9142 5.74939 16.25 6.08518 16.25 6.49939C16.25 6.9136 15.9142 7.24939 15.5 7.24939H15.0105L14.2492 14.7095C14.2382 15.2023 14.0377 15.6726 13.6883 16.0219C13.3289 16.3814 12.8414 16.5833 12.333 16.5833H8.16638C7.65805 16.5833 7.17054 16.3814 6.81109 16.0219C6.46176 15.6726 6.2612 15.2023 6.25019 14.7095L5.48896 7.24939H5C4.58579 7.24939 4.25 6.9136 4.25 6.49939C4.25 6.08518 4.58579 5.74939 5 5.74939H6.16667H7.16638ZM7.91638 7.24996H12.583H13.5026L12.7536 14.5905C12.751 14.6158 12.7497 14.6412 12.7497 14.6666C12.7497 14.7771 12.7058 14.8831 12.6277 14.9613C12.5495 15.0394 12.4436 15.0833 12.333 15.0833H8.16638C8.05588 15.0833 7.94989 15.0394 7.87175 14.9613C7.79361 14.8831 7.74972 14.7771 7.74972 14.6666C7.74972 14.6412 7.74842 14.6158 7.74584 14.5905L6.99681 7.24996H7.91638Z" clip-rule="evenodd" fill-rule="evenodd"></path>
                                                </svg>
                                            </span>
                                        </button>
                                    }
                                </div>
                            )) : <p>Você ainda não fez nenhuma amizade.</p>}
                        </div>
                    </div>
                )}

                {activeSection === 'solicitacoes' && (
                        <div className='amizades_pendente amizades'>
                        <h1 className='texto_tema'>Solicitações de amizade</h1>
                        <div className="toggle-button-cover">
                            <div className='label_input'>
                                <label>Consultar solicitações enviadas</label>
                                <div id="button-3" class="button button_amigos r">
                                    <input onClick={() => consultaEnviadas()} class="checkbox" type="checkbox"></input>
                                    <div class="knobs"></div>
                                </div>
                            </div>
                            <div className='label_input'>
                                <label>Consultar solicitações recebidas</label>
                                <div id="button-3" class="button button_amigos r">
                                    <input onClick={() => consultaRecebidas()} class="checkbox" type="checkbox"></input>
                                    <div class="knobs"></div>
                                </div>
                            </div>
                        </div>
                        <div className='amizades_amigos'>
                            {friendsPendente.length > 0 ? friendsPendente.map((friendPendente) => (
                                <>
                                    {((!consultarRecebidoPendente && !consultarEnviadoPendente)) &&
                                        <div key={friendPendente.id} className='amigo'>
                                            <AmigoFotoComponent id = {friendPendente.userId}/>
                                            <p>{friendPendente.name} #{friendPendente.userId}</p>
                                            {friendPendente.id_usuario_enviado != id && id == idToken &&
                                                <div className='botoes_amigos'>
                                                    <button type="button" onClick={() => aceitarAmizade(friendPendente.id)} class="button_perfil">
                                                      <span class="button__text">Aceitar</span>
                                                      <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                                                    </button>
                                                    <button type="button" onClick={() => negarAmizade(friendPendente.id)} class="button_perfil_negar">
                                                        <span class="button__text">Negar</span>
                                                        <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" height="25" width="25">
                                                            <path fill="#FFFFFF" d="M8.78842 5.03866C8.86656 4.96052 8.97254 4.91663 9.08305 4.91663H11.4164C11.5269 4.91663 11.6329 4.96052 11.711 5.03866C11.7892 5.11681 11.833 5.22279 11.833 5.33329V5.74939H8.66638V5.33329C8.66638 5.22279 8.71028 5.11681 8.78842 5.03866ZM7.16638 5.74939V5.33329C7.16638 4.82496 7.36832 4.33745 7.72776 3.978C8.08721 3.61856 8.57472 3.41663 9.08305 3.41663H11.4164C11.9247 3.41663 12.4122 3.61856 12.7717 3.978C13.1311 4.33745 13.333 4.82496 13.333 5.33329V5.74939H15.5C15.9142 5.74939 16.25 6.08518 16.25 6.49939C16.25 6.9136 15.9142 7.24939 15.5 7.24939H15.0105L14.2492 14.7095C14.2382 15.2023 14.0377 15.6726 13.6883 16.0219C13.3289 16.3814 12.8414 16.5833 12.333 16.5833H8.16638C7.65805 16.5833 7.17054 16.3814 6.81109 16.0219C6.46176 15.6726 6.2612 15.2023 6.25019 14.7095L5.48896 7.24939H5C4.58579 7.24939 4.25 6.9136 4.25 6.49939C4.25 6.08518 4.58579 5.74939 5 5.74939H6.16667H7.16638ZM7.91638 7.24996H12.583H13.5026L12.7536 14.5905C12.751 14.6158 12.7497 14.6412 12.7497 14.6666C12.7497 14.7771 12.7058 14.8831 12.6277 14.9613C12.5495 15.0394 12.4436 15.0833 12.333 15.0833H8.16638C8.05588 15.0833 7.94989 15.0394 7.87175 14.9613C7.79361 14.8831 7.74972 14.7771 7.74972 14.6666C7.74972 14.6412 7.74842 14.6158 7.74584 14.5905L6.99681 7.24996H7.91638Z" clip-rule="evenodd" fill-rule="evenodd"></path>
                                                            </svg>
                                                        </span>
                                                    </button>
                                                </div>
                                            }
                                            {friendPendente.id_usuario_enviado == id && id == idToken &&
                                                <div className='botoes_amigos'>
                                                    <button type="button" onClick={() => negarAmizade(friendPendente.id)} class="button_perfil_negar">
                                                        <span class="button__text">Cancelar</span>
                                                        <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" height="25" width="25">
                                                            <path fill="#FFFFFF" d="M8.78842 5.03866C8.86656 4.96052 8.97254 4.91663 9.08305 4.91663H11.4164C11.5269 4.91663 11.6329 4.96052 11.711 5.03866C11.7892 5.11681 11.833 5.22279 11.833 5.33329V5.74939H8.66638V5.33329C8.66638 5.22279 8.71028 5.11681 8.78842 5.03866ZM7.16638 5.74939V5.33329C7.16638 4.82496 7.36832 4.33745 7.72776 3.978C8.08721 3.61856 8.57472 3.41663 9.08305 3.41663H11.4164C11.9247 3.41663 12.4122 3.61856 12.7717 3.978C13.1311 4.33745 13.333 4.82496 13.333 5.33329V5.74939H15.5C15.9142 5.74939 16.25 6.08518 16.25 6.49939C16.25 6.9136 15.9142 7.24939 15.5 7.24939H15.0105L14.2492 14.7095C14.2382 15.2023 14.0377 15.6726 13.6883 16.0219C13.3289 16.3814 12.8414 16.5833 12.333 16.5833H8.16638C7.65805 16.5833 7.17054 16.3814 6.81109 16.0219C6.46176 15.6726 6.2612 15.2023 6.25019 14.7095L5.48896 7.24939H5C4.58579 7.24939 4.25 6.9136 4.25 6.49939C4.25 6.08518 4.58579 5.74939 5 5.74939H6.16667H7.16638ZM7.91638 7.24996H12.583H13.5026L12.7536 14.5905C12.751 14.6158 12.7497 14.6412 12.7497 14.6666C12.7497 14.7771 12.7058 14.8831 12.6277 14.9613C12.5495 15.0394 12.4436 15.0833 12.333 15.0833H8.16638C8.05588 15.0833 7.94989 15.0394 7.87175 14.9613C7.79361 14.8831 7.74972 14.7771 7.74972 14.6666C7.74972 14.6412 7.74842 14.6158 7.74584 14.5905L6.99681 7.24996H7.91638Z" clip-rule="evenodd" fill-rule="evenodd"></path>
                                                            </svg>
                                                        </span>
                                                    </button>
                                                </div>
                                            }
                                        </div>
                                    }
                                    {consultarRecebidoPendente && !consultarEnviadoPendente && friendPendente.id_usuario_enviado == id && id == idToken &&
                                        <div key={friendPendente.id} className='amigo'>
                                            <AmigoFotoComponent id = {friendPendente.userId}/>
                                            <p>{friendPendente.name} #{friendPendente.userId}</p>
                                            <div className='botoes_amigos'>
                                                <button type="button" onClick={() => negarAmizade(friendPendente.id)} class="button_perfil_negar">
                                                    <span class="button__text">Cancelar</span>
                                                    <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" height="25" width="25">
                                                        <path fill="#FFFFFF" d="M8.78842 5.03866C8.86656 4.96052 8.97254 4.91663 9.08305 4.91663H11.4164C11.5269 4.91663 11.6329 4.96052 11.711 5.03866C11.7892 5.11681 11.833 5.22279 11.833 5.33329V5.74939H8.66638V5.33329C8.66638 5.22279 8.71028 5.11681 8.78842 5.03866ZM7.16638 5.74939V5.33329C7.16638 4.82496 7.36832 4.33745 7.72776 3.978C8.08721 3.61856 8.57472 3.41663 9.08305 3.41663H11.4164C11.9247 3.41663 12.4122 3.61856 12.7717 3.978C13.1311 4.33745 13.333 4.82496 13.333 5.33329V5.74939H15.5C15.9142 5.74939 16.25 6.08518 16.25 6.49939C16.25 6.9136 15.9142 7.24939 15.5 7.24939H15.0105L14.2492 14.7095C14.2382 15.2023 14.0377 15.6726 13.6883 16.0219C13.3289 16.3814 12.8414 16.5833 12.333 16.5833H8.16638C7.65805 16.5833 7.17054 16.3814 6.81109 16.0219C6.46176 15.6726 6.2612 15.2023 6.25019 14.7095L5.48896 7.24939H5C4.58579 7.24939 4.25 6.9136 4.25 6.49939C4.25 6.08518 4.58579 5.74939 5 5.74939H6.16667H7.16638ZM7.91638 7.24996H12.583H13.5026L12.7536 14.5905C12.751 14.6158 12.7497 14.6412 12.7497 14.6666C12.7497 14.7771 12.7058 14.8831 12.6277 14.9613C12.5495 15.0394 12.4436 15.0833 12.333 15.0833H8.16638C8.05588 15.0833 7.94989 15.0394 7.87175 14.9613C7.79361 14.8831 7.74972 14.7771 7.74972 14.6666C7.74972 14.6412 7.74842 14.6158 7.74584 14.5905L6.99681 7.24996H7.91638Z" clip-rule="evenodd" fill-rule="evenodd"></path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    }
                                    {!consultarRecebidoPendente && consultarEnviadoPendente && friendPendente.id_usuario_enviado != id && id == idToken &&
                                        <div key={friendPendente.id} className='amigo'>
                                            <AmigoFotoComponent id = {friendPendente.userId}/>
                                            <p>{friendPendente.name} #{friendPendente.userId}</p>
                                            <div className='botoes_amigos'>
                                                <button type="button" onClick={() => aceitarAmizade(friendPendente.id)} class="button_perfil">
                                                  <span class="button__text">Aceitar</span>
                                                  <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                                                </button>
                                                <button type="button" onClick={() => negarAmizade(friendPendente.id)} class="button_perfil_negar">
                                                    <span class="button__text">Negar</span>
                                                    <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" height="25" width="25">
                                                        <path fill="#FFFFFF" d="M8.78842 5.03866C8.86656 4.96052 8.97254 4.91663 9.08305 4.91663H11.4164C11.5269 4.91663 11.6329 4.96052 11.711 5.03866C11.7892 5.11681 11.833 5.22279 11.833 5.33329V5.74939H8.66638V5.33329C8.66638 5.22279 8.71028 5.11681 8.78842 5.03866ZM7.16638 5.74939V5.33329C7.16638 4.82496 7.36832 4.33745 7.72776 3.978C8.08721 3.61856 8.57472 3.41663 9.08305 3.41663H11.4164C11.9247 3.41663 12.4122 3.61856 12.7717 3.978C13.1311 4.33745 13.333 4.82496 13.333 5.33329V5.74939H15.5C15.9142 5.74939 16.25 6.08518 16.25 6.49939C16.25 6.9136 15.9142 7.24939 15.5 7.24939H15.0105L14.2492 14.7095C14.2382 15.2023 14.0377 15.6726 13.6883 16.0219C13.3289 16.3814 12.8414 16.5833 12.333 16.5833H8.16638C7.65805 16.5833 7.17054 16.3814 6.81109 16.0219C6.46176 15.6726 6.2612 15.2023 6.25019 14.7095L5.48896 7.24939H5C4.58579 7.24939 4.25 6.9136 4.25 6.49939C4.25 6.08518 4.58579 5.74939 5 5.74939H6.16667H7.16638ZM7.91638 7.24996H12.583H13.5026L12.7536 14.5905C12.751 14.6158 12.7497 14.6412 12.7497 14.6666C12.7497 14.7771 12.7058 14.8831 12.6277 14.9613C12.5495 15.0394 12.4436 15.0833 12.333 15.0833H8.16638C8.05588 15.0833 7.94989 15.0394 7.87175 14.9613C7.79361 14.8831 7.74972 14.7771 7.74972 14.6666C7.74972 14.6412 7.74842 14.6158 7.74584 14.5905L6.99681 7.24996H7.91638Z" clip-rule="evenodd" fill-rule="evenodd"></path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    }
                                </>
                            )) : <p>Sem solicitações de amizade feitas</p>}
                        </div>
                    </div>
                )}

                {activeSection === 'pesquisa' && (
                   <div className='amizades_pesquisar'>
                   <div class="wrap-input-17">
                       <div class="search-box">
                           <button onClick={requestSearchFriend} class="btn-search">🔍</button>
                           <input type="text" class="input-search" onChange={friendSearchApelidoChange} value={friendSearchApelido} placeholder="Apelido do amigo"></input>
                           <input type="text" class="input-search" onChange={friendSearchIdChange} value={friendSearchId} placeholder="ID do amigo"></input>
                       </div>
                       <div className='amizades_amigos'>
                           {friendsConsult.length > 0 ? friendsConsult.map((amigosConsult) => (
                               <>
                                   {amigosConsult.id != id &&
                                       <div key={amigosConsult.id} className='amigo'>
                                           <AmigoFotoComponent id = {amigosConsult.id}/>
                                           <p>{amigosConsult.surname} #{amigosConsult.id}</p>
                                           <button type="button" onClick={() => requestFriend(amigosConsult.id)} class="button_perfil">
                                             <span class="button__text">Solicitar</span>
                                             <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                                           </button>
                                       </div>
                                   }
                               </>
                           )) : <p></p>}
                       </div>
                   </div>
                   {message &&
                       <p className='texto_alerta'>{message}</p>
                   }
               </div>
                )}
            </div>
        </section>
    );
}

export default AmigosConsultComponent;
