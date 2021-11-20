import React, { useState, useEffect, memo, useCallback } from 'react';
import "./CommentService.css";

import InputForm from '../CommentItems/components/features/InputForm';
import userApi from 'api/apis/MainServer/userApi';
import { notification_error, notification_success } from 'components/toast/notification';
import { message_error } from 'components/toast/message';
import { useDispatch, useSelector } from 'react-redux';
import { SET_REPLY_COMMENT_FROM_COMMENT_LV00 } from "store/features/stuffs/StuffsSlice"
import Cookies from 'universal-cookie';
import { Typography } from 'antd';
import TransitionAnimate from 'components/Animation/transition';
import forumApi from 'api/apis/MainServer/forumApi';
import { filter } from 'lodash';
import CommentUI from '../CommentItems/CommentUI';
import { socketActions } from 'socket/socketClient';
import { socketService } from 'socket/sockerService';


// targetTitle can be "post" or "manga"
function CommentService({ targetTitle, targetId }) {
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
                getCmts()
            }
        }

    }, [targetId, targetTitle, fromRow, userState])


    const getCmts = async () => {
        if (isEndCmts) return;

        const data = {
            target_title: targetTitle,
            target_id: targetId,
            from: fromRow,
            amount: 10,
            user_id: ""
        }

        try {
            let res = await userApi.getCommentsManga(data);
            if (res.content.err) return;

            const comments = res.content.comments;
            if (comments.length < 10) setIsEndCmts(true);

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

                    if(dataInput.to_users_id.length) socketService.notifyTaggedUsers(userState[0], dataInput.to_users_id, targetTitle, newComment.comment_id);
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

                // just want to update comments in this comp, not copy (child-comp will be re-render)
                // let copy = comments.map(cmt => ({ ...cmt }));
                const index = comments.findIndex(cmt => cmt.comment_id === comment.comment_id);
                comments.splice(index, 1);

                setComments(comments);
                return {
                    code: true,
                    cmtDeleted: comment
                };
            } catch (err) {
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
            const comment = response.content.comment_info ? response.content.comment_info : {};

            let copy = comments;
            let index;
            if(Object.keys(comment).length){
                index = copy.findIndex(cmt => cmt.comment_id === comment.comment_id);
                copy[index] = comment;
            } else {
                index = copy.findIndex(cmt => cmt.comment_id === editObj.cmt_id);
                copy[index] = {};
            }

            setComments(copy);

            if(dataInput.to_users_id.length) socketService.notifyTaggedUsers(userState[0], dataInput.to_users_id, targetTitle, comment.comment_id);
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
            <CommentUI
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

export default memo(CommentService);