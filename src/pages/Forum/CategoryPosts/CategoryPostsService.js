import forumApi from 'api/apis/MainServer/forumApi';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router'
import CategoryPosts from './CategoryPosts'

export default function CategoryPostsService() {
    const forumState = useSelector((state) => state.forumState);
    const query = new URLSearchParams(useLocation().search);

    const [categories, setCategories] = useState(forumState[0] ? forumState[0] : []);
    const [category, setCategory] = useState({});
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        if (query.get("cate_id")) {
            getPostWithCategory(query.get("cate_id"))
        }
    }, [query.get("cate_id")])


    const getPostWithCategory = async (cateId) => {
        const data = {
            category_id: cateId
        };

        try {
            const res = await forumApi.getPostsWithCategory(data);

            setPosts(res.content.posts)
            setCategory(res.content.category)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <CategoryPosts
            posts={posts}

            categories={categories}
            category={category}
        />
    )
}
