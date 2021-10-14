import React, { useState, useEffect, useRef } from 'react'
import "../CommentContainter/CommentContainter.css"

import { Avatar, Button, Form, Image, Popover, Tooltip, Upload } from 'antd'
import { CloseOutlined, CameraOutlined, SmileOutlined, CommentOutlined, TagsOutlined } from '@ant-design/icons'
import { message_error } from 'components/alerts/message'
import handleFile from 'helpers/handleFile'
import { debounce } from 'lodash'
import userApi from 'api/apis/MainServer/userApi'
import MyTextArea from 'components/Editor/MyTextArea'

import imgDefault from "assets/8031DF085D7DBABC0F4B3651081CE70ED84622AE9305200F2FC1D789C95CF06F.svg"

const fileDefault = new File(["foo"], imgDefault, {
    type: "text/plain",
})

const fileTypesAllowed = [
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/png",
]



export default function InputForm({
    token,
    parentId,

    isAddedCmt,
    setIsAddedCmt,
    addCmt,

    editCmt,
    objEdit,
    isEditting,

    replying
}) {
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

    // render vars
    const [visible, setVisible] = useState(false);
    const [visiblePopoverUsers, setVisiblePopoverUsers] = useState(false);


    useEffect(() => {
        if (isAddedCmt === true) {
            setCmtContent("");
            setImg("");
            setImgDemo("");
            setIsAddedCmt(false);
        }
    }, [isAddedCmt])


    useEffect(() => {
        if (objEdit) setImgDemo(objEdit.image);
    }, [objEdit])


    useEffect(() => {
        if (usersSearchResult.length) setVisiblePopoverUsers(true);
        else setVisiblePopoverUsers(false)
    }, [usersSearchResult])


    const prepareToAddCmt = async (sticker) => {
        if (sticker) {
            const dataInput = {
                content: "",
                image: fileDefault,
                sticker_url: sticker,
                to_users_id: toUsersId,
                parent_id: parentId ? parentId.toString() : ""
            };

            setIsAdding(true);
            await addCmt(dataInput);
            setIsAdding(false);
            return;
        }

        if (cmtContent || img) {
            const dataInput = {
                content: cmtContent,
                image: img ? img : fileDefault,
                to_users_id: toUsersId,
                parent_id: parentId ? parentId.toString() : ""
            };

            setIsAdding(true);
            await addCmt(dataInput);
            setIsAdding(false);
        }
    }

    const prepareToEditCmt = () => {
        if (!objEdit.image) objEdit.image = fileDefault;

        editCmt(objEdit)
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


    const handleRemoveImg = () => {
        setImg("");
        setImgDemo("");

        if (objEdit) objEdit.image = "";
    }


    const onChangeFile = (info) => {
        setImg(info.file.originFileObj)
        if (objEdit) objEdit.image = info.file.originFileObj;

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
                        isAddedCmt={isAddedCmt}

                        sticker={sticker}
                        setSticker={setSticker}

                        onSearchFunc={prepareBeforeSearch}

                        suggestionsProp={usersSearchResult}

                        content={cmtContent}
                        setContent={setCmtContent}
                        setToUsersId={setToUsersId}

                        editCmt={editCmt}
                        objEdit={objEdit}
                        isEditting={isEditting}

                        replying={replying}
                    />

                    <div className="bottom-cont">
                        <div className="interaction-cont">
                            {imgDemo
                                ? <>
                                    <Button
                                        className="btn-remove-img"
                                        icon={<CloseOutlined />}
                                        onClick={() => handleRemoveImg()}
                                    />

                                    <Image src={imgDemo} alt="" style={{ borderRadius: "3px", width: "fit-content", height: "110px" }} />
                                </>
                                : ""

                            }

                            <Button
                                className="btn-submit"
                                style={{ marginTop: "10px", height: "40px", borderRadius: "3px", width: "fit-content" }}
                                type="primary"
                                loading={isAdding}
                                icon={<CommentOutlined style={{ fontSize: "18px" }} />}
                                onClick={() => isEditting ? prepareToEditCmt() : prepareToAddCmt()}
                            >
                                {isEditting ? "Edit" : "Add Comment"}
                            </Button>
                        </div>

                        <div className="addons-cont">
                            <Tooltip title={img ? "Just a photo" : "Attach a photo"}>
                                <Upload
                                    showUploadList={false}
                                    {...propsUploadImg}
                                >
                                    <Button icon={<CameraOutlined style={{ fontSize: "16px" }} />} disabled={img ? true : false} />
                                </Upload>
                            </Tooltip>

                            <Tooltip title="Comment with a Sticker">
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
                                                        onClick={() => prepareToAddCmt(sticker)}
                                                    >
                                                        <img style={{ borderRadius: "10px" }} src={sticker} alt="" width="70px" height="70px" />
                                                    </div>
                                                ))}
                                            </div>

                                            : ""
                                    }
                                >
                                    <Button icon={<TagsOutlined style={{ fontSize: "16px" }} />} />
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
