import { Typography } from 'antd';
import React, { useEffect } from 'react'
import "../Navbar.css"

export default function Notification({ item, key }) {
    const imgDefault = 'https://res.cloudinary.com/mangacrawlers/image/upload/v1632847306/notification_imgs/default/notification.svg';
    const {
        created_at,
        image_url,
        is_interacted,
        is_viewed,
        notification_id,
        notification_content,
        notification_type,
        notification_type_id,
        receiver_id,
        receiver_name,
        receiver_socket_id,
        sender_id,
        sender_name,
        target_id,
        target_title,
    } = item;


    const handleRender = () => {
        switch (notification_type) {
            case 1:
                return <Invitation />
            case 2:
                return <FriendRequest />

            default:
                break;
        }
    }


    const Invitation = () => (
        <div style={{ display: 'flex' }} >
            <img className='image' src={image_url ? image_url : imgDefault} alt="" />

            <div className='content'>
                <Typography.Text >
                    <b>{sender_name}</b> invited you: "<div title={notification_content} style={{ display: 'unset' }} dangerouslySetInnerHTML={{ __html: notification_content }}></div>"
                </Typography.Text>
            </div>
        </div>
    )

    const FriendRequest = ({ }) => (
        <div></div>
    )


    return (
        <div className="notification-item" key={key} style={{ background: is_viewed ? '' : '#daf1f985', cursor: "default" }} >
            {handleRender()}
            <div style={{ color: "#8f8f8f", fontSize: '13px' }} >{created_at}</div>
        </div>
    )
}
