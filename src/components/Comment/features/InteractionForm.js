import React, { useState } from 'react'

import { Button, Modal, Typography } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css';

import InputForm from './InputForm'

export default function InteractionForm({ cmtId, deleteCmt }) {
    const [visible, setVisible] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);


    const handleDelete = () => {
        deleteCmt(cmtId);
        setIsModalVisible(false);
    }



    const modal = () => (
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
            <Typography.Text className="reply" >
                Reply
            </Typography.Text>

            <Typography.Text className="btn-remove" onClick={() => setIsModalVisible(true)}>
                Delete
            </Typography.Text>
            {visible
                ? <div style={{ width: "100%" }} > <InputForm /> </div>
                : ""
            }
            {modal()}
        </>
    )
}
