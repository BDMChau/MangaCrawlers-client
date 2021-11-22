import React, { useState, useEffect, memo } from 'react';

import { Button } from 'antd';
import { CaretDownOutlined } from "@ant-design/icons";

import mangaApi from 'api/apis/MainServer/mangaApi';
import ChildCmts from './ChildCmts';
import userApi from 'api/apis/MainServer/userApi';
import { message_error } from 'components/toast/message';
import { useDispatch, useSelector } from 'react-redux';
import { SET_REPLY_COMMENT_FROM_COMMENT_LV00 } from "store/features/stuffs/StuffsSlice"

import Cookies from 'universal-cookie';
import { notification_error, notification_success } from 'components/toast/notification';
import { socketService } from 'socket/sockerService';


function BtnSeeMore({ comment, setCmtParent, targetId, targetTitle, isChild }) {
    const userState = useSelector((state) => state.userState);
    const stuffsState = useSelector((state) => state.stuffsState); // stuffsState[3] is the comment when reply on comment lv00
    const dispatch = useDispatch();

    const [cmt, setCmt] = useState({});

    const [fromRowsChild, setFromRowsChild] = useState(0);
    const [cmtsChildren, setCmtsChildren] = useState([]);
    const [isEnd, setIsEnd] = useState(false);
    const [isAddedCmt, setIsAddedCmt] = useState(false);

    const [isFiltering, setIsFiltering] = useState(false);

    const cookies = new Cookies();
    const token = cookies.get("token");

    // useEffect(() => {
    //     setCmt(comment);
    // }, [comment])


    useEffect(() => {
        if (stuffsState[3]) {
            const newComment = stuffsState[3];

            if (comment.comment_id === newComment.parent_id) {
                setCmtsChildren(prev => [...prev, newComment]);

                setCmtParent({ ...comment, count_comments_child: comment.count_comments_child + 1 })
                dispatch(SET_REPLY_COMMENT_FROM_COMMENT_LV00(null));
            }
        }
    }, [stuffsState])


    // remove duplicate items
    useEffect(() => {
        if (isFiltering && cmtsChildren.length) {
            const ids = cmtsChildren.map(cmt => cmt.comment_id);
            const filtered = cmtsChildren.filter(({ comment_id }, index) => !ids.includes(comment_id, index + 1));

            setCmtsChildren(filtered);
            setIsFiltering(false);
        }
    }, [isFiltering, cmtsChildren])



    const getCmtChildren = async () => {
        const data = {
            comment_id: comment.comment_id,
            from: fromRowsChild,
            amount: 15,
            user_id: userState[0] ? userState[0].user_id : ""
        }


        try {
            const response = await userApi.getCommentsChild(data);
            const commentsRes = response.content.comments_child ? response.content.comments_child : [];
            const from = response.content.from;

            if (response.content.is_end) setIsEnd(true)


            setFromRowsChild(from);
            setCmtsChildren(prev => [...prev, ...commentsRes]);
            setIsFiltering(true);
        } catch (ex) {
            console.log(ex)
        }
    };

    const addCmt = async (dataInput) => {
        if (userState[0] && targetId && targetTitle) {
            const formData = new FormData();
            formData.append("target_id", targetId);
            formData.append("target_title", targetTitle);
            formData.append("comment_content", dataInput.content);
            formData.append("sticker_url", dataInput.sticker_url ? dataInput.sticker_url : "");
            formData.append("image", dataInput.image);
            formData.append("parent_id", dataInput.parent_id);
            formData.append("to_users_id", dataInput.to_users_id);

            try {
                const res = await userApi.addCmt(token, formData);
                if (res.content.msg) {
                    const newComment = res.content.comment_info;

                    setCmtsChildren(prev => [...prev, newComment]);

                    if (dataInput.to_users_id.length) socketService.notifyTaggedUsers(userState[0], dataInput.to_users_id, targetTitle, newComment.comment_id);
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

            // just want to update cmtsChildren in this comp, not copy (child-comp will be re-render)
            // let copy =  cmtsChildren.map(cmt => ({ ...cmt }));
            const index = cmtsChildren.findIndex(cmt => cmt.comment_id === comment.comment_id);
            cmtsChildren.splice(index, 1);

            setCmtsChildren(cmtsChildren);
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

            let copy = cmtsChildren;
            let index;
            if (Object.keys(comment).length) {
                index = copy.findIndex(cmt => cmt.comment_id === comment.comment_id);
                copy[index] = comment;
            } else {
                index = copy.findIndex(cmt => cmt.comment_id === editObj.cmt_id);
                copy[index] = {};
            }

            setCmtsChildren(copy);

            if (editObj.toUsersId.length) socketService.notifyTaggedUsers(userState[0], editObj.toUsersId, targetTitle, comment.comment_id);
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
        <div className="btn-more-cont">
            <ChildCmts
                comments={cmtsChildren}
                cmtId={comment.comment_id}

                addCmt={addCmt}
                deleteCmt={deleteCmt}
                editCmt={editCmt}

                isAddedCmt={isAddedCmt}
                setIsAddedCmt={setIsAddedCmt}
            />

            {isEnd || isChild || !comment.count_comments_child
                ? ""
                : <Button
                    type="text"
                    style={{
                        padding: "2px",
                        margin: "3px 0 0 0",
                        borderRadius: "10px",
                        fontSize: "13px",
                        color: "#40A9FF",
                        fontWeight: 500
                    }}
                    onClick={() => getCmtChildren()}
                >
                    <CaretDownOutlined style={{ fontSize: "13px" }} />

                    {comment.count_comments_child > 1
                        ? `View ${comment.count_comments_child - cmtsChildren.length} replies`
                        : "View reply"
                    }
                </Button>
            }

        </div>

    )
}

export default memo(BtnSeeMore);