import React, { useState, useEffect } from 'react';
import "./CommentContainter.css";

import CommentItems from '../CommentItems/CommentItems';

import { Button, Col, Form, Input } from 'antd'

const { TextArea } = Input;


export default function CommentContainter({
    mangaId,

    addCmt,
    setIsAddedCmt,
    isAddedCmt,
    isAdding,
    isEndCmts,

    getCmtsChapter,
    // comments
}) {
    const [cmtContent, setCmtContent] = useState("");
    const [comments, setComments] = useState([
        {
            manga: "...",
            content: "cmt 01",
            children: [
                {
                    content: " cmt child 011_0111",
                    children: [
                        {
                            content: " cmt child 011_0111_01111111",
                        },
                        {
                            content: " cmt child 011_0111_02222222",
                        },
                    ]
                },

                {
                    content: " cmt child 011_0222"
                },
            ]
        },
        {
            manga: "...",
            content: "cmt 02",
            children: [
                {
                    content: " cmt child 022_0111"
                },

                {
                    content: " cmt child 022_0222",
                    children: [
                        {
                            content: " cmt child 022_0222_01111111",
                        },
                        {
                            content: " cmt child 022_0222_02222222",
                        },
                    ]
                },
            ]
        },
        {
            manga: "...",
            content: "cmt 04",
            children: []
        },
        {
            manga: "...",
            content: "cmt 03",
            children: [
                {
                    content: " cmt child 033_0111"
                },

                {
                    content: " cmt child 033_0222"
                },
                {
                    content: " cmt child 033_0333"
                },
                {
                    content: " cmt child 033_0444"
                },
            ]
        },
    ])


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
        <div className="comments-form">
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

            {/* render cmts */}
            <CommentItems
                comments={comments}
                getCmtsChapter={() => getCmtsChapter()}
                isEndCmts={isEndCmts}

                mangaId={mangaId}
            />
        </div>
    )
}
