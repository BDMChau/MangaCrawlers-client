import React, { useState, useEffect, useRef, memo } from 'react'
import "components/Comment02/CommentService/CommentService.css"

import { Avatar, Button, Form, Image, Popover, Tooltip, Upload } from 'antd'
import { CloseOutlined, CameraOutlined, SmileOutlined, CommentOutlined, TagsOutlined } from '@ant-design/icons'
import { message_error } from 'components/toast/message'
import handleFile from 'helpers/handleFile'
import { debounce } from 'lodash'
import userApi from 'api/apis/MainServer/userApi'
import InputCmt from 'components/Editor/InputCmt'

import imgDefault from "assets/8031DF085D7DBABC0F4B3651081CE70ED84622AE9305200F2FC1D789C95CF06F.svg"
import { notification_error, notification_success } from 'components/toast/notification'

const fileDefault = new File(["foo"], imgDefault, {
    type: "text/plain",
})

const fileTypesAllowed = [
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/png",
]



function InputForm({
    token,
    parentId,

    isAddedCmt,
    setIsAddedCmt,
    addCmt,

    editCmt,
    objEdit,
    isEditting,
    setIsEditting,

    replying,
    setReplying,
    replyingUserId,

    recieveEditedCmt
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

    const [isLoadingEdit, setIsLoadingEdit] = useState(false);

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
        console.log(toUsersId)
    }, [toUsersId])


    useEffect(() => {
        if (usersSearchResult.length) setVisiblePopoverUsers(true);
        else setVisiblePopoverUsers(false)
    }, [usersSearchResult])


    // function addCmt() is from <CommentService />
    const prepareToAddCmt = async (sticker) => {
        if (sticker) {
            const dataInput = {
                content: "",
                image: fileDefault,
                sticker_url: sticker,
                to_users_id: parentId ? [replyingUserId.toString(), ...toUsersId] : toUsersId,
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
                to_users_id: parentId ? [replyingUserId.toString(), ...toUsersId] : toUsersId,
                parent_id: parentId ? parentId.toString() : ""
            };

            setIsAdding(true);
            await addCmt(dataInput);
            setIsAdding(false);
            if(setReplying) setReplying(false);
        }
    }

    // function editCmt() is from <CommentService />
    const prepareToEditCmt = async () => {
        if (!objEdit.image) objEdit.image = fileDefault;

        setIsLoadingEdit(true);

        const result = await editCmt(objEdit);
        if (result.code === false) notification_error("Failed!");
        else {
            recieveEditedCmt(result.cmtEdited);
            notification_success("Comment edited!");
        }

        setIsLoadingEdit(false);
        setIsEditting(false);
    }


    const debounceSearchUsers = useRef(debounce(async (val) => {
        if (!val) {
            setUsersSearchResult([]);
            return;
        }

        try {
            setIsLoadingSearch(true);
            const data = {
                value: val,
                key: 2 // search with: 1: email, 2: name
            }

            const response = await userApi.searchUsers(data);
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

    }, 200))


    const handleRemoveImg = () => {
        setImg("");
        setImgDemo("");

        if (objEdit) objEdit.image = "";
    }


    const onChangeFile = (info) => {
        const originFile = info.file.originFileObj;
        const file = originFile ? originFile : info.file;

        setImg(file)
        if (objEdit) objEdit.image = file;

        handleFile.getBase64Img(file, (file) => {
            setImgDemo(file)
        });
    }


    const propsUploadImg = {
        name: 'file',
        headers: {
            authorization: 'authorization-text',
        },
        beforeUpload: (file) => {
            if (!fileTypesAllowed.includes(file.type)) {
                message_error("Please select jpeg, png files!")
            }

            const fileSz = file.size / 1024 / 1024;
            if (fileSz > 10) {
                message_error("An image must smaller than 10MB!")
            }

            const condition = fileTypesAllowed.includes(file.type) && fileSz <= 10
            return condition ? false : Upload.LIST_IGNORE
        },
        onChange: (info) => onChangeFile(info)
    };

    return (
        <Form className="form-input">
            <Form.Item style={{ marginBottom: "10px" }}>
                <div>
                    <InputCmt
                        isAddedCmt={isAddedCmt}


                        onSearchFunc={(val) => debounceSearchUsers.current(val)}
                        suggestionsProp={usersSearchResult}

                        content={cmtContent}
                        setContent={setCmtContent}
                        setToUsersId={setToUsersId}

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
                                loading={isAdding || isLoadingEdit}
                                icon={<CommentOutlined style={{ fontSize: "18px" }} />}
                                onClick={() => isEditting ? prepareToEditCmt() : prepareToAddCmt()}
                            >
                                {isEditting ? "Submit Edit" : "Add Comment"}
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

                            {/* <Tooltip title="Comment with a Sticker">
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
                            </Tooltip> */}

                        </div>
                    </div>
                </div>
            </Form.Item>
        </Form>
    )
}

export default memo(InputForm);