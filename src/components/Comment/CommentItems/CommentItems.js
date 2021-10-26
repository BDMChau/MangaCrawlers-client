import React, { useEffect, memo, useState } from 'react'
import "./CommentItems.css"
import { NavLink, useHistory } from 'react-router-dom';

import { Comment, Avatar, Empty, Typography, Tooltip, Button } from 'antd';

import ButtonLike from '../features/ButtonLike';
import SkeletonCustom from '../../SkeletonCustom/SkeletonCustom';
import InteractionForm from '../features/InteractionForm';
import { format } from 'helpers/format';
import { useSelector } from 'react-redux';
import redirectURI from 'helpers/redirectURI';
import mangaApi from 'api/apis/MainServer/mangaApi';


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

            const timer = setTimeout(() => setIsScrollBottom(false), 600)
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
        <Typography.Text
            style={{ cursor: "pointer", fontSize: "14px", fontWeight: "500" }}
            onClick={() => history.push(redirectURI.userPage_uri(comment.user_id))}
        >
            {comment.user_name}
        </Typography.Text>
    )



    const CmtBody = ({ comment, background }) => (
        <div className="cmt-body" key={comment.manga_comment_id} style={{ background: background }} >
            <div style={{ fontSize: "16px" }} dangerouslySetInnerHTML={{ __html: comment.manga_comment_content }} />
            {comment.image_url ? <img src={comment.image_url} alt="" style={{ height: "110px", width: "fit-content", borderRadius: "8px", marginTop: "5px" }} /> : ""}

            <CmtBottom comment={comment} />

            <Typography.Text style={{ color: "#FF4D4F" }}>
                {comment.is_error ? "Error, cannot add this comment!" : ""}
            </Typography.Text>
        </div>
    )


    const CmtBottom = ({ comment }) => (
        <div className="cmt-bottom">
            <Typography.Text style={{ color: comment.is_error ? "#D7D8DB" : "#848587" }}>
                {format.formatDate02(comment.manga_comment_time)}
            </Typography.Text>

            {userState[0]
                ? <div className="interact">
                    <InteractionForm
                        comment={comment}
                        cmtId={comment.manga_comment_id}

                        deleteCmt={deleteCmt}

                        addCmt={(dataInput) => addCmt(dataInput)}
                        isAddedCmt={isAddedCmt}
                        setIsAddedCmt={setIsAddedCmt}

                        editCmt={editCmt}
                    />
                </div>
                : ""
            }


            <NavLink to={mangaId ? `/chapter/${mangaId}/${comment.chapter_id}` : "#"}>
                <Tooltip title={comment.chapter_name}>
                    <Typography.Text
                        className="chapter-name"
                        style={{
                            color: comment.is_error ? "#D7D8DB" : "#848587",
                        }}
                    >
                        {comment.chapter_name}
                    </Typography.Text>
                </Tooltip>
            </NavLink>
        </div>
    )


    const BtnSeeMore = ({ comment, setComments, setIsEndCmtsChildId }) => {
        // child cmts
        const [fromRowsChild, setFromRowsChild] = useState(2);

        const getCmtsChildBtnSeeMore = async () => {
            // if(isEndCmtsChild) return;

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

                if (response.content.is_end) {
                    setIsEndCmtsChildId(prev => [...prev, comment.parent_id]);
                }

                if (isEndCmtsChildId.includes(comment.parent_id)) {
                    console.log("okokokok")
                    return;
                }


                setFromRowsChild(nextFromRow);
                setTimeout(() => setComments(commentsRes), 200)
            } catch (ex) {
                console.log(ex)
            }

        }

        return (
            <Button
                type="text"
                style={{
                    padding: "2px",
                    marginLeft: "10px",
                    borderRadius: "10px",
                    fontSize: "13px",
                    fontWeight: 500
                }}
                onClick={() => getCmtsChildBtnSeeMore()}
            >
                See more
            </Button>
        )
    }



    const Items = ({ children }) => {
        return (
            comments.length
                ? comments.map((comment) => (
                    <Comment
                        className="comment-item"
                        key={comment.manga_comment_id}
                        author={<CmtTitle comment={comment} />}
                        avatar={
                            <Avatar
                                className="cmt-avatar"
                                title={comment.user_name}
                                style={{ cursor: "pointer" }}
                                src={comment.user_avatar}
                                alt="Avatar"
                                onClick={() => history.push(redirectURI.userPage_uri(comment.user_id))}
                            />
                        }
                        content={
                            <div className="comment">
                                <CmtBody comment={comment} background={"white"} />

                                <div style={{ padding: comment.comments_level_01?.length ? "5px" : 0 }} className="item" >
                                    {
                                        comment.comments_level_01?.length
                                            ? <div>
                                                {comment.comments_level_01.map((cmt01) => (
                                                    <Comment
                                                        className="comment-item01"
                                                        key={cmt01.manga_comment_id}
                                                        author={<CmtTitle comment={cmt01} />}
                                                        avatar={
                                                            <Avatar
                                                                className="cmt-avatar"
                                                                style={{ cursor: "pointer" }}
                                                                src={cmt01.user_avatar}
                                                                alt="Avatar"
                                                                onClick={() => history.push(redirectURI.userPage_uri(cmt01.user_id))}
                                                            />
                                                        }
                                                        content={
                                                            <div className="cmt-children">
                                                                <CmtBody comment={cmt01} background={"#e4edf3"} />

                                                                <div style={{ padding: cmt01.comments_level_02?.length ? "5px" : 0 }} >
                                                                    {
                                                                        cmt01.comments_level_02?.length
                                                                            ? <div>
                                                                                {cmt01.comments_level_02.map((cmt02) => (
                                                                                    <Comment
                                                                                        className="comment-item02"
                                                                                        key={cmt02.manga_comment_id}
                                                                                        author={<CmtTitle comment={cmt02} />}
                                                                                        avatar={
                                                                                            <Avatar
                                                                                                className="cmt-avatar"
                                                                                                style={{ cursor: "pointer" }}
                                                                                                src={cmt02.user_avatar}
                                                                                                alt="Avatar"
                                                                                                onClick={() => history.push(redirectURI.userPage_uri(cmt02.user_id))}
                                                                                            />
                                                                                        }
                                                                                        content={
                                                                                            <div className="cmt-children02">
                                                                                                <CmtBody comment={cmt02} background={"white"} />
                                                                                            </div>
                                                                                        }
                                                                                    ></Comment>
                                                                                ))}

                                                                                <BtnSeeMore comment={cmt01} setComments={setComments} setIsEndCmtsChildId={setIsEndCmtsChildId} />
                                                                            </div>
                                                                            : ""
                                                                    }
                                                                </div>
                                                            </div>
                                                        }
                                                    ></Comment>
                                                ))}

                                                <BtnSeeMore comment={comment} setComments={setComments} setIsEndCmtsChildId={setIsEndCmtsChildId} />
                                            </div>
                                            : ""
                                    }

                                </div>
                            </div>
                        }
                    >
                        {children}
                    </Comment>
                ))

                : <div style={{ height: "unset" }} >
                    <Empty
                        style={{ marginTop: "40px", color: "#8a8d92" }}
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="No comments to present :("
                    />
                </div>
        )
    }

    return (
        <div className="comment-items" onScroll={(e) => handleScroll(e)} >
            <Items />

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