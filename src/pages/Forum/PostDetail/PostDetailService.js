import forumApi from 'api/apis/MainServer/forumApi';
import { message_error, message_success } from 'components/toast/message';
import { format } from 'helpers/format';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router'
import Cookies from 'universal-cookie';
import PostDetail from './PostDetail'
import smoothscroll from 'smoothscroll-polyfill';


export default function PostDetailService() {
    const userState = useSelector((state) => state.userState);

    const { postid } = useParams();

    const [postInfo, setPostInfo] = useState({});
    const [posts, setPosts] = useState([]);

    const [isLiked, setIsLiked] = useState(false);

    const cookies = new Cookies();
    const token = cookies.get("token");


    useEffect(() => {
        if (postid) {
            getPost(postid);

            smoothscroll.polyfill();
            window.scroll({
                top: 0,
                behavior: "smooth"
            });
        }

        getPosts();
        if (userState[0] && postid) checkIsLiked(postid);
    }, [postid, userState])

    const getPosts = async () => {

        const data = {
            from: 0,
            amount: 6
        }

        try {
            const res = await forumApi.getAllPost(data);

            const posts = res.content.posts
            const contFromPos = res.content.from;


            setPosts(posts);
        } catch (err) {
            console.log(err)
        }
    }

    const getPost = async (postId) => {
        const data = {
            post_id: postId
        }

        try {
            const res = await forumApi.getPost(data);
            if (res.content.msg) {
                res.content.post.created_at = format.formatDate02(res.content.post.created_at);
                setPostInfo(res.content.post);
            }
        } catch (err) {
            console.log(err)
        }
    }


    const likePost = async () => {
        if(!userState[0]) return message_error("You have to logged in to do this action");
        if(!Object.keys(postInfo).length) return;

        const data = {
            post_id: postInfo.post_id
        };

        try {
            const res = await forumApi.likePost(token, data);
            if(res.content.err){
                message_error("Failed!");
                return;
            }

            setIsLiked(true);
            setPostInfo({...postInfo, likes: res.content.likes});
        } catch (err) {
            console.log(err)
        }
    }


    const unlikePost = async () => {
        if(!userState[0]) return message_error("You have to logged in to do this action");
        if(!Object.keys(postInfo).length) return;

        const data = {
            post_id: postInfo.post_id
        };

        try {
            const res = await forumApi.unlikePost(token, data);
            if(res.content.err){
                message_error("Failed!");
                return;
            }

            setIsLiked(false);
            setPostInfo({...postInfo, likes: res.content.likes});
        } catch (err) {
            console.log(err)
        }
    }

    
    const checkIsLiked = async (postId) => {
        const data = {
            post_id: postId
        };

        try {
            const res = await forumApi.checkIsLiked(token, data);
            if(res.content.err){
                setIsLiked(false);
                message_error("Failed!");
                return;
            }

            const status = res.content.status_number;
            console.log(status)
            if(status === 1) setIsLiked(true);
            else setIsLiked(false)

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <PostDetail
            postInfo={postInfo}

            isLiked={isLiked}
            likePost={likePost}
            unlikePost={unlikePost}

            posts={posts}
        />
    )
}
