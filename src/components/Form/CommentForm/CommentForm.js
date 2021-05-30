import React, { useEffect, memo, useState } from 'react'
import "./CommentForm.css"
import { Comment, Avatar, Empty, Typography } from 'antd';
import SkeletonCustom from '../../SkeletonCustom/SkeletonCustom';
import TransitionAnimate from '../../Animation/transition';
import { unset } from 'lodash';




function CommentForm({ comments, getCmtsChapter, isEndCmts }) {
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



    const CommentItems = ({ children }) => {
        return (
            comments
                ? comments.map((comment, i) => (
                    <Comment
                        className="comment-item"
                        key={i}
                        author={<a style={{ cursor: "default" }}>{comment.user_name}</a>}
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

                                <div>
                                    <Typography.Text style={{ color: comment.is_error ? "#D7D8DB" : "#848587" }}>
                                        {comment.chaptercmt_time}
                                    </Typography.Text>
                                    <Typography.Text style={{ color: "#FF4D4F", marginLeft: "5px" }}>
                                        {comment.is_error ? "Error, cannot add this comment!" : ""}
                                    </Typography.Text>
                                </div>
                            </div>
                        }
                    >
                        {children}
                    </Comment>
                ))

                : <TransitionAnimate renderPart={
                    <div style={{ height: "unset" }} >
                        <Empty
                            style={{ marginTop: "40px", color: "#8a8d92" }}
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="No comments to present :("
                        />
                    </div>
                } transitionTime={0.3} />
        )
    }

    return (
        <div className="text" onScroll={(e) => handleScroll(e)} >
            <CommentItems />

            {isScrollBottom
                ? <div className="loading-more" >
                    <SkeletonCustom paragraphRows={3} avatarShape={"circle"} />
                </div>
                : ""
            }
        </div>
    )
}

export default memo(CommentForm)