import React, { useEffect, useState } from 'react'
import "../Friends.css"

import { Button, Modal } from 'antd';

export default function MultualFriendsModal({ visibleProp, closeModal }) {
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
                wrapClassName="modal-mutual-cmt"
                title="Multual friend with Chou"
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

