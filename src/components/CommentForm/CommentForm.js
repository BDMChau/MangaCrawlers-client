import React, { useState } from 'react'
import "./CommentForm.css"
import { Col, Input, Row, Comment, Avatar, Form, Button, Skeleton } from 'antd';
import SkeletonCustom from '../SkeletonCustom/SkeletonCustom';


const { TextArea } = Input;
const { Item } = Form;

export default function CommentForm() {
    const [isScrollBottom, setIsScrollBottom] = useState(false)

    const handleScroll = (e) => {
        const scrollTop = e.target.scrollTop;
        const clientHeight = e.target.clientHeight;
        const scrollHeight = e.target.scrollHeight;

        if (scrollHeight - (scrollTop + clientHeight) <= 50) {
            setIsScrollBottom(true);
        }
    }


    const CommentItem = ({ children }) => {
        return (
            <Comment
                className="comment-item"
                actions={[<span className="btn-reply" >Reply</span>]}
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
                       <SkeletonCustom paragraphRows={2} />
                       <SkeletonCustom paragraphRows={2} />
                    </div>
                    : ""
                }
            </div>

        </div>
    )
}
