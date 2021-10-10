import React, { useState, useEffect, useRef } from 'react'
import "../CommentContainter/CommentContainter.css"

import { Avatar, Button, Form, Image, Popover, Tooltip, Upload } from 'antd'
import { CloseOutlined, CameraOutlined, SmileOutlined } from '@ant-design/icons'
import { message_error } from 'components/alerts/message'
import handleFile from 'helpers/handleFile'
import { debounce } from 'lodash'
import userApi from 'api/apis/MainServer/userApi'
import MyTextArea from 'components/Editor/MyTextArea'



const fileTypesAllowed = [
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/png",
]



export default function InputForm({ token, isAddedCmt, setIsAddedCmt, addCmt, parentId }) {
    const sticker_collection01 = require("utils/sticker.json").stickers_collection01
    const [stickers, setStickers] = useState(sticker_collection01);
    const [sticker, setSticker] = useState("");


    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    const [usersSearchResult, setUsersSearchResult] = useState([]);
    const [toUsersId, setToUsersId] = useState([]);

    const [textToReplace, setTextToReplace] = useState("");

    const [cmtContent, setCmtContent] = useState("");
    const [img, setImg] = useState("");
    const [imgDemo, setImgDemo] = useState("")
    const [isAdding, setIsAdding] = useState(false);

    const inputRef = useRef(null);

    // render vars
    const [visible, setVisible] = useState(false);
    const [visiblePopoverUsers, setVisiblePopoverUsers] = useState(false);


    useEffect(() => {
        if (isAddedCmt === true) {
            setCmtContent("");
            setIsAddedCmt(false)
        }
    }, [isAddedCmt])

    useEffect(() => {
        if (usersSearchResult.length) setVisiblePopoverUsers(true);
        else setVisiblePopoverUsers(false)
    }, [usersSearchResult])


    const handleAddCmt = async () => {
        setIsAdding(true);
        await addCmt(cmtContent, img, parentId);
        setIsAdding(false);
    }

    const prepareBeforeSearch = (value) => {
        debounceSearchUsers(value);
    }

    const debounceSearchUsers = debounce(async (val) => {
        if (!val) {
            setUsersSearchResult([]);
            return;
        }

        try {
            setIsLoadingSearch(true);
            const data = {
                value: val,
                key: 2
            }

            const response = await userApi.searchUsers(token, data);
            if (response.content.err) {
                setUsersSearchResult([]);
                setIsLoadingSearch(false);
                return;
            }

            setUsersSearchResult(response.content.data);
            setIsLoadingSearch(false);
            return;
        } catch (error) {
            console.log(error);
        }

    }, 200)


    const handleSetContent = (value, type) => {
        if (type === "img") {
            const content = cmtContent + `<img style="border-radius: 50%;" src=${value} alt="" width="40px" height="40px" /> `
            setCmtContent(content);
            setSticker(value)
        } 
    }


    const handleSelectUsers = (user) => {
        setToUsersId(prevId => [...prevId, user.user_id])
        handleSetContent(user.user_name, "user")
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
                    <MyTextArea
                        sticker={sticker}
                        setSticker={setSticker}

                        onSearchFunc={prepareBeforeSearch}

                        suggestionsProp={usersSearchResult}
                        setContent={setCmtContent}
                        setToUsersId={setToUsersId}
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
                                    <Button icon={<CameraOutlined style={{ fontSize: "20px" }} />} disabled={img ? true : false} />
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
                                    <Button icon={<SmileOutlined style={{ fontSize: "20px" }} />} />
                                </Popover>
                            </Tooltip>

                        </div>
                    </div>
                </div>
            </Form.Item>
        </Form>
    )
}









{/* <Popover
                        placement="bottom"
                        overlayClassName="tag-users-popover"
                        visible={visiblePopoverUsers}
                        content={
                            usersSearchResult.length
                                ? <div className="tag-users" >
                                    {usersSearchResult.map((user, i) => ((
                                        <div className="tag" onKeyPress={(e) => console.log(e.key)} onClick={() => handleSelectUsers(user)} key={i}>
                                            <div style={{ display: "flex" }}>
                                                <Avatar className="user-ava" src={user.user_avatar} alt="" />

                                                <div>
                                                    <h3>{user.user_name}</h3>
                                                    <p>{user.user_email}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p>Friend</p>
                                            </div>
                                        </div>

                                    )))}
                                </div>
                                : ""
                        }
                    /> */}
