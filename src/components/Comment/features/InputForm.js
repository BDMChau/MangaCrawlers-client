import React, { useState, useEffect, useRef } from 'react'
import "../CommentContainter/CommentContainter.css"

import { Button, Form, Image, Popover, Tooltip, Upload } from 'antd'
import { CloseOutlined, CameraOutlined, SmileOutlined } from '@ant-design/icons'
import ContentEditable from 'react-contenteditable'
import { message_error } from 'components/notifications/message'
import handleFile from 'helpers/handleFile'



const fileTypesAllowed = [
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/png",
]


export default function InputForm({ isAddedCmt, setIsAddedCmt, addCmt }) {
    const sticker_collection01 = require("../../../utils/sticker.json").stickers_collection01
    const [stickers, setStickers] = useState(sticker_collection01);

    const [cmtContent, setCmtContent] = useState('');
    const [img, setImg] = useState('');
    const [imgDemo, setImgDemo] = useState("")
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
        setIsAdding(true);
        await addCmt(cmtContent, img);
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


    const onChangeFile = (info) => {
        console.log("file to upload: ", info)
        setImg(info.file)

        handleFile.getBase64Img(info.file.originFileObj, (file) => {
            setImgDemo(file)
        });
    }

    const propsUploadImg = {
        name: 'file',
        headers: {
            authorization: 'authorization-text',
        },
        beforeUpload: file => {
            if (!fileTypesAllowed.includes(file.type)) {
                message_error(`Please select png, jpg, jpeg, GIF only!`);
            }
            return fileTypesAllowed.includes(file.type) ? true : Upload.LIST_IGNORE;
        },
        onChange: (info) => onChangeFile(info)
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
                        <div className="interaction-cont">
                            {img
                                ? <>
                                    <Button
                                        className="btn-remove-img"
                                        icon={<CloseOutlined />}
                                        onClick={() => { setImg(""); setImgDemo(""); }}
                                    />

                                    <Image src={imgDemo} alt="" style={{ borderRadius: "3px", width: "fit-content", height: "110px" }} />
                                </>
                                : ""

                            }

                            <Button
                                className="btn-submit"
                                style={{ marginTop: "10px", width: "fit-content" }}
                                type="primary"
                                loading={isAdding}
                                onClick={() => handleAddCmt()}
                            >
                                Add Comment
                            </Button>
                        </div>

                        <div className="addons-cont">
                            <Tooltip title={img ? "Just a photo" : "Attach a photo"}>
                                <Upload
                                    showUploadList={false}
                                    {...propsUploadImg}
                                >
                                    <Button icon={<CameraOutlined />} disabled={img ? true : false} />
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
        </Form>
    )
}
