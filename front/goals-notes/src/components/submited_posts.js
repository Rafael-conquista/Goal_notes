import { update_user } from '../services/user_requests';
import React, { useRef } from 'react';
import './Style/posts.css';
import { useEffect, useState } from 'react';
import AmigoFotoComponent from './amigoFoto';
import CapMessage from './CapMessages';

function SubmitedPosts({ posts, id }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Caso você precise fazer algo com os comments quando posts mudarem
        setComments(posts.posts);
    }, [posts]);

    const capMessageRef = useRef();

    const handleClick = () => {
      capMessageRef.current.triggerToast();
    };

    return (
        <div>
            {comments && comments.length > 0 ? (
                comments.map((comment, index) => (
                    <div key={index} className='posts'>
                        <AmigoFotoComponent id = {comment.id_user}/>
                        <div className='text_style'>
                        <a className='sender_name' href={`/${comment.id_user}/Perfil`}>
                            <p className='sender_name'>
                               Seu amigo {comment.user_name} tem novidades!
                            </p>
                        </a>

                            <p>
                                Completou a tarefa: {comment.desc}
                            </p>
                        </div>
                        <div className='fixed_like' onClick={async () => {
                            await update_user({"capCoins": 2}, comment.id_user);
                            handleClick()
                        }}>
                                <span>❤️</span>
                        </div>
                    </div>
                ))
            ) : (
                <p>Nenhum post encontrado</p>
            )}
            <CapMessage ref={capMessageRef} message="Ótimo! Seu amigo ficará muito feliz com o seu apoio!" id_user={id} />
        </div>
    );
}

export default SubmitedPosts;
