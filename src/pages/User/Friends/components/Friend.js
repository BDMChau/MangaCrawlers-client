import React, { useState, useEffect, memo } from 'react'

import { Avatar, Button, Dropdown, Typography, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import redirectURI from 'helpers/redirectURI';
import { NavLink } from 'react-router-dom';


function Friend({ friend, i, isHidden }) {
    const [user, setUser] = useState({});

    const history = useHistory();

    useEffect(() => {
        setUser(friend);
    }, [friend])



    const handleUnfriend = (id) => {
        if (!id) return;

        console.log(id)

    }


    const dropDownItems = (
        <Menu style={{ borderRadius: "10px" }}>
            <Menu.Item key="0" style={{ borderRadius: "8px" }} onClick={() => handleUnfriend(user.user_id)} >
                Unfriend
            </Menu.Item>
        </Menu>
    );


    return (
        <div key={i} className="friend" >
            <div style={{ padding: "0 7px 0 0", display: "flex" }} className="item">
                <NavLink to={redirectURI.userPage_uri(user.user_id)} >
                    <Avatar shape="square" style={{ width: 70, height: 70, cursor: "pointer", borderRadius: "10px" }} title="Avatar" src={user.user_avatar} />
                </NavLink>

                <div style={{ display: "flex", flexDirection: "column", marginLeft: "6px", marginTop: '12px', width: "75%" }}>
                    <NavLink to={redirectURI.userPage_uri(user.user_id)} style={{ maxWidth: "100%", width: "fit-content" }} >
                        <Typography.Title level={5} className="user-name" title={user.user_name}>{user.user_name}</Typography.Title>
                    </NavLink>

                    {isHidden
                        ? <Typography.Text
                            style={{ color: "#00000094", fontStyle: "italic", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "200px" }}
                            title={user.user_email}
                        >
                            {user.user_email}
                        </Typography.Text>

                        : <Dropdown overlay={dropDownItems} trigger={['click']}>
                            <Button icon={<EllipsisOutlined style={{ fontSize: "23px", paddingTop: "2px" }} />} />
                        </Dropdown>

                    }
                </div>
            </div>

            {isHidden
                ? ""
                : <div className="text">
                    <div>
                        <Button style={{ cursor: "default", marginTop: '20px' }}>
                            Friend
                        </Button>

                    </div>
                </div>
            }
        </div>
    )
}

export default memo(Friend);
