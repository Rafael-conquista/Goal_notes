import './Style/userStyle.css';
import React, { useState, useEffect } from 'react';
import { FaAngleLeft } from "react-icons/fa6";
import cap_default from '../images/cap_default.jpg';
import { get_cap, update_cap } from '../services/cap_requests.js';
import { verify } from '../utils/token_verify.js';
import { Modal } from 'react-bootstrap';
import Loading from './loading.js';
import { getAmigosUser } from '../services/amigos_requests.js';

function AmigosConsultComponent() {
    const [showModal, setShowModal] = useState(false);
    const [editar, setEditar] = useState(false);
    const [name, setName] = useState('');
    const [nameAntigo, setNameAntigo] = useState('');
    const [id, setId] = useState();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [friends, setFriends] = useState([]);  // Inicializar como array vazio

    async function verify_token() {
        const token_id = await verify(localStorage.getItem('token'));
        return token_id;
    }

    useEffect(() => {
        const first_acess = sessionStorage.getItem('first_acess');
        if (first_acess) {
            window.location.href = '/CapCreate';
        }
        verify_token().then((id) => {
            setId(id);
        });
    }, []);

    useEffect(() => {
        getAmigosUser(id).then((amigos) => {
            if (amigos && Array.isArray(amigos)) {
                setFriends(amigos);
            } else {
                setFriends([]);
            }
            setLoading(false);
        }).catch(() => {
            setFriends([]);
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    return (
        <section className='component_amigos_main'>
            <h1>Amizades feitas Recentemente</h1>
            <div className='amigo_main'>
                {friends.length > 0 ? friends.map((friend) => (
                    <div key={friend.id} className='amigo'>
                        <img src={cap_default} alt='vazio' className="cap_welcome_page" />
                        <p>{friend.name}</p>
                    </div>
                )) : <p>Você ainda não fez nenhuma amizade.</p>}
            </div>
        </section>
    );
}

export default AmigosConsultComponent;
