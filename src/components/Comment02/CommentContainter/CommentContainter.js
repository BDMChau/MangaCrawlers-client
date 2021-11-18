import React, { useState, useEffect, memo } from 'react';
import "./CommentContainter.css";

import CommentItems from '../CommentItems/CommentItems';
import InputForm from '../CommentItems/components/features/InputForm';
import userApi from 'api/apis/MainServer/userApi';
import { notification_error } from 'components/toast/notification';
import { message_error } from 'components/toast/message';
import { useDispatch, useSelector } from 'react-redux';
import { SET_REPLY_COMMENT_FROM_COMMENT_LV00 } from "store/features/stuffs/StuffsSlice"
import Cookies from 'universal-cookie';
import { Typography } from 'antd';
import TransitionAnimate from 'components/Animation/transition';
import forumApi from 'api/apis/MainServer/forumApi';
import { filter } from 'lodash';


// targetTitle can be "post" or "manga"
function CommentContainter({ targetTitle, targetId }) {
    const userState = useSelector((state) => state.userState);
    const dispatch = useDispatch();

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
        if (targetId && targetTitle) {
            setIsEndCmts(false);
            setComments([]);
            setFromRow(0);
        }

        // if (fromRow === 0) getCmts()
    }, [targetId, targetTitle])


    useEffect(() => {
        // if fromRow is 0, run getCmts() below
        if (fromRow === 0) {
            if (targetId && targetTitle) {
                if (userState[0]) getCmts(userState[0].user_id);
                else getCmts()
            }
        }

    }, [targetId, targetTitle, fromRow, userState])


    const getCmts = async (userId) => {
        if (isEndCmts) return;

        const data = {
            target_title: targetTitle,
            target_id: targetId,
            from: fromRow,
            amount: 8,
            user_id: userId ? userId : ""
        }

        try {
            let res = await userApi.getCommentsManga(data);
            if (res.content.err) return;

            const comments = res.content.comments;
            if (comments.length < 8) setIsEndCmts(true);

            console.log(comments)
            setFromRow(res.content.from);
            setTimeout(() => setComments(prev => [...prev, ...comments]), 300)
        } catch (err) {
            console.log(err)
        }

    }



    const addCmt = async (dataInput) => {
        if (userState[0] && targetId && targetTitle) {
            const formData = new FormData();
            formData.append("target_id", targetId);
            formData.append("target_title", targetTitle);
            formData.append("comment_content", dataInput.content);
            formData.append("sticker_url", dataInput.sticker_url ? dataInput.sticker_url : "");
            formData.append("image", dataInput.image);
            formData.append("image", dataInput.image);
            formData.append("parent_id", dataInput.parent_id);
            formData.append("to_users_id", dataInput.to_users_id);

            try {
                const res = await userApi.addCmt(token, formData);
                if (res.content.msg) {
                    const newComment = res.content.comment_info;

                    if (dataInput.parent_id) dispatch(SET_REPLY_COMMENT_FROM_COMMENT_LV00(newComment)) // for reply
                    else setComments(prev => [newComment, ...prev]);

                    setIsAddedCmt(true);
                } else setIsErrorCmt(true);
            } catch (err) {
                console.log(err);
                setIsAddedCmt(true);
            }
        } else {
            message_error("You have to logged in to do this action");
        }
    }


    const deleteCmt = async (id) => {
        if (!userState[0]) return message_error("You have to logged in to do this action");

        const data = { comment_id: id.toString() }

        try {
            const response = await userApi.deleteCmt(token, data);
            if (response.content.err) {
                return { code: false };
            }
            const comment = response.content.comment;

            return {
                code: true,
                cmtDeleted: comment
            };
        } catch (err) {
            console.log(err);
            return false;
        }
    }


    const editCmt = async (editObj) => {
        const formData = new FormData();
        formData.append("comment_id", editObj.cmt_id);
        formData.append("comment_content", editObj.content);
        formData.append("to_users_id", editObj.toUsersId);
        formData.append("image", editObj.image);
        formData.append("sticker_url", "");

        try {
            const response = await userApi.updateCmt(token, formData);
            if (response.content.err) {
                return { code: false };
            }
            const comment = response.content.comment_info;

            return {
                code: true,
                cmtEdited: comment
            };
        } catch (err) {
            console.log(err);
            return { code: false };
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
                targetId={targetId}
                targetTitle={targetTitle}

                comments={comments}
                setComments={setComments}

                getCmts={getCmts}

                isEndCmts={isEndCmts}


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