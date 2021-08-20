import React, { useState, useEffect } from 'react';
import "./CommentInput.css";

import CommentItems from '../CommentItems/CommentItems';

import { Button, Col, Form, Input } from 'antd'

const { TextArea } = Input;


export default function CommentInput({
    addCmt,
    setIsAddedCmt,
    isAddedCmt,
    isAdding,
    isEndCmts,

    comments
}) {
    const [cmtContent, setCmtContent] = useState("");


    useEffect(() => {
        if (isAddedCmt === true) {
            setCmtContent("");
            setIsAddedCmt(false)
        }
    }, [isAddedCmt])

    const handleInput = (val) => {

        setCmtContent(val);
    }


    return (
        <Col span={22} xxl={14} className="comments-form">
            <Form className="form-input">
                <Form.Item>
                    <TextArea
                        className="input"
                        type="text"
                        placeholder="Write a comment..."
                        value={cmtContent}
                        onChange={(e) => handleInput(e.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button className="btn-submit" type="primary" loading={isAdding} onClick={() => addCmt(cmtContent)}>
                        Add Comment
                    </Button>
                </Form.Item>
            </Form>

            <CommentItems
                comments={comments}
                getCmtsChapter={() => getCmtsChapter()}
                isEndCmts={isEndCmts}
            />
        </Col>
    )
}
