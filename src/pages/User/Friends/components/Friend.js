import React, { useState, useEffect, memo } from 'react'

import { Avatar, Button, Dropdown, Typography, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import redirectURI from 'helpers/redirectURI';
import { NavLink } from 'react-router-dom';
import userApi from 'api/apis/MainServer/userApi';
import { message_error, message_success } from 'components/toast/message';
import Cookies from 'universal-cookie';

import onlineIcon from "assets/img/online.png"
import offlineIcon from "assets/img/offline.png"
import { socket } from 'socket/socketClient';
import EVENTS_NAME from 'socket/features/eventsName';


function Friend({ friend, i, isHidden }) {
    const [isFirstTime, setIsFirstTime] = useState(false);
    const [user, setUser] = useState({});
    const [isFriend, setIsFriend] = useState(true);

    const history = useHistory();

    useEffect(() => {
        if (Object.keys(friend).length) {
            setUser(friend);
            setIsFirstTime(true);
        }
    }, [friend])

    useEffect(() => {
        if (isFirstTime) {
            socket.on(EVENTS_NAME.NOTIFY_ONLINE, (result) => {
                if (user.user_id === result.sender_id) {
                    if (result.status_number === 1) setUser({ ...user, is_online: true });
                    else setUser({ ...user, is_online: false });
                }
                setIsFirstTime(false);
            });
        }
    }, [isFirstTime])

    const cookies = new Cookies();
    const token = cookies.get("token");

    const handleUnfriend = async (id) => {
        if (!id) return;

        const data = {
            to_user_id: id.toString()
        };

        try {
            const res = await userApi.unfriend(token, data);
            if (res.content.err) {
                message_error("Failed!");
                return;
            }

            setIsFriend(false);
            message_success("Success!");
            return;
        } catch (err) {
            console.log(err);
            message_error("Failed!");
        }

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

                    <img src={user.is_online ? onlineIcon : offlineIcon} className="stt-online" alt="" />
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

                        : isFriend
                            ? <Dropdown overlay={dropDownItems} trigger={['click']}>
                                <Button icon={<EllipsisOutlined style={{ fontSize: "23px", paddingTop: "2px" }} />} />
                            </Dropdown>
                            : ""

                    }
                </div>
            </div>

            {isHidden
                ? ""
                : <div className="text">
                    <div>
                        <Button style={{ cursor: "default", marginTop: '20px' }}>
                            {isFriend ? "Friend" : ""}
                        </Button>

                    </div>
                </div>
            }
        </div>
    )
}

export default memo(Friend);
