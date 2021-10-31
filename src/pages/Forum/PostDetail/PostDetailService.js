import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import PostDetail from './PostDetail'


export default function PostDetailService() {
    const { postid } = useParams();


    useEffect(() => {
console.log(postid)
    },[postid])

    return (
        <PostDetail

        />
    )
}
