import React, { useState, useEffect } from 'react'
import appwriteService from "../appwrite/config"
import { PostCard, Container } from "../components"

function AllPosts() {
    console.log("All Posts called")

    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.rows)
            }
        }).catch()
    }, [])

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => {
                        console.log("Post Card Invoked")
                        return <div key={post.$id} className='p-2 w-1/4'>
                            {console.log('Post card is given', post)}
                            <PostCard post={post} />
                        </div>
                    })}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts