import React, { useEffect, memo, useState } from 'react'
import "./CommentItems.css"
import { NavLink } from 'react-router-dom';

import { Comment, Avatar, Empty, Typography, Tooltip } from 'antd';

import ButtonLike from '../features/ButtonLike';
import SkeletonCustom from '../../SkeletonCustom/SkeletonCustom';
import InteractionForm from '../features/InteractionForm';
import { format } from 'helpers/format';


function CommentItems({ comments, getCmts, isEndCmts, mangaId, deleteCmt }) {
    const [isScrollBottom, setIsScrollBottom] = useState(false)


    useEffect(() => {
        if (isScrollBottom === true) {
            getCmts()

            const timer = setTimeout(() => setIsScrollBottom(false), 700)
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


    const CmtTitle = ({ comment }) => (
        <Typography.Text style={{ cursor: "default", fontSize: "14px", fontWeight: "500" }}>{comment.user_name}</Typography.Text>
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

            <div className="interact">
                <ButtonLike />

                <InteractionForm cmtId={comment.manga_comment_id} deleteCmt={deleteCmt} />
            </div>


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
                                style={{ cursor: "default" }}
                                src={comment.user_avatar}
                                alt="Avatar"
                            />
                        }
                        content={
                            <div className="comment">
                                <CmtBody comment={comment} background={"white"} />

                                <div style={{ padding: comment.comments_level_01?.length ? "5px" : 0 }} className="item" >
                                    {
                                        comment.comments_level_01?.length
                                            ? comment.comments_level_01.map((cmt) => (
                                                <Comment
                                                    className="comment-item01"
                                                    key={cmt.manga_comment_id}
                                                    author={<CmtTitle comment={cmt} />}
                                                    avatar={
                                                        <Avatar
                                                            className="cmt-avatar"
                                                            style={{ cursor: "default" }}
                                                            src={cmt.user_avatar}
                                                            alt="Avatar"
                                                        />
                                                    }
                                                    content={
                                                        <div className="cmt-children">
                                                            <CmtBody comment={cmt} background={"grey"} />

                                                            <div style={{ padding: cmt.comments_level_02?.length ? "5px" : 0 }} >
                                                                {
                                                                    cmt.comments_level_02?.length
                                                                        ? cmt.comments_level_02.map((cmt02) => (
                                                                            <Comment
                                                                                className="comment-item02"
                                                                                key={cmt02.manga_comment_id}
                                                                                author={<CmtTitle comment={cmt02} />}
                                                                                avatar={
                                                                                    <Avatar
                                                                                        className="cmt-avatar"
                                                                                        style={{ cursor: "default" }}
                                                                                        src={cmt02.user_avatar}
                                                                                        alt="Avatar"
                                                                                    />
                                                                                }
                                                                                content={
                                                                                    <div className="cmt-children02">
                                                                                        <CmtBody comment={cmt02} background={"white"} />
                                                                                    </div>
                                                                                }
                                                                            ></Comment>
                                                                        ))
                                                                        : ""
                                                                }
                                                            </div>
                                                        </div>
                                                    }
                                                ></Comment>
                                            ))
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
                    <SkeletonCustom paragraphRows={3} avatarShape={"circle"} />
                </div>
                : ""
            }
        </div>
    )
}

export default memo(CommentItems)