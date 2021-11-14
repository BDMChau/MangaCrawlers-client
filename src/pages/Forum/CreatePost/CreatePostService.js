import forumApi from 'api/apis/MainServer/forumApi';
import userApi from 'api/apis/MainServer/userApi';
import { notification_error } from 'components/toast/notification';
import redirectURI from 'helpers/redirectURI';
import React from 'react'
import { useSelector } from 'react-redux';
import { socketActions } from 'socket/socketClient';
import Cookies from 'universal-cookie';
import CreatePost from './CreatePost'

export default function CreatePostService() {
    const userState = useSelector((state) => state.userState);

    const cookies = new Cookies();
    const token = cookies.get("token");



    const createPost = async (data) => {
        if (!userState[0] || !token) return;

        try {
            const res = await forumApi.createPost(token, data)
            if (res.content.msg) {
                const post = res.content.post;

                notifyToAllFriends(post);
                return true;
            }
            else {
                return false;
            }
        } catch (err) {
            console.log(err);
            notification_error("Failed!")
            return false;
        }
    }


    const notifyToAllFriends = (post) => {
        const data = {
            type: 3,
            message: `
            <a href=${redirectURI.postPage_uri(post.post_id)} style="color:black;" >Your friend <b>${userState[0].user_name}</b> posted a new post.</a>
            `,
            image_url: userState[0].user_avatar,
            user_id: userState[0].user_id,
            list_to: [], // user's friends
            obj_data: {
                target_id: post.post_id.toString(),
                target_title: "post_new"
            }
        }

        socketActions.sendMessageToServer(data);
    }



    return (
        <CreatePost createPost={createPost} />
    )
}
