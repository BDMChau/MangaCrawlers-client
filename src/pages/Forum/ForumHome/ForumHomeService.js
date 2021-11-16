import React, { useEffect, useState } from 'react'
import ForumHome from './ForumHome'
import forumApi from 'api/apis/MainServer/forumApi';
import arrayMethods from 'helpers/arrayMethods';
import { useSelector } from 'react-redux';

export default function ForumHomeService() {
    const forumState = useSelector((state) => state.forumState);
    const stuffsState = useSelector(state => state.stuffsState);

    const [categories, setCategories] = useState(forumState[0] ? forumState[0] : []);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [postsTopCmts, setPostsTopCmts] = useState([]);
    const [postsRandom, setpostsRandom] = useState([]);

    const [from, setFrom] = useState(0);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        getPosts();
        getTopCmtsPost();
        getRandomPosts();
    }, []);

    useEffect(() => {
        if (stuffsState[1] && stuffsState[0]) {
            getPosts();
        }
    }, [stuffsState])


    const getPosts = async () => {
        if (isEnd) return;
        setIsLoading(true);

        const data = {
            from: from,
            amount: 8
        }

        try {
            const res = await forumApi.getAllPost(data);

            const posts = res.content.posts
            const contFromPos = res.content.from;

            if (posts.length < 8) setIsEnd(true);

            setPosts(prev => [...prev, ...posts]);
            setFrom(contFromPos);
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }


    const getTopCmtsPost = async () => {
        try {
            let res = await forumApi.getTopPostCmts(5);
            if(res.content.err){
                let res = await forumApi.getRandomPosts(5);
                setPostsTopCmts(res.content.suggestion_list);
                return;
            }

            setPostsTopCmts(res.content.posts);
        } catch (err) {
            console.log(err)
        }
    }


    const getRandomPosts = async () => {
        try {
            let res = await forumApi.getRandomPosts(5);

            setpostsRandom(res.content.suggestion_list);
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <ForumHome
            categories={categories}

            posts={posts}
            isLoading={isLoading}

            postsTopCmts={postsTopCmts}
            postsRandom={postsRandom}
        />
    )
}
