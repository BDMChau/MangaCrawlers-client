import React, { useState, useEffect, memo } from 'react'

import { Avatar, Button, Dropdown, Typography, Menu } from 'antd';
import userApi from 'api/apis/MainServer/userApi';
import Cookies from 'universal-cookie';
import imgsDefault from 'utils/imgsDefault';


function FriendRequest({ requestProp, i }) {
    const [request, setRequest] = useState({});

    const [isLoadingDel, setIsLoadingDel] = useState(false);
    const [isLoadingConfirm, setIsLoadingConfirm] = useState(false);

    const cookies = new Cookies();
    const token = cookies.get("token");

    useEffect(() => {
        setRequest(requestProp);
        console.log(requestProp)
    }, [requestProp])

    useEffect(() => {
        console.log(request)
    }, [request])



    const handleConfirmReq = async () => {

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
        !request.is_interacted
            ? <div key={i} className="request" >
                <div style={{ padding: "0 7px 0 0", display: "flex" }} className="item">
                    <Avatar shape="square" style={{ width: 70, height: 70, cursor: "pointer", borderRadius: "10px" }} title="Avatar" src={request.image_url ? request.image_url : imgsDefault.avatar} />

                    <div style={{ display: "flex", flexDirection: "column", marginLeft: "6px", marginTop: '12px', width: "65%" }}>
                        <Typography.Title level={5} className="user-name" title={request.sender_name} >{request.sender_name}</Typography.Title>
                        <Typography.Text className="user-email" title={request.sender_email} >{request.sender_email}</Typography.Text>
                    </div>
                </div>
                <div className="interaction">
                    <Button
                        type="primary"
                        style={{ marginTop: '20px', border: 'none' }}
                        disabled={isLoadingDel}
                        onClick={() => handleConfirmReq()}
                    >
                        Confirm
                    </Button>

                    <Button
                        style={{ marginTop: '20px' }}
                        disabled={isLoadingConfirm}
                        onClick={() => handleDeleteReq(request.notification_id)}
                    >
                        Delete
                    </Button>
                </div>
            </div>
            : ""
    )
}

export default memo(FriendRequest);
