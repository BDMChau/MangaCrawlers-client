import React from 'react'
import CreatePost from './CreatePost'

export default function CreatePostService() {



    const createPost = (data) => {
        const { title, categories, content } = data;

        console.log(data)
    }

    return (
        <CreatePost createPost={createPost} />
    )
}
