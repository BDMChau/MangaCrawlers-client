import React, { memo, useEffect, useState } from 'react'
import "../Navbar.css"

import { Typography, Button } from 'antd';


const imgDefault = 'https://res.cloudinary.com/mangacrawlers/image/upload/v1632847306/notification_imgs/default/notification.svg';

function Notification({
    item,
    key,

    updateInteracted,
    handleAcceptInvitation
}) {
    // const {
    //     created_at,
    //     image_url,
    //     is_interacted,
    //     is_viewed,
    //     notification_id,
    //     notification_content,
    //     notification_type,
    //     notification_type_id,
    //     receiver_id,
    //     receiver_name,
    //     receiver_socket_id,
    //     sender_id,
    //     sender_name,
    //     target_id,
    //     target_title,
    // } = item;
    const [notification, setNotification] = useState({})


    useEffect(() => {
        setNotification(item);
    }, [item])


    const handleInteract = async (type) => {
        if (type === 'delete') {
            await updateInteracted(notification.notification_id);
            setNotification({ ...notification, is_interacted: true });

        } else if (type === 'confirm') {
            await handleAcceptInvitation(notification.notification_id, notification.target_id, notification.target_title);
            setNotification({ ...notification, is_interacted: true });
        }
    }


    const handleRender = () => {
        switch (notification.notification_type) {
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
            <img className='image' src={notification.image_url ? notification.image_url : imgDefault} alt="" />

            <div className='content'>
                <Typography.Text >
                    <b>{notification.sender_name}</b> invited you: "<div title={notification.notification_content} style={{ display: 'unset' }} dangerouslySetInnerHTML={{ __html: notification.notification_content }}></div>"
                </Typography.Text>


                <div className="interact" style={{ display: notification.is_interacted ? 'none' : 'unset', }}>
                    <Button
                        type='primary'
                        onClick={() => handleInteract('confirm')}
                    >
                        Confirm
                    </Button>

                    <Button
                        onClick={() => handleInteract('delete')}
                        style={{ marginLeft: "5px" }}
                    >
                        Delete
                    </Button>
                </div>


            </div>
        </div >
    )

    const FriendRequest = ({ }) => (
        <div></div>
    )


    return (
        <div className="notification-item" key={key} style={{ background: notification.is_viewed ? '' : '#daf1f985', cursor: "default" }} >
            {handleRender()}
            <div style={{ color: "#8f8f8f", fontSize: '13px' }} >{notification.created_at}</div>
        </div>
    )
}

export default memo(Notification);
