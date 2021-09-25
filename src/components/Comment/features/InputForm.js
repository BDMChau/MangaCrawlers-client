import React, { useState, useEffect } from 'react'
import "../CommentItems/CommentItems.css"

import { Button, Col, Form, Input } from 'antd'
import ContentEditable from 'react-contenteditable'

const { TextArea } = Input;

export default function InputForm({ isAddedCmt, setIsAddedCmt, addCmt }) {
    const [cmtContent, setCmtContent] = useState("");
    const [isAdding, setIsAdding] = useState(false);


    useEffect(() => {
        if (isAddedCmt === true) {
            setCmtContent("");
            setIsAddedCmt(false)
        }
    }, [isAddedCmt])


    const handleAddCmt = async () => {
        if (!cmtContent) {
            return;
        }

        setIsAdding(true);
        await addCmt(cmtContent);
        setIsAdding(false);
    }


    return (
        <Form className="form-input">
            <Form.Item>
                <div>
                    <TextArea
                        className="input"
                        type="text"
                        placeholder="Write a comment..."
                        value={cmtContent}
                        onChange={(e) => setCmtContent(e.target.value)}
                    />

                    <div className="bottom-container">

                    </div>
                </div>
            </Form.Item>

            <Form.Item>
                <Button className="btn-submit" type="primary" loading={isAdding} onClick={() => handleAddCmt()}>
                    Add Comment
                </Button>
            </Form.Item>
        </Form>
    )
}
