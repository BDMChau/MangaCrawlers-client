import React, { useEffect, useState } from 'react'
import ForumHome from './ForumHome'
import forumApi from 'api/apis/MainServer/forumApi';
import arrayMethods from 'helpers/arrayMethods';
import { useSelector } from 'react-redux';

export default function ForumHomeService() {
    const forumState = useSelector((state) => state.forumState);

    const [categories, setCategories] = useState(forumState[0] ? forumState[0] : []);
    const [posts, setPosts] = useState([]);

    const [from, setFrom] = useState(0);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        getAllPost();
    }, [])


    const getAllPost = async () => {
        if (isEnd) return;

        const data = {
            from: from,
            amount: 6
        }

        try {
            const res = await forumApi.getAllPost(data);

            const posts = res.content.posts
            const contFromPos = res.content.from;

            if (posts.length >= from) setIsEnd(true);

            setPosts(posts);
            setFrom(contFromPos);
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <ForumHome
            categories={categories}
            posts={posts}
        />
    )
}
