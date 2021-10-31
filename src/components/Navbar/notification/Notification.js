import React, { memo, useEffect, useState } from 'react'
import "../Navbar.css"

import { Typography, Button, Avatar } from 'antd';

import { useDispatch } from 'react-redux';


const imgDefault = 'https://res.cloudinary.com/mangacrawlers/image/upload/v1632847306/notification_imgs/default/notification.svg';

function Notification({
    item,
    key,

    updateInteracted,

    handleAcceptInvitation,
    handleAcceptFriendReq
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

    /**
     * @param: 1: delete 
     * @param: 2: confirm_toJoinTeam 
     * @param: 3: accept_friend 
     */
    const listTypes = {
        1: "delete",
        2: "confirm_toJoinTeam",
        3: "accept_friend"
    }
    const dispatch = useDispatch();

    const [notification, setNotification] = useState({});


    useEffect(() => {
        setNotification(item);
    }, [item])


    const handleInteract = async (type) => {
        let response;

        switch (type) {
            case listTypes[1]:
                await updateInteracted(notification.notification_id, 1);
                setNotification({ ...notification, is_interacted: true, is_viewed:true });

                break;
            case listTypes[2]:
                response = await handleAcceptInvitation(notification.notification_id, notification.target_id, notification.target_title);
                if (response) {
                    setNotification({ ...notification, is_interacted: true, is_viewed:true });
                }
                break;
            case listTypes[3]:
                response = await handleAcceptFriendReq(notification.notification_id, notification.sender_id, notification.target_title);
                if (response) {
                    setNotification({ ...notification, is_interacted: true, is_viewed:true });
                }
                break;

            default:
                break;
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


    /////////////////////////// components ///////////////////////////
    const Invitation = () => (
        <div style={{ display: 'flex' }} >
            <div>
                <Avatar className='image' src={notification.image_url ? notification.image_url : imgDefault} alt="" />
            </div>

            <div className='content'>
                <Typography.Text>
                    <b>{notification.sender_name}</b> invited you: "<div title={notification.notification_content} style={{ display: 'unset' }} dangerouslySetInnerHTML={{ __html: notification.notification_content }}></div>"
                </Typography.Text>


                <div className="interact" style={{ display: notification.is_interacted || !notification.target_id ? 'none' : 'unset', }}>
                    <Button
                        type='primary'
                        onClick={() => handleInteract(listTypes[2])}
                    >
                        Confirm
                    </Button>

                    <Button
                        onClick={() => handleInteract(listTypes[1])}
                        style={{ marginLeft: "5px" }}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div >
    )


    const FriendRequest = ({ }) => (
        <div style={{ display: 'flex' }} >
            <div>
                <Avatar className='image' src={notification.image_url ? notification.image_url : imgDefault} alt="" />
            </div>

            <div className='content'>
                <Typography.Text >
                    <b>{notification.sender_name}</b> sent you a request: "<div title={notification.notification_content} style={{ display: 'unset' }} dangerouslySetInnerHTML={{ __html: notification.notification_content }}></div>"
                </Typography.Text>


                <div className="interact" style={{ display: notification.is_interacted || !notification.target_id ? 'none' : 'unset', }}>
                    <Button
                        type='primary'
                        onClick={() => handleInteract(listTypes[3])}
                    >
                        Accept
                    </Button>

                    <Button
                        onClick={() => handleInteract(listTypes[1])}
                        style={{ marginLeft: "5px" }}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div >
    )


    return (
        <div className="notification-item" key={key} style={{ background: notification.is_viewed || notification.is_interacted ? '#fff' : '#daf1f985', cursor: "default" }} >
            {handleRender()}
            <div style={{ color: "#8f8f8f", fontSize: '13px', marginTop: "5px" }} >{notification.created_at}</div>
        </div>
    )
}

export default memo(Notification);
