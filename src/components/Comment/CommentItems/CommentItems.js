import React, { useEffect, memo, useState } from 'react'
import "./CommentItems.css"
import { NavLink } from 'react-router-dom';

import { Comment, Avatar, Empty, Typography, Tooltip } from 'antd';

import ButtonLike from '../features/ButtonLike';
import SkeletonCustom from '../../SkeletonCustom/SkeletonCustom';
import Reply from '../features/Reply';


function CommentItems({ comments, getCmtsChapter, isEndCmts, mangaId }) {
    const [isScrollBottom, setIsScrollBottom] = useState(false)


    useEffect(() => {
        if (isScrollBottom === true) {
            getCmtsChapter()

            const timer = setTimeout(() => setIsScrollBottom(false), 700)
            return () => clearTimeout(timer);
        }
    }, [isScrollBottom])

    useEffect(() => {
        console.log(comments)
    }, [])


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


    const renderCmtBottom = (comment) => (
        <div className="cmt-bottom">
            <div className="interact">
                <ButtonLike />
                <Reply />
            </div>
            <Typography.Text style={{ color: comment.is_error ? "#D7D8DB" : "#848587" }}>
                {comment.chaptercmt_time}
            </Typography.Text>

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

    const renderCmtBody = (comment) => (
        <div key={comment.manga_comment_id}>
            <Typography.Text style={{ color: comment.is_error ? "#D7D8DB" : "black", fontSize: "16px" }} >
                {comment.manga_comment_content}
            </Typography.Text>

            {renderCmtBottom(comment)}

            <Typography.Text style={{ color: "#FF4D4F" }}>
                {comment.is_error ? "Error, cannot add this comment!" : ""}
            </Typography.Text>
        </div>
    )

    const Items = ({ children }) => {
        return (
            comments.length
                ? comments.map((comment, i) => (
                    <Comment
                        className="comment-item"
                        key={i}
                        author={<Typography.Text style={{ cursor: "default" }}>{comment.user_name}</Typography.Text>}
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
                                {renderCmtBody(comment)}

                                <div style={{ padding: comment.comments_level_01?.length ? "5px" : 0 }} >
                                    {
                                        comment.comments_level_01?.length
                                            ? comment.comments_level_01.map((cmt) => (
                                                <Comment
                                                    className="comment-item"
                                                    key={i}
                                                    author={<Typography.Text style={{ cursor: "default" }}>{cmt.user_name}</Typography.Text>}
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
                                                            {renderCmtBody(cmt)}

                                                            <div style={{ padding: cmt.comments_level02?.length ? "5px" : 0 }}>
                                                                {
                                                                    cmt.comments_level02?.length
                                                                        ? cmt.comments_level02.map((cmt02) => (
                                                                            <Comment
                                                                                className="comment-item"
                                                                                key={i}
                                                                                author={<Typography.Text style={{ cursor: "default" }}>{cmt02.user_name}</Typography.Text>}
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
                                                                                        {renderCmtBody(cmt02)}
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