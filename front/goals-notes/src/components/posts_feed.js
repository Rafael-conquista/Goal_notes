import SubmitedPosts from './submited_posts';
import { useState, useEffect } from 'react';
import { verify } from '../utils/token_verify.js';
import { get_user } from '../services/user_requests.js';
import { getPosts as fetchPosts } from '../services/api_requests.js'; // Importando a função correta para buscar os posts

function PostsFeeds({ update }) {
    const [loaded, setLoaded] = useState(false);
    const [posts, setPosts] = useState([]);
    const [id, setId] = useState(null);

    useEffect(() => {
        if (id) {
            fetchPosts(id).then((dados) => { // Usando a função importada para buscar os posts
                setPosts(dados);
                setLoaded(true);
            });
        }
    }, [id]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        verify_user(token).then(({ id, name }) => {
            setId(id);
        });
    }, []);

    async function verify_user(token) {
        const token_id = await verify(token);
        const url = new URL(window.location.href);

        if (sessionStorage.getItem("first_acess")) {
            window.location.href = `/CapCreate`;
        }
        if (url.href.includes(`/${token_id}/`)) {
            console.log('token válido');
        } else {
            console.log('usuário não condiz com a url informada');
            window.location.href = `/`;
        }
        const user = await get_user(token_id);
        return { id: token_id, name: user['name'] };
    }

    if (!loaded) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="feed_container">
            <span>
                Feed
            </span>
            <div>
                <SubmitedPosts posts={posts} update={update} />
            </div>
        </div>
    );
}

export default PostsFeeds;
