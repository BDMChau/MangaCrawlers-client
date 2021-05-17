import React, { createElement, useState } from 'react'
import "./CommentForm.css"
import { Col, Input, Row, Comment, Avatar, Form, Button, Skeleton } from 'antd';
import SkeletonCustom from '../SkeletonCustom/SkeletonCustom';
import { LikeOutlined, LikeFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';


const { TextArea } = Input;
const { Item } = Form;

export default function CommentForm() {
    const [isScrollBottom, setIsScrollBottom] = useState(false)
    const [likes, setLikes] = useState(0);
    const [action, setAction] = useState("");

    const handleLikeCmt = () => {
        if (action === 'liked') {
            setLikes(likes - 1);
            setAction('dislike');
        } else {
            setLikes(likes + 1);
            setAction('liked');
        }
    };


    const handleScroll = (e) => {
        const scrollTop = e.target.scrollTop;
        const clientHeight = e.target.clientHeight;
        const scrollHeight = e.target.scrollHeight;

        if (scrollHeight - (scrollTop + clientHeight) <= 50) {
            setIsScrollBottom(true);
        }
    }

    const actions = [
        <Tooltip key="btn-like" title={action === 'liked' ? "Dislike" : "Like"}>
            <span
                onClick={() => handleLikeCmt()}
            >
                {action === 'liked' ? <LikeFilled style={{ fontSize: "14px", color: "#1890FF" }} /> : <LikeOutlined style={{ fontSize: "14px" }} />}
                <span className="comment-likes">{likes}</span>
            </span>
        </Tooltip>,
        // <span key="comment-basic-reply-to">Reply to</span>,
    ];


    const CommentItem = ({ children }) => {
        return (
            <Comment
                className="comment-item"
                actions={actions}
                author={<a>Ha Phuong</a>}
                avatar={
                    <Avatar
                        className="cmt-avatar"
                        src="https://scontent.xx.fbcdn.net/v/t1.15752-9/181828860_190655002882277_7218559945996826011_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=58c789&_nc_ohc=L2ZLwEfnu3wAX_9_JdK&_nc_ht=scontent.xx&oh=dd3fa26784cd6f7e44141d03fd9be798&oe=60B90FFE"
                        alt="Han Solo"
                    />
                }
                content={
                    <p>
                        We supply a series of design principles, practical patterns and high quality design
                        resources (Sketch and Axure).
                    </p>
                }
            >
                {children}
            </Comment>
        )
    }

    return (
        <div className="comment-form">
            <Form className="form-input">
                <Form.Item>
                    <TextArea className="input" placeholder="Write a comment..." />
                </Form.Item>
                <Form.Item>
                    <Button className="btn-submit" htmlType="submit" type="primary">
                        Add Comment
                    </Button>
                </Form.Item>
            </Form>
            <div className="text" onScroll={(e) => handleScroll(e)} >
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                {isScrollBottom
                    ? <div className="loading-more" >
                        <SkeletonCustom paragraphRows={2} avatarShape={"circle"} />
                        <SkeletonCustom paragraphRows={2} avatarShape={"circle"} />
                    </div>
                    : ""
                }
            </div>

        </div>
    )
}
