import React, { useState, useEffect } from 'react';
import "./CommentContainter.css";

import CommentItems from '../CommentItems/CommentItems';
import InputForm from '../features/InputForm';
import userApi from 'api/apis/MainServer/userApi';
import { notification_error } from 'components/alerts/notification';
import { message_error } from 'components/alerts/message';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { Typography } from 'antd';



export default function CommentContainter({ mangaId, chapterId, commentsProp, isEndCmts, getCmts }) {
    const userState = useSelector((state) => state.userState);

    const [comments, setComments] = useState([])
    const [isAddedCmt, setIsAddedCmt] = useState(false);

    const [isErrorCmt, setIsErrorCmt] = useState(false);
    const [timeWhenAddedCmt, setTimeWhenAddedCmt] = useState();

    const cookies = new Cookies();
    const token = cookies.get("token");


    // check error when add cmt
    useEffect(() => {
        if (isErrorCmt === true) {
            for (const comment of comments) {
                if (comment.chaptercmt_time === timeWhenAddedCmt) {
                    comment.is_error = true;
                    break;
                }
            }

            setComments(comments);
        }
    }, [isErrorCmt])


    useEffect(() => {
        if (commentsProp.length) setComments(commentsProp);
    }, [commentsProp])




    const addCmt = async (dataInput) => {
        if (userState[0]) {
            const formData = new FormData();
            formData.append("manga_id", mangaId ? mangaId.toString() : "");
            formData.append("chapter_id", chapterId ? chapterId.toString() : "");
            formData.append("manga_comment_content", dataInput.content);
            formData.append("image", dataInput.image);
            formData.append("sticker_url", dataInput.sticker_url ? dataInput.sticker_url : "");
            formData.append("parent_id", dataInput.parent_id);
            formData.append("to_users_id", dataInput.to_users_id);


            try {
                const response = await userApi.addCmt(token, formData);
                if (response.content.comment_information) {
                    const newComment = response.content.comment_information;

                    setComments(prev => [newComment, ...prev])
                } else {
                    setIsErrorCmt(true);
                }
                setIsAddedCmt(true);
            } catch (ex) {
                console.log(ex);
                setIsAddedCmt(true);
            }
        } else {
            message_error("You have to login first!");
            return;
        }
    }

    const deleteCmt = async (id) => {
        if (!userState[0]) return message_error("You have to login first!");

        const data = mangaId
            ? {
                manga_comment_id: id,
                comments: comments
            }
            : {
                chapter_comment_id: id,
                comments: comments
            }

        try {
            const response = await userApi.deleteCmt(token, data);
            if (response.content.err) {
                notification_error("Something wrong, please try again :(")
                return;
            }
            const restCmts = response.content.comments

            console.log(restCmts)
            setTimeout(() => setComments(restCmts), 200)
        } catch (err) {
            notification_error("Something wrong, please try again :(")
            console.log(err)
        }
    }




    return (
        <div className="comments-form">
            {userState[0]
                ? <InputForm
                    token={token}

                    isAddedCmt={isAddedCmt}
                    setIsAddedCmt={setIsAddedCmt}
                    addCmt={(content) => addCmt(content)}
                />
                : <Typography.Title level={5} style={{ color: "#FF4D4F" }} >You must be logged in to post a comment!</Typography.Title>

            }

            {/* render cmts */}
            <CommentItems
                comments={comments}
                getCmts={() => getCmts()}
                isEndCmts={isEndCmts}

                mangaId={mangaId}

                deleteCmt={deleteCmt}
            />
        </div>
    )
}
