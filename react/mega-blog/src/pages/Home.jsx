import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from "../components"

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.rows)
            }
            console.log(posts.rows)
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="flex flex-wrap">
                <div className="w-full block">
                    <Container>
                        <div className="flex flex-wrap">
                            <h1 className='text-center'>No Posts yet</h1>
                        </div>
                    </Container>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-wrap">
            <div className="w-full block">
                <Container>
                    <div className="flex flex-wrap">
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard post={post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Home