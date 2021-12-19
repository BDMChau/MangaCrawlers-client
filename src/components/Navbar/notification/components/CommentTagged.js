import React, { memo, useEffect, useState } from 'react'

import { Typography, Avatar } from 'antd';

import { NavLink } from 'react-router-dom';
import redirectURI from 'helpers/redirectURI';
import mangaApi from 'api/apis/MainServer/mangaApi';
import forumApi from 'api/apis/MainServer/forumApi';
import userApi from 'api/apis/MainServer/userApi';


const CommentTagged = ({ notification, handleViewed }) => {
    const [uri, setUri] = useState("");

    const targetTitle = notification.target_title;

    const imgDefault = 'https://res.cloudinary.com/mangacrawlers/image/upload/v1632847306/notification_imgs/default/notification.svg';


    useEffect(() => {
        console.log("ascascascasc")
        handleUri();
    }, [])

    // target_id is comment_id
    const handleUri = async () => {
        const cmt = await getCommentById(notification.target_id);
        if (!cmt) return;

        if (targetTitle === "comment_post") {
            const post = await getPostById(cmt.post_id);

            if (post) setUri(redirectURI.postPage_uri(post.post_id));

        } else if (targetTitle === "comment_manga") {
            const manga = await getMangaById(cmt.manga_id);

            if (manga) setUri(redirectURI.mangaPage_uri(manga.manga_id, manga.manga_name));
        }
    }

    const getCommentById = async (id) => {
        const data = { comment_id: id }

        try {
            const res = await userApi.getComment(data);
            if (res.content.err) return false;

            return res.content.comment;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    const getMangaById = async (id) => {
        if (!id) return false;

        const params = {
            manga_id: id,
        }

        try {
            const res = await mangaApi.getManga(params);
            if (res.content.err) return false;

            return res.content.manga;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    const getPostById = async (id) => {
        if (!id) return false;

        const data = {
            post_id: id,
        }

        try {
            const res = await forumApi.getPost(data);
            if (res.content.err) return false;

            return res.content.post;
        } catch (err) {
            console.log(err);
            return false;
        }
    }


    return (
        <NavLink to={uri ? uri : "#"} style={{ display: 'flex' }} onClick={() => handleViewed(notification.notification_id)}>
            <div>
                <Avatar className='image' src={notification.image_url} style={{ borderRadius: notification.image_url === imgDefault ? "0px" : "50px" }} alt="" />
            </div>

            <div className='content'>
                <Typography.Text>
                    <div title={notification.notification_content} style={{ display: 'unset' }} dangerouslySetInnerHTML={{ __html: notification.notification_content }}></div>
                </Typography.Text>
            </div>
        </NavLink >
    )
}

export default memo(CommentTagged);