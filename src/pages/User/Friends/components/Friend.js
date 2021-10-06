import React, { useState, useEffect } from 'react'

import { Avatar, Button, Dropdown, Typography, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';


export default function Friend({ friend, i }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(friend);
    }, [friend])




    const dropDownItems = (
        <Menu style={{ borderRadius: "10px" }}>
            <Menu.Item key="0" style={{ borderRadius: "8px" }}>
                Unfriend
            </Menu.Item>
        </Menu>
    );



    return (
        <div key={i} className="friend" >
            <div style={{ padding: "0 7px 0 0", display: "flex"}} className="item">
                <Avatar shape="square" style={{ width: 70, height: 70, cursor: "pointer", borderRadius: "10px" }} src={user.user_avatar} />

                <div style={{ display: "flex", flexDirection: "column", marginLeft: "6px", marginTop: '12px', width:"65%" }}>
                    <Typography.Title level={5} className="user-name" >{user.user_name}</Typography.Title>

                    <Dropdown overlay={dropDownItems} trigger={['click']}>
                        <Button icon={<EllipsisOutlined style={{ fontSize: "23px" }} />} />
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
