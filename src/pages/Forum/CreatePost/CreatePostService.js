import { notification_error } from 'components/toast/notification';
import React from 'react'
import CreatePost from './CreatePost'

export default function CreatePostService() {



    const createPost = (data) => {
        const { title, categories, content } = data;

        try {

        } catch (err) {
            console.log(err);
            notification_error("Failed!")
            return false;
        }
    }

    return (
        <CreatePost createPost={createPost} />
    )
}
