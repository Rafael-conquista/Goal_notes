import SubmitedPosts from './submited_posts';

function PostsFeeds({ update }){
    return(
        <div className="feed_container">
            <span>
                Feed
            </span>
            <div>
                <SubmitedPosts update={update}/>
            </div>
        </div>
    )
}

export default PostsFeeds;