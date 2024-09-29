import './Style/userStyle.css';
import React, { useState, useEffect } from 'react';
import Loading from './loading.js';
import { getAmigosUser } from '../services/amigos_requests.js';
import AmigoFotoComponent from '../components/amigoFoto.js';

function AmigosConsultComponent({ idToken, id }) {
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
                      <AmigoFotoComponent id = {friend.userId}/>
                    <p>{friend.name} #{friend.userId}</p>
                </div>
                )) : <p>Você ainda não fez nenhuma amizade.</p>}
            </div>
        </section>
    );
}

export default AmigosConsultComponent;
