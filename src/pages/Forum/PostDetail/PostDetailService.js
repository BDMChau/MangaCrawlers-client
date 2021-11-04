import forumApi from 'api/apis/MainServer/forumApi';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import PostDetail from './PostDetail'


export default function PostDetailService() {
    const { postid } = useParams();

    const [postInfo, setPostInfo] = useState({})



    useEffect(() => {
        if (postid) getPost(postid)
    }, [postid])


    const getPost = async (postId) => {
        const data = {
            post_id: postId
        }

        try {
            const res = await forumApi.getPost(data);
            if (res.content.msg) {
                setPostInfo(res.content.post);
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <PostDetail
            postInfo={postInfo}
        />
    )
}
