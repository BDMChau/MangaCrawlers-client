import React, { useState, useEffect, memo } from 'react'

import { Avatar, Button, Dropdown, Typography, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';


function FriendRequest({ requestProp, i }) {
    const [request, setRequest] = useState({});

    useEffect(() => {
        setRequest(requestProp);
        console.log(requestProp)
    }, [requestProp])


    const handleAccept = () => {
        console.log(request.notification_id)
        console.log(request.sender_id)
    }


    return (
        <div key={i} className="request" >
            <div style={{ padding: "0 7px 0 0", display: "flex" }} className="item">
                <Avatar shape="square" style={{ width: 70, height: 70, cursor: "pointer", borderRadius: "10px" }} title="Avatar" src={request.image_url} />

                <div style={{ display: "flex", flexDirection: "column", marginLeft: "6px", marginTop: '12px', width: "65%" }}>
                    <Typography.Title level={5} className="user-name" title={request.sender_name} >{request.sender_name}</Typography.Title>
                    <Typography.Text className="user-email" title={request.sender_email} >{request.sender_email}</Typography.Text>
                </div>
            </div>
            <div className="interaction">
                <Button type="primary" style={{ marginTop: '20px', border: 'none' }}>
                    Confirm
                </Button>
                <Button style={{ marginTop: '20px' }}>
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default memo(FriendRequest);
