import React, { useState, useEffect, useRef } from 'react'
import "../CommentContainter/CommentContainter.css"

import { Button, Form, Image, Popover, Tooltip, Upload } from 'antd'
import { CloseOutlined, CameraOutlined, SmileOutlined } from '@ant-design/icons'
import ContentEditable from 'react-contenteditable'

export default function InputForm({ isAddedCmt, setIsAddedCmt, addCmt }) {
    const sticker_collection01 = require("../../../utils/sticker.json").stickers_collection01
    const [stickers, setStickers] = useState(sticker_collection01);

    const [cmtContent, setCmtContent] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const inputRef = useRef(null);

    // render vars
    const [visible, setVisible] = useState(false);


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


    const handleSetContent = (value, type) => {
        if (type === "img") {
            const content = cmtContent + `<img style="border-radius: 50%;" src=${value} alt="" width="40px" height="40px" /> `

            setCmtContent(content);
        } else {
            setCmtContent(value);
        }
    }



    const propsUploadImg = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <Form className="form-input">
            <Form.Item style={{ marginBottom: "10px" }}>
                <div>
                    <ContentEditable
                        innerRef={inputRef}
                        className="input"
                        placeholder="Write a comment..."
                        html={cmtContent}
                        onChange={(e) => handleSetContent(e.target.value, "text")}
                        tagName='div'
                    />

                    <div className="bottom-cont">
                        <div className="image-cont">
                            <Button
                                className="btn-remove-img"
                                icon={<CloseOutlined />}
                            />

                            <Image src={"https://gvn360.com/wp-content/uploads/2021/04/NIERRV1P2_SS_EV_KAINE.0.jpg"} alt="" width="150px" height="100px" style={{ borderRadius: "3px" }} />
                        </div>

                        <div className="addons-cont">
                            <Tooltip title="Attach a photo">
                                <Upload {...propsUploadImg}>
                                    <Button icon={<CameraOutlined />} />
                                </Upload>
                            </Tooltip>

                            <Tooltip title="Insert Sticker and GIF">
                                <Popover
                                    trigger="click"
                                    visible={visible}
                                    onVisibleChange={(e) => setVisible(e)}
                                    content={
                                        stickers?.length
                                            ? <div className="sticker-cont">
                                                {stickers.map((sticker, i) => (
                                                    <div
                                                        key={i}
                                                        style={{ cursor: "pointer", padding: "5px" }}
                                                        title="Insert Sticker and GIF"
                                                        onClick={() => handleSetContent(sticker, "img")}
                                                    >
                                                        <img style={{ borderRadius: "50%" }} src={sticker} alt="" width="40px" height="40px" />
                                                    </div>
                                                ))}
                                            </div>

                                            : ""
                                    }
                                >
                                    <Button icon={<SmileOutlined />} />
                                </Popover>
                            </Tooltip>

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
