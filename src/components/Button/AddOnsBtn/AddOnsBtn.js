import React, { useState } from 'react'
import "./AddOnsBtn.css"
import { Button, Dropdown, Menu, Tooltip } from 'antd'
import MessengerCustomerChat from 'react-messenger-customer-chat';
import { PlusOutlined } from "@ant-design/icons"
import stereo from "../../../assets/img/stereo.svg"
import Modal from 'antd/lib/modal/Modal';
import BotYoutubeMusicService from "../../BotYoutubeMusic/BotYoutubeMusicService";

export default function AddOnsBtn() {
    const [isVisibleModal, setIsVisibleModal] = useState(false)


    const dropDownItems = (
        <Menu>
            <Menu.Item>
                <MessengerCustomerChat
                    pageId="101341455476510"
                    appId="496491375126587"
                />
            </Menu.Item>

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
    )

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


            /////////////////////
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
    )
}
