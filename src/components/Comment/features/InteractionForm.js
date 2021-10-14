import React, { useState, useEffect } from 'react';
import "../CommentContainter/CommentContainter.css"

import { Button, Input, Modal, Typography, Upload } from 'antd'
import { CloseOutlined, CameraOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css';

import InputForm from './InputForm'
import TransitionAnimate from 'components/Animation/transition';
import Cookies from 'universal-cookie';

export default function InteractionForm({ comment, cmtId, deleteCmt, addCmt, isAddedCmt, setIsAddedCmt, editCmt }) {
    const [replying, setReplying] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalEditVisible, setIsModalEditVisible] = useState(false);

    const [isEditting, setIsEditting] = useState(false);
    const [imgEditting, setImgEditting] = useState("");
    const [imgDemo, setImgDemo] = useState("");
    const [contentEditting, setContentEditting] = useState(comment.manga_comment_content ? comment.manga_comment_content : "");
    const [objEdit, setObjEdit] = useState({});

    const cookies = new Cookies();
    const token = cookies.get("token");

    const listFileTypesAllowed = ["image/png", "image/jpeg", "image/jpg", "image/gif"]

    useEffect(() => {
        if (isEditting) {
            const obj = {
                cmt_id: comment.manga_comment_id,
                content: comment.manga_comment_content,
                image: comment.image_url ? comment.image_url : ""
            };

            setObjEdit(obj);
        } else setObjEdit({});
    }, [isEditting])

    const handleEdit = () => {
        setIsEditting(!isEditting);
    }


    const handleDelete = () => {
        deleteCmt(cmtId);
        setIsModalVisible(false);
    }

    const modalDeleteCmt = () => (
        <Modal wrapClassName="modal-del-cmt" closeIcon={undefined} visible={isModalVisible} footer={null}>
            <Typography.Text>Do you want to delete this comment?</Typography.Text>


            <div>
                <Button onClick={() => handleDelete()} type="primary" >Delete</Button>
                <Button onClick={() => setIsModalVisible(false)} type="text">Cancle</Button>
            </div>
        </Modal>
    )


    return (
        <>
            <Button
                className="reply"
                type="text"
                disabled={isEditting}
                onClick={() => setReplying(!replying)}
                style={{ borderRadius: "10px", padding: "0 2px" }}
            >
                Reply
            </Button>

            <Button
                className="reply"
                type="text"
                disabled={replying}
                onClick={() => handleEdit()}
                style={{ borderRadius: "10px", padding: "0 2px" }}
            >
                Edit
            </Button>

            <Button
                className="btn-remove"
                type="text"
                onClick={() => setIsModalVisible(true)}
                style={{ borderRadius: "10px", padding: "0 2px" }}
            >
                Delete
            </Button>

            {replying || isEditting
                ? <div style={{ width: "100%", marginTop: "10px" }} >
                    <TransitionAnimate
                        renderPart={
                            <InputForm
                                token={token}
                                parentId={cmtId}

                                isAddedCmt={isAddedCmt}
                                setIsAddedCmt={setIsAddedCmt}
                                addCmt={(dataInput) => addCmt(dataInput)}

                                editCmt={editCmt}
                                objEdit={objEdit}
                                isEditting={isEditting}

                                replying={replying}
                            />
                        }
                        transitionTime={0.1}
                    />
                </div>
                : ""
            }

            {modalDeleteCmt()}
        </>
    )
}
