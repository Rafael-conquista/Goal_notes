import './Style/userStyle.css';
import React, { useState, useEffect } from 'react';
import { FaAngleLeft } from "react-icons/fa6";
import cap_default from '../images/cap_default.jpg';
import { get_cap, update_cap } from '../services/cap_requests.js';
import { verify } from '../utils/token_verify.js';
import { Modal } from 'react-bootstrap';
import Loading from './loading.js';
import { getAmigosUser } from '../services/amigos_requests.js';
import { useParams } from 'react-router-dom';

function AmigosConsultComponent() {
    const [showModal, setShowModal] = useState(false);
    const [ultimos, setUltimos] = useState(true);
    const { id } = useParams();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        getAmigosUser(id, true).then((amigos) => {
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
            <div className='amigo_main_ultimos'>
                {friends.length > 0 ? friends.map((friend) => (
                    <div key={friend.id} className='amigo'>
                    <img src={cap_default} alt='vazio' className="cap_welcome_page" />
                    <p>{friend.name} #{friend.userId}</p>
                </div>
                )) : <p>Você ainda não fez nenhuma amizade.</p>}
            </div>
        </section>
    );
}

export default AmigosConsultComponent;
