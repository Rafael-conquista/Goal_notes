import { update_user } from '../services/user_requests';
import React, { useRef } from 'react';
import './Style/posts.css';
import { useEffect, useState } from 'react';
import AmigoFotoComponent from './amigoFoto';
import CapMessage from './CapMessages';

function SubmitedPosts({ posts, id }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
        const filteredPosts = posts.posts.filter(post => !likedPosts.includes(post.id));
        setComments(filteredPosts);
    }, [posts]);

    const capMessageRef = useRef();

    const handleClick = async (index, postId) => {
        setComments(prevComments => prevComments.filter((_, i) => i !== index));

        const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
        likedPosts.push(postId);
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));

        await update_user({ "capCoins": 2 }, postId);

        capMessageRef.current.triggerToast();
    };

    return (
        <div>
            {comments && comments.length > 0 ? (
                comments.map((comment, index) => (
                    <div key={index} className='posts'>
                        <AmigoFotoComponent id={comment.id_user} />
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
                        <div className='fixed_like' onClick={() => handleClick(index, comment.id)}>
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
