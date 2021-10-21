import React, { useEffect, useState } from 'react'
import "../Friends.css"

import { Button, Modal } from 'antd';

export default function FriendsModal({ visibleProp, closeModal, title }) {
    const [isModalVisible, setIsModalVisible] = useState(false);


    useEffect(() => {
        if (visibleProp) showModal();
    }, [visibleProp])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        closeModal(false)
    };

    return (
        <>
            <Modal
                wrapClassName="modal-friends"
                title={title}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
};

