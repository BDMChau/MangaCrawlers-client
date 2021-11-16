import forumApi from 'api/apis/MainServer/forumApi';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router'
import CategoryPosts from './CategoryPosts'

export default function CategoryPostsService() {
    const stuffsState = useSelector(state => state.stuffsState);
    const forumState = useSelector((state) => state.forumState);
    const query = new URLSearchParams(useLocation().search);

    const [categories, setCategories] = useState(forumState[0] ? forumState[0] : []);
    const [category, setCategory] = useState({});
    const [posts, setPosts] = useState([]);
    const [total, setTotal] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [from, setFrom] = useState(0);
    const [isEnd, setIsEnd] = useState(false);


    useEffect(() => {
        if (query.get("v")) {
            setIsLoading(true);
            setFrom(0);
            setIsEnd(false);
            setPosts([]);

            setTimeout(() => getPostWithCategory(query.get("v"), true), 200);
        }
    }, [query.get("v")])


    useEffect(() => {
        if (stuffsState[1] && stuffsState[0]) {
            getPostWithCategory(query.get("v"))
        }
    }, [stuffsState])



    const getPostWithCategory = async (cateId, reset) => {
        if (isEnd && !reset) {
            setIsLoading(false);
            return;
        }

        const data = {
            category_id: cateId,
            from: reset ? 0 : from,
            amount: 8
        };

        try {
            const res = await forumApi.getPostsWithCategory(data);
            if (res.content.err) {
                if (res.content.category) setCategory(res.content.category);
                setIsLoading(false);
                return;
            }

            const posts = res.content.posts;
            posts.forEach((post) => {
                const shortContent = post.content.match(/.{1,200}/g);
                post.content = shortContent[0];
            })


            if (posts.length < 8) setIsEnd(true);

            setPosts(prev => [...prev, ...posts]);
            setTotal(res.content.total_posts);
            setCategory(res.content.category);

            setFrom(res.content.from);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            console.log(err)
        }
    }

    return (
        <CategoryPosts
            posts={posts}
            total={total}

            isLoading={isLoading}

            categories={categories}
            category={category}
        />
    )
}
