import React, { useState } from 'react';
import "./AddOnsBtn.css";
import BotYoutubeMusicService from "../../BotYoutubeMusic/BotYoutubeMusicService";

import { Button, Dropdown, Menu, Modal } from 'antd';

import { PlusOutlined } from "@ant-design/icons";
import stereo from "../../../assets/img/stereo.svg";


export default function AddOnsBtn() {
    const [isVisibleModal, setIsVisibleModal] = useState(false);


    const dropDownItems = (
        <Menu>
            <Menu.Item>
                <Button
                    className="music-btn"
                    title="Music"
                    onClick={() => setIsVisibleModal(true)}
                >
                    <img src={stereo} alt="" style={{ height: "25px", margin: "0 0 0 -6px" }} />
                </Button>
            </Menu.Item>
        </Menu>
    );

    return (
        <div>
            <Dropdown
                className="addons-btn"
                overlayClassName="dropdown-items"
                overlay={dropDownItems}
                placement="topCenter"
                trigger={['hover']}
            >

                <Button title="Add Ons">
                    <PlusOutlined style={{ fontSize: "20px", margin: "3px 0 0 -1.5px" }} />
                </Button>
            </Dropdown>


            {/* ///////////////////// */}
            <Modal
                className="bot-modal"
                title="Bot Music"
                visible={isVisibleModal}
                onCancel={() => setIsVisibleModal(false)}
                width={700}
                closable={true}
                footer={null}

            >
                <BotYoutubeMusicService />
            </Modal>
        </div>
    );
}
