import React, { useEffect, useState } from 'react'
import "./UserInfo.css";

import { useLocation } from 'react-router';
import UserInfo from './UserInfo';
import userApi from 'api/apis/MainServer/userApi';
import { socketActions } from 'socket/socketClient';
import { message_error, message_success } from 'components/alerts/message';
import { useSelector } from 'react-redux';

export default function UserInfoService() {
    const userState = useSelector((state) => state.userState);

    const query = new URLSearchParams(useLocation().search);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        if (query.get("id")) getUserInfo(query.get("id"))
    }, [query.get("id")])


    const getUserInfo = async (id) => {
        const data = { user_id: id.toString() }

        try {
            const response = await userApi.getUserInfo(data);
            if (response.content.err) return;

            // if (userState[0].user_id.toString() === query.get("id").toString()) {
            //     setUserInfo({});
            //     return
            // }

            setUserInfo(response.content.user)
        } catch (err) {
            console.log(err);
        }
    }


    const handleSendFriendRequest = () => {
        if (!userState[0]) return message_error("You have to logged in to do this action!");
        if (userState[0].user_id.toString() === query.get("id").toString()) return message_error("You cannot send request with yourseft!")

        const data = {
            type: 2,
            message: `Want to be friend with me ^^?`,
            image_url: userState[0].user_avatar,
            user_id: userState[0].user_id,
            list_to: userInfo.user_id ? [userInfo.user_id] : [],
            obj_data: {
                target_id: userInfo.user_id.toString(),
                target_title: "user"
            }
        }
        console.log(data)
        socketActions.sendMessageToServer(data);
        message_success("Sent!");
    }


    return (
        <UserInfo
            userInfo={userInfo}

            handleSendFriendRequest={handleSendFriendRequest}
        />
    )
}
