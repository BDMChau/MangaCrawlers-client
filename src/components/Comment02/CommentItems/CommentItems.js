import React, { useEffect, memo, useState } from 'react'
import "./CommentItems.css"
import { NavLink, useHistory } from 'react-router-dom';

import { Comment, Avatar, Empty, Typography, Tooltip, Button } from 'antd';
import { CaretDownOutlined } from "@ant-design/icons";
import ButtonLike from '../../Comment/features/ButtonLike';
import SkeletonCustom from '../../SkeletonCustom/SkeletonCustom';
import InteractionForm from '../../Comment/features/InteractionForm';
import { format } from 'helpers/format';
import { useSelector } from 'react-redux';
import redirectURI from 'helpers/redirectURI';
import mangaApi from 'api/apis/MainServer/mangaApi';
import CmtBody from './components/CmtBody';


function CommentItems({
    comments,
    setComments,

    getCmts,

    isEndCmts,

    mangaId,

    deleteCmt,

    addCmt,
    isAddedCmt,
    setIsAddedCmt,

    editCmt
}) {
    const userState = useSelector((state) => state.userState);

    const [isEndCmtsChildId, setIsEndCmtsChildId] = useState([]);
    const [count, setCount] = useState(0);

    const [isScrollBottom, setIsScrollBottom] = useState(false)

    const history = useHistory();

    useEffect(() => {
        if (isScrollBottom === true) {
            getCmts();

            const timer = setTimeout(() => setIsScrollBottom(false), 300)
            return () => clearTimeout(timer);
        }
    }, [isScrollBottom])


    const handleScroll = (e) => {
        const scrollTop = e.target.scrollTop;
        const clientHeight = e.target.clientHeight;
        const scrollHeight = e.target.scrollHeight;

        if (isEndCmts === false) {
            if (scrollHeight - (scrollTop + clientHeight) <= 50) {
                setIsScrollBottom(true);
            }
        }
    }



    ////////////////////////////// components //////////////////////////////
    const CmtTitle = ({ comment }) => (
        <NavLink to={redirectURI.userPage_uri(comment.user_id)} >
            <Typography.Text
                style={{ cursor: "pointer", fontSize: "14px", fontWeight: "500" }}
            >
                {comment.user_name}
            </Typography.Text>
        </NavLink>
    )



    ////////////////////////////// handle children //////////////////////////////
    const BtnSeeMore = ({ comment }) => {
        const [fromRowsChild, setFromRowsChild] = useState(2);
        const [cmtsChildren, setCmtsChildren] = useState([]);
        const [isEnd, setIsEnd] = useState(false);
        const [isAddedCmt, setIsAddedCmt] = useState(false);

        const getCmtChildren = async () => {
            if (isEndCmtsChildId.includes(comment.parent_id)) return;

            const data = {
                manga_comment_id: comment.parent_id,
                from: fromRowsChild,
                amount: 4,
                level: comment.level,
                comments: comments
            }


            try {
                const response = await mangaApi.getCommentsChild(data);
                const commentsRes = response.content.comments ? response.content.comments : [];
                const nextFromRow = response.content.from;

                if (response.content.is_end) setIsEnd(true);


                setFromRowsChild(nextFromRow);
                setTimeout(() => setCmtsChildren(commentsRes), 200)
            } catch (ex) {
                console.log(ex)
            }
        };

        const addCmt = async (dataInput) => {
            if (userState[0]) {
                const formData = new FormData();
                // formData.append("manga_id", mangaId ? mangaId.toString() : "");
                // formData.append("post_id", postId ? postId.toString() : "");
                // formData.append("chapter_id", "");
                if (postId) {
                    formData.append("target_title", "post");
                    formData.append("target_id", postId.toString());
                } else if (mangaId) {
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
                    return;
                }
                // lấy ra id cmt vừa xóa, filter
                return;
            } catch (err) {
                notification_error("Failed :(")
                console.log(err);
                return;
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

                setTimeout(() => setCmtsChildren(restCmts), 200)
            } catch (err) {
                notification_error("Failed :(")
                console.log(err)
            }
        }


        return (
            <div className="children-cmts">
                {isEnd
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
                        View replies
                    </Button>
                }

                <CmtChildren
                    comments={cmtsChildren}

                    addCmt={addCmt}
                    deleteCmt={deleteCmt}
                    editCmt={editCmt}
                />
            </div>
        )
    }


    const CmtChildren = ({ comments, addCmt, deleteCmt, editCmt }) => {
        return (
            comments.map((cmt, i) => (
                <Comment
                    className="comment-item"
                    key={i}
                    author={<CmtTitle comment={cmt} />}
                    avatar={
                        <NavLink to={redirectURI.userPage_uri(cmt.user_id)}>
                            <Avatar
                                className="cmt-avatar"
                                title={cmt.user_name}
                                style={{ cursor: "pointer" }}
                                src={cmt.user_avatar}
                                alt="Avatar"
                            />
                        </NavLink>
                    }
                    content={
                        <div className="comment">
                            <CmtBody
                                comment={cmt}
                                background={"white"}

                                deleteCmt={deleteCmt}
                                editCmt={editCmt}

                                addCmt={(dataInput) => addCmt(dataInput)}
                                isAddedCmt={isAddedCmt}
                                setIsAddedCmt={setIsAddedCmt}
                            />
                        </div>
                    }
                >
                    {/* {children} */}
                </Comment>
            ))
        );
    }
    ////////////////////////////// handle children //////////////////////////////



    return (
        <div className="comment-items" onScroll={(e) => handleScroll(e)} >
            {comments.length
                ? comments.map((cmt, i) => (
                    <Comment
                        className="comment-item"
                        key={i}
                        author={<CmtTitle comment={cmt} />}
                        avatar={
                            <NavLink to={redirectURI.userPage_uri(cmt.user_id)}>
                                <Avatar
                                    className="cmt-avatar"
                                    title={cmt.user_name}
                                    style={{ cursor: "pointer" }}
                                    src={cmt.user_avatar}
                                    alt="Avatar"
                                />
                            </NavLink>
                        }
                        content={
                            <div className="comment">
                                <CmtBody
                                    comment={cmt}
                                    background={"white"}

                                    deleteCmt={deleteCmt}
                                    editCmt={editCmt}

                                    addCmt={(dataInput) => addCmt(dataInput)}
                                    isAddedCmt={isAddedCmt}
                                    setIsAddedCmt={setIsAddedCmt}
                                />

                                <BtnSeeMore comment={cmt} />
                            </div>
                        }
                    >
                        {/* {children} */}
                    </Comment>
                ))

                : <div style={{ height: "unset" }} >
                    <Empty
                        style={{ marginTop: "40px", color: "#8a8d92" }}
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="No comments to present :("
                    />
                </div>}

            {isScrollBottom
                ? <div className="loading-more" >
                    <SkeletonCustom paragraphRows={4} avatarShape={"circle"} />
                </div>
                : ""
            }
        </div>
    )
}

export default memo(CommentItems)