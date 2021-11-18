import React, { useEffect, useState } from 'react'
import "../../CommentItems.css"

import { Tooltip } from 'antd'
import { LikeOutlined, LikeFilled } from '@ant-design/icons';
import Cookies from 'universal-cookie';
import userApi from 'api/apis/MainServer/userApi';
import { useSelector } from 'react-redux';


export default function ButtonLike({ comment }) {
    const userState = useSelector((state) => state.userState);
    const [userLiked, setUserLiked] = useState(false);

    const [likes, setLikes] = useState(0);

    const cookies = new Cookies();
    const token = cookies.get("token");

    useEffect(() => {
        setLikes(comment.count_like);
    }, [comment])


    // useEffect(() => {
    //     if (userState[0] && Object.keys(comment).length) checkUserLiked()
    // }, [userState])


  
    const checkUserLiked = async () => {
        const data = { comment_id: comment.comment_id.toString() };

        try {
            const res = await userApi.checkIsLiked(token, data)
            const isLiked = res.content.status_number === 0 ? false : true;

            setUserLiked(isLiked);
        } catch (err) {
            console.log(err)
        }
    }


    const handleLikeCmt = async () => {
        const data = { comment_id: comment.comment_id.toString() };

        try {
            const res = await userApi.likeCmt(token, data)

            if (res.content.msg) {
                setUserLiked(true);
                setLikes(likes + 1);
            }
        } catch (err) {
            console.log(err)
        }
    };

    const handleDislikeCmt = async () => {
        const data = { comment_id: comment.comment_id.toString() };

        try {
            const res = await userApi.unlikeCmt(token, data)

            if (res.content.msg) {
                setUserLiked(false);
                setLikes(likes - 1);
            }
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <Tooltip key="btn-like" title={userLiked ? "Dislike" : "Give a like"}>
            <span
                onClick={() => userLiked ? handleDislikeCmt() : handleLikeCmt()}
            >
                {userLiked
                    ? <LikeFilled style={{ fontSize: "18px", color: "#1890FF", cursor: "pointer" }} />
                    : <LikeOutlined style={{ fontSize: "18px", color: "#C1C1C1", cursor: "pointer" }} />
                }

                <span
                    style={{ marginLeft: "5px", color: "#5c5d5e", fontWeight: 500, transition: "0.3s" }}
                    className="comment-likes"
                >
                    {likes}
                </span>
            </span>
        </Tooltip>
    )
}
