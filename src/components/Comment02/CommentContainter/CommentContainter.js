import React, { useState, useEffect, memo } from 'react';
import "./CommentContainter.css";

import CommentItems from '../CommentItems/CommentItems';
import InputForm from '../features/InputForm';
import userApi from 'api/apis/MainServer/userApi';
import { notification_error } from 'components/toast/notification';
import { message_error } from 'components/toast/message';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { Typography } from 'antd';
import TransitionAnimate from 'components/Animation/transition';
import mangaApi from 'api/apis/MainServer/mangaApi';
import forumApi from 'api/apis/MainServer/forumApi';



function CommentContainter({ mangaId, postId }) {
    const userState = useSelector((state) => state.userState);

    // comments
    const [fromRow, setFromRow] = useState(0);
    const [isEndCmts, setIsEndCmts] = useState(false);
    const [comments, setComments] = useState([])
    const [isAddedCmt, setIsAddedCmt] = useState(false);

    // child cmts
    const [fromRowsChild, setFromRowsChild] = useState(2);
    const [isEndCmtsChild, setIsEndCmtsChild] = useState(false);

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

    // get comments
    useEffect(() => {
        setIsEndCmts(false);
        setComments([]);
        setFromRow(0);    

        // if (fromRow === 0) getCmts()
    }, [mangaId, postId])


    useEffect(() => {
        // if fromRow is 0, run getCmts() below
        if (fromRow === 0) getCmts()
    }, [mangaId, postId, fromRow])


    const getCmts = async () => {
        const data = {
            manga_id: mangaId ? mangaId : null,
            post_id: postId ? postId : null,
            chapter_id: null,
            from: fromRow,
            amount: 10
        }

        try {
            let response;
            if(mangaId) response = await mangaApi.getCommentsManga(data);
            else if(postId) response = await forumApi.getCmtsPost(data);

            const comments = response.content.comments ? response.content.comments : [];

            if (comments.length < 10 && response.content.msg === "No comments found!") {
                setIsEndCmts(true);
                return;
            }

            setFromRow(fromRow + 11)
            setTimeout(() => setComments(prev => [...prev, ...comments]), 300)
        } catch (ex) {
            console.log(ex)
        }

    }



    const addCmt = async (dataInput) => {
        if (userState[0]) {
            const formData = new FormData();
            // formData.append("manga_id", mangaId ? mangaId.toString() : "");
            // formData.append("post_id", postId ? postId.toString() : "");
            // formData.append("chapter_id", "");
            if(postId){
                formData.append("target_title", "post");
                formData.append("target_id", postId.toString());
            } else if(mangaId){
                formData.append("target_title", "manga");
                formData.append("target_id", mangaId.toString());
            }
            formData.append("manga_comment_content", dataInput.content);
            formData.append("image", dataInput.image);
            formData.append("sticker_url", dataInput.sticker_url ? dataInput.sticker_url : "");
            formData.append("parent_id", dataInput.parent_id);
            formData.append("to_users_id", dataInput.to_users_id);


            try {
                const response = await userApi.addCmt(token, formData);
                
                return;
            } catch (ex) {
                console.log(ex);
                setIsAddedCmt(true);
            }
        } else {
            message_error("You have to logged in to do this action");
            return;
        }
    }


    const deleteCmt = async (id) => {
        if (!userState[0]) return message_error("You have to logged in to do this action");

        const data = {
            manga_comment_id: id,
            comments: comments
        }

        try {
            const response = await userApi.deleteCmt(token, data);
            if (response.content.err) {
                notification_error("Failed :(");
                setTimeout(() => setComments([]), 200)
                return;
            }
            const restCmts = response.content.comments;

            setTimeout(() => setComments(restCmts), 200)
        } catch (err) {
            notification_error("Failed :(")
            console.log(err)
        }
    }


    const editCmt = async (editObj) => {
        const formData = new FormData();
        formData.append("manga_comment_id", editObj.cmt_id);
        formData.append("manga_comment_content", editObj.content);
        formData.append("to_users_id", editObj.toUsersId);
        formData.append("image", editObj.image);

        try {
            const response = await userApi.updateCmt(token, formData);
            if (response.content.err) {
                notification_error("Failed :(")
                return;
            }
            const comment = response.content.comment_info;

            const data = {
                comments: comments,
                manga_comment_id: comment.manga_comment_id,
                key: 2
            };

            const response02 = await userApi.filterCmts(token, data);
            if (response02.content.err) {
                notification_error("Failed :(")
                return;
            }
            const restCmts = response02.content.comments ? response02.content.comments : [];

            setTimeout(() => setComments(restCmts), 200)
        } catch (err) {
            notification_error("Failed :(")
            console.log(err)
        }
    }



    return (
        <div className="comments-form">
            {userState[0]
                ? <TransitionAnimate renderPart={
                    <InputForm
                        token={token}

                        isAddedCmt={isAddedCmt}
                        setIsAddedCmt={setIsAddedCmt}
                        addCmt={(dataInput) => addCmt(dataInput)}
                    />
                } transitionTime={0.1} />
                : <Typography.Title level={5} style={{ color: "#FF4D4F" }} >You must be logged in to post a comment!</Typography.Title>

            }

            {/* render cmts */}
            <CommentItems
                comments={comments}
                setComments={setComments}

                getCmts={() => getCmts()}

                isEndCmts={isEndCmts}

                mangaId={mangaId}

                deleteCmt={deleteCmt}

                addCmt={(dataInput) => addCmt(dataInput)}
                isAddedCmt={isAddedCmt}
                setIsAddedCmt={setIsAddedCmt}

                editCmt={editCmt}
            />
        </div>
    )
}

export default memo(CommentContainter);