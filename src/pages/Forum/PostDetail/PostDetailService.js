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
    const [quotedPost, setQuotedPost] = useState({});

    const [topLikePosts, setTopLikePosts] = useState([]);
    const [topDislikePosts, setTopDislikePosts] = useState([]);

    // 0: nothing, 1: like, 2: dislike
    const [sttLike, setSttLike] = useState(0);

    const cookies = new Cookies();
    const token = cookies.get("token");


    useEffect(() => {
        if (postid) {
            setQuotedPost({});
            
            smoothscroll.polyfill();
            window.scroll({
                top: 0,
                behavior: "smooth"
            });
        }
    }, [postid])

    useEffect(() => {
        if (postid) getPost(postid);

        getTopLikesPost();
        getTopDislikesPost();

        if (postid) checkIsLiked(postid);
    }, [postid, userState])


    const getTopLikesPost = async () => {
        try {
            let res = await forumApi.getTopPostsLike(6);
            if (res.content.err) {
                res = await forumApi.getRandomPosts(6);
                setTopLikePosts(res.content.suggestion_list);
                return;
            }

            setTopLikePosts(res.content.posts);
        } catch (err) {
            console.log(err)
        }
    }


    const getTopDislikesPost = async () => {
        try {
            let res = await forumApi.getTopPostsdDislike(6);
            if (res.content.err) {
                res = await forumApi.getRandomPosts(6);
                setTopDislikePosts(res.content.suggestion_list);
                return;
            }

            setTopDislikePosts(res.content.posts);
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
                const post = res.content.post;
                setPostInfo(res.content.post);

                if (post.parent_id) {
                    const data = { post_id: post.parent_id };

                    const res = await forumApi.getPost(data);
                    if (res.content.msg) {
                        const quotedPost = res.content.post;
                        // quotedPost.content = quotedPost.content.match(/.{1,200}/g)[0];

                        setQuotedPost(quotedPost);
                    }
                }
            }
        } catch (err) {
            console.log(err)
        }
    }



    ////////////// interaction
    const likePost = async () => {
        if (!userState[0]) return message_error("You have to logged in to do this action");
        if (!Object.keys(postInfo).length) return;

        const data = {
            post_id: postInfo.post_id
        };

        try {
            const res = await forumApi.likePost(token, data);
            if (res.content.err) {
                message_error("Failed!");
                return;
            }

            setSttLike(1)
            setPostInfo({
                ...postInfo,
                likes: res.content.likes,
                dislikes: res.content.dislikes
            });
        } catch (err) {
            console.log(err)
        }
    }


    const unlikePost = async () => {
        if (!userState[0]) return message_error("You have to logged in to do this action");
        if (!Object.keys(postInfo).length) return;

        const data = {
            post_id: postInfo.post_id
        };

        try {
            const res = await forumApi.unlikePost(token, data);
            if (res.content.err) {
                message_error("Failed!");
                return;
            }

            setSttLike(0);
            setPostInfo({
                ...postInfo,
                likes: res.content.likes,
                dislikes: res.content.dislikes
            });
        } catch (err) {
            console.log(err)
        }
    }



    const dislikePost = async () => {
        if (!userState[0]) return message_error("You have to logged in to do this action");
        if (!Object.keys(postInfo).length) return;

        const data = {
            post_id: postInfo.post_id
        };

        try {
            const res = await forumApi.dislikePost(token, data);
            if (res.content.err) {
                message_error("Failed!");
                return;
            }

            setSttLike(2)
            setPostInfo({
                ...postInfo,
                likes: res.content.likes,
                dislikes: res.content.dislikes
            });
        } catch (err) {
            console.log(err)
        }
    }


    const unDislikePost = async () => {
        if (!userState[0]) return message_error("You have to logged in to do this action");
        if (!Object.keys(postInfo).length) return;

        const data = {
            post_id: postInfo.post_id
        };

        try {
            const res = await forumApi.unDislikePost(token, data);
            if (res.content.err) {
                message_error("Failed!");
                return;
            }

            setSttLike(0);
            setPostInfo({
                ...postInfo,
                likes: res.content.likes,
                dislikes: res.content.dislikes
            });
        } catch (err) {
            console.log(err)
        }
    }



    const checkIsLiked = async (postId) => {
        if (!userState[0]) return;

        const data = { post_id: postId };

        try {
            const res = await forumApi.checkIsLiked(token, data);

            const status = res.content.status_number;

            // 0: nothing, 1: like, 2: dislike
            if (status === 1) setSttLike(1);
            else if (status === 2) setSttLike(2);
            else setSttLike(0);

        } catch (err) {
            setSttLike(0);
            console.log(err)
        }
    }

    return (
        <PostDetail
            postInfo={postInfo}
            quotedPost={quotedPost}

            sttLike={sttLike}
            likePost={likePost}
            unlikePost={unlikePost}

            dislikePost={dislikePost}
            unDislikePost={unDislikePost}

            topLikePosts={topLikePosts}
            topDislikePosts={topDislikePosts}
        />
    )
}
