import React, { useState, useEffect, useRef } from 'react'
import "../CommentContainter/CommentContainter.css"

import { Button, Form, Image } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import ContentEditable from 'react-contenteditable'

export default function InputForm({ isAddedCmt, setIsAddedCmt, addCmt }) {
    const [cmtContent, setCmtContent] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const inputRef = useRef(null);


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
            <Form.Item style={{ marginBottom: "10px" }}>
                <div>
                    <ContentEditable
                        innerRef={inputRef}
                        className="input"
                        placeholder="Write a comment..."
                        html={cmtContent}
                        onChange={(e) => setCmtContent(e.target.value)}
                        tagName='div'
                    />

                    <div className="bottom-cont">
                        <div className="image-cont">
                            <Button
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius:"50%",
                                    background:"transparent",
                                    position: "absolute",
                                    zIndex:"9",
                                    color:"white",
                                    border:"none"
                                }}
                                icon={<CloseOutlined />}
                            />

                            <Image src={"https://gvn360.com/wp-content/uploads/2021/04/NIERRV1P2_SS_EV_KAINE.0.jpg"} alt="" width="150px" height="100px" style={{ borderRadius: "3px" }} />
                        </div>

                        <div className="addons-cont">

                        </div>
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
