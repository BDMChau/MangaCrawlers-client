import React, { useEffect, useState } from 'react'
import ForumHome from './ForumHome'
import forumApi from 'api/apis/MainServer/forumApi';
import arrayMethods from 'helpers/arrayMethods';
import { useSelector } from 'react-redux';

export default function ForumHomeService() {
    const forumState = useSelector((state) => state.forumState);

    const [categories, setCategories] = useState(forumState[0] ? forumState[0] : []);



    const getAllCategories = async () => {
        try {
            const res = await forumApi.getListCategory();
            if (res.content.msg) {
                const categories = arrayMethods.shuffle(res.content.categories);
                setCategories(categories);
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <ForumHome
            categories={categories}
        />
    )
}
