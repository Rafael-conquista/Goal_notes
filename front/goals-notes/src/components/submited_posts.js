import './Style/posts.css'
import { useEffect, useState } from 'react';

function SubmitedPosts({ update }) {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
    
            // let storagedComments = FakeApiGet();
        };
    
        fetchData();
    }, [update]);

    return (
        <div>
            {comments.map((comment, index) => (
            <div key={index}>
                <img src={`img${comment.imageId}.jpg`} className='avatar' alt='imagem de perfil'/>
                    
                <div className='text_style'>
                    <p>
                        {comment.message}
                    </p>
                    <p className='sender'>
                        enviado por
                    </p>
                    <p className='sender_name'>
                        {comment.name}
                    </p>
                </div>
            </div>
        ))}
        </div>
    )
}

export default SubmitedPosts;