import React, { useEffect, memo, useState } from 'react'
import "./CommentItems.css"
import { NavLink } from 'react-router-dom';

import { Comment, Avatar, Empty, Typography, Tooltip } from 'antd';

import ButtonLike from './ButtonLike';
import SkeletonCustom from '../SkeletonCustom/SkeletonCustom';


function CommentItems({ comments, getCmtsChapter, isEndCmts, mangaId }) {
    const [isScrollBottom, setIsScrollBottom] = useState(false)


    useEffect(() => {
        if (isScrollBottom === true) {
            getCmtsChapter()

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
                                style={{ cursor: "default" }}
                                src={comment.user_avatar}
                                alt="Avatar"
                            />
                        }
                        content={
                            <div className="comment" key={i}>
                                <Typography.Text style={{ color: comment.is_error ? "#D7D8DB" : "black", fontSize: "16px" }} >
                                    {comment.chaptercmt_content}
                                </Typography.Text>

                                <div className="cmt-bottom">
                                    <div className="interact">
                                        <ButtonLike />
                                        <Typography.Text className="reply">
                                            Reply
                                        </Typography.Text>
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

                                <Typography.Text style={{ color: "#FF4D4F" }}>
                                    {comment.is_error ? "Error, cannot add this comment!" : ""}
                                </Typography.Text>
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
        <div className="text" onScroll={(e) => handleScroll(e)} >
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