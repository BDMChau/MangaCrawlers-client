import React, { useState, useEffect, memo } from 'react'

import { Avatar, Button, Dropdown, Typography, Menu } from 'antd';
import userApi from 'api/apis/MainServer/userApi';
import Cookies from 'universal-cookie';
import imgsDefault from 'utils/imgsDefault';
import { message_error, message_success } from 'components/toast/message';


function FriendRequest({ requestProp, i }) {
    const [request, setRequest] = useState({});

    const [isLoadingDel, setIsLoadingDel] = useState(false);
    const [isLoadingConfirm, setIsLoadingConfirm] = useState(false);

    const cookies = new Cookies();
    const token = cookies.get("token");

    useEffect(() => {
        console.log(requestProp)
        setRequest(requestProp);
    }, [requestProp])


    // update interact notification
    const updateInteracted = async (action, type, cmdFrom, userId) => {
        const data = {
            to_user_id: userId.toString(),
            target_title: "user",
            action: action, // 1: delete, 2: accept join team, 3: accept friend
            type: type, // 1: set delete true, 2: set interact true
            cmd_from: cmdFrom // 1: sender update, 2: reciever update
        };

        try {
            const res = await userApi.updateNotificationFrReq(token, data);
            if (res.content.err) return;

            return;
        } catch (err) {
            console.log(err);
        }
    }


    const handleConfirmReq = async (userId) => {
        setIsLoadingConfirm(true);

        const data = {
            to_user_id: userId.toString()
        };

        try {
            const response = await userApi.acceptFriendReq(token, data);
            if (response.content.err) {
                setIsLoadingConfirm(false);
                return;
            }

            await updateInteracted(3, 2, 2, userId);

            setTimeout(() => {
                setRequest({ ...request, is_interacted: true });
                setIsLoadingConfirm(false);
            }, 200)
            message_success('Success');
            return;
        } catch (err) {
            console.log(err);
            setIsLoadingConfirm(false);
            message_error("Failed!")
            return;
        }
    }


    const handleDeleteReq = async (noti_id) => {
        if (!noti_id) return;
        setIsLoadingDel(true);

        const data = {
            notification_id: noti_id.toString()
        };

        try {
            await userApi.updateInteractedNotification(token, data);

            setTimeout(() => {
                setRequest({ ...request, is_interacted: true });
                setIsLoadingDel(false);
            }, 200)
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <div key={i} className="request" >
            <div style={{ padding: "0 7px 0 0", display: "flex" }} className="item">
                <Avatar shape="square" style={{ width: 70, height: 70, cursor: "pointer", borderRadius: "10px" }} title="Avatar" src={request.image_url ? request.image_url : imgsDefault.avatar} />

                <div style={{ display: "flex", flexDirection: "column", marginLeft: "6px", marginTop: '12px', width: "65%" }}>
                    <Typography.Title level={5} className="user-name" title={request.sender_name} >{request.sender_name}</Typography.Title>
                    <Typography.Text className="user-email" title={request.sender_email} >{request.sender_email}</Typography.Text>
                </div>
            </div>

            {!request.is_interacted
                ? <div className="interaction">
                    <Button
                        type="primary"
                        style={{ marginTop: '20px', border: 'none' }}
                        disabled={isLoadingDel}
                        loading={isLoadingConfirm}
                        onClick={() => handleConfirmReq(request.sender_id)}
                    >
                        Accept
                    </Button>

                    <Button
                        style={{ marginTop: '20px' }}
                        disabled={isLoadingConfirm}
                        loading={isLoadingDel}
                        onClick={() => handleDeleteReq(request.notification_id)}
                    >
                        Delete
                    </Button>
                </div>
                : ""
            }
        </div>

    )
}

export default memo(FriendRequest);
