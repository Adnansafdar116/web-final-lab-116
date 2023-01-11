import React from 'react'

import { useState, useEffect } from 'react';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [total, setTotal] = useState(0);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`https://dummyjson.com/posts?skip=${skip}&limit=${limit}` );
            const data = await response.json();

            setPosts(data.posts);
            setTotal(data.total);
        }
        fetchData();
    }, [skip, limit]);
    
    return ( 
        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>Reactions: {post.reactions}</p>
                    <p>User ID: {post.userId}</p>
                </div>
            ))}
            <div>
                <button onClick={() => setSkip(skip - limit)} disabled={skip === 0}>
                    Previous
                </button>
                <button onClick={() => setSkip(skip + limit)} disabled={skip + limit >= total}>
                    Next
                </button>
                <span>
                    Page {skip / limit + 1} of {Math.ceil(total / limit)}
                </span>
            </div>
        </div>
     );
}

export default Posts;