import forumApi from 'api/apis/MainServer/forumApi';
import userApi from 'api/apis/MainServer/userApi';
import { notification_error } from 'components/toast/notification';
import React from 'react'
import Cookies from 'universal-cookie';
import CreatePost from './CreatePost'

export default function CreatePostService() {

    const cookies = new Cookies();
    const token = cookies.get("token");

    const createPost = async (data) => {
        const { title, categoriesId, content } = data;

        try {
            const res = await forumApi.createPost(token, data)
            if(res.content.msg) return true;
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
