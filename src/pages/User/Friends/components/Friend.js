import React, { useState, useEffect, memo } from 'react'

import { Avatar, Button, Dropdown, Typography, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';


function Friend({ friend, i }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(friend);
    }, [friend])



    const handleDeleteFriend = (id) => {
        if(!id) return;

        console.log(id)

    }


    const dropDownItems = (
        <Menu style={{ borderRadius: "10px" }}>
            <Menu.Item key="0" style={{ borderRadius: "8px" }} onClick={() => handleDeleteFriend(user.user_id)} >
                Unfriend
            </Menu.Item>
        </Menu>
    );


    return (
        <div key={i} className="friend" >
            <div style={{ padding: "0 7px 0 0", display: "flex" }} className="item">
                <Avatar shape="square" style={{ width: 70, height: 70, cursor: "pointer", borderRadius: "10px" }} title="Avatar" src={user.user_avatar} />

                <div style={{ display: "flex", flexDirection: "column", marginLeft: "6px", marginTop: '12px', width: "65%" }}>
                    <Typography.Title level={5} className="user-name" title={user.user_name}>{user.user_name}</Typography.Title>

                    <Dropdown overlay={dropDownItems} trigger={['click']}>
                        <Button icon={<EllipsisOutlined style={{ fontSize: "23px", paddingTop: "2px" }} />} />
                    </Dropdown>
                </div>
            </div>
            <div className="text">
                <div>
                    {user.status === "Friend"
                        ? <Button style={{ cursor: "default", marginTop: '20px' }}>
                            {user.status}
                        </Button>
                        : ""
                    }
                </div>
            </div>
        </div>
    )
}

export default memo(Friend);
