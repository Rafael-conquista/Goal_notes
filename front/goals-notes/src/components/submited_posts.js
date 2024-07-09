import './Style/posts.css';
import { useEffect, useState } from 'react';

function SubmitedPosts({ posts }) {
    console.log(posts);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Caso você precise fazer algo com os comments quando posts mudarem
        setComments(posts.posts);
    }, [posts]);

    return (
        <div>
            {comments && comments.length > 0 ? (
                comments.map((comment, index) => (
                    <div key={index} className='posts'>
                        <img src={`img${comment.imageId}.jpg`} className='avatar' alt='imagem de perfil' />
                        <div className='text_style'>
                            <p className='sender_name'>
                               Seu amigo {comment.user_name} tem novidades!
                            </p>
                            <p>
                                Completou a tarefa: {comment.desc}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <p>Nenhum post encontrado</p>
            )}
        </div>
    );
}

export default SubmitedPosts;
