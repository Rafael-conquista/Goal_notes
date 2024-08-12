import SubmitedPosts from './submited_posts';
import { useState, useEffect } from 'react';
import { verify } from '../utils/token_verify.js';
import { get_user } from '../services/user_requests.js';
import { getPosts as fetchPosts } from '../services/api_requests.js'; // Importando a função correta para buscar os posts

function PostsFeeds({ update, id }) {
    const [loaded, setLoaded] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (id) {
            fetchPosts(id).then((dados) => { // Usando a função importada para buscar os posts
                setPosts(dados);
                setLoaded(true);
            });
        }
    }, [id]);

    if (!loaded) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="feed_container">
            <div>
                <SubmitedPosts posts={posts} update={update} id={id} />
            </div>
        </div>
    );
}

export default PostsFeeds;
