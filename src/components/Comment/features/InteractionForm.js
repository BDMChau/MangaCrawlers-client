import React, { useState } from 'react'

import { Button, Modal, Typography } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css';

import InputForm from './InputForm'
import TransitionAnimate from 'components/Animation/transition';
import Cookies from 'universal-cookie';

export default function InteractionForm({ cmtId, deleteCmt, addCmt, isAddedCmt, setIsAddedCmt}) {
    const [visible, setVisible] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const cookies = new Cookies();
    const token = cookies.get("token");



    const handleDelete = () => {
        deleteCmt(cmtId);
        setIsModalVisible(false);
    }

    const modalDeleteCmt = () => (
        <Modal wrapClassName="modal-del-cmt" closeIcon={undefined} visible={isModalVisible} footer={null}>
            <Typography.Text>Do you want to delete this commment?</Typography.Text>

            <div>
                <Button onClick={() => handleDelete()} type="primary" >Delete</Button>
                <Button onClick={() => setIsModalVisible(false)} type="text">Cancle</Button>
            </div>
        </Modal>
    )


    return (
        <>
            <Typography.Text className="reply" onClick={() => setVisible(!visible)} >
                Reply
            </Typography.Text>

            <Typography.Text className="btn-remove" onClick={() => setIsModalVisible(true)}>
                Delete
            </Typography.Text>

            {visible
                ? <div style={{ width: "100%", marginTop: "10px" }} >
                    <TransitionAnimate
                        renderPart={
                            <InputForm
                                token={token}
                                parentId={cmtId}

                                isAddedCmt={isAddedCmt}
                                setIsAddedCmt={setIsAddedCmt}
                                addCmt={(dataInput) => addCmt(dataInput)}
                            />
                        }
                        transitionTime={0.2}
                    />
                </div>
                : ""
            }

            {modalDeleteCmt()}
        </>
    )
}
