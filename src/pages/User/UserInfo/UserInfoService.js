import React, { useEffect, useState } from 'react'
import "./UserInfo.css";

import { useLocation } from 'react-router';
import UserInfo from './UserInfo';
import userApi from 'api/apis/MainServer/userApi';
import { socketActions } from 'socket/socketClient';
import { message_error, message_success } from 'components/alerts/message';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';

export default function UserInfoService() {
    const userState = useSelector((state) => state.userState);

    const query = new URLSearchParams(useLocation().search);
    const [userInfo, setUserInfo] = useState({});

    const [status, setStatus] = useState("");

    const cookies = new Cookies();
    const token = cookies.get("token");

    useEffect(() => {
        if (query.get("id")) {
            getUserInfo(query.get("id"));
            checkFriendStatus(query.get("id"));
        }
    }, [query.get("id")])


    useEffect(() => {
        if (userState[0]) checkFriendStatus(query.get("id"))
    }, [userState[0]])


    const getUserInfo = async (id) => {
        const data = { user_id: id.toString() }

        try {
            const res = await userApi.getUserInfo(data);
            if (res.content.err) return;

            setUserInfo(res.content.user)
        } catch (err) {
            console.log(err);
        }
    }


    const checkFriendStatus = async (id) => {
        if (!userState[0]) return;

        const data = {
            to_user_id: id
        };

        try {
            const res = await userApi.checkReqStatus(token, data);

            // case 0 >> "Add Friend"
            // case 1 >> "Cancle Request"
            // case 2 >> "Friend"
            // case 3 >> "Accept"
            const status = res.content.status_number;

            setStatus(status);
        } catch (err) {
            console.log(err)
        }
    }

    const handleInteraction = (type) => {
        console.log(type)
        switch (type) {
            case 0:
                handleSendFriendRequest();
                break;
            case 1:
                handleCancleRequest();
                break;
            case 2:
                handleUnfriend();
                break;
            case 3:
                handleAcceptFriendReq();
                break;

            default:
                break;
        }
    }


    const handleSendFriendRequest = () => {
        if (!userState[0]) return message_error("You have to logged in to do this action!");
        if (userState[0].user_id.toString() === query.get("id").toString()) return message_error("You cannot send request to yourself!")

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

        socketActions.sendMessageToServer(data);

        checkFriendStatus(userInfo.user_id)
        message_success("Sent!");
    }


    const handleCancleRequest = () => {}


    const handleUnfriend = () => {}


    const handleAcceptFriendReq = () => {}


    return (
        <UserInfo
            userLoggedState={userState[0]}
            userInfo={userInfo}
            queryId={query.get("id").toString()}

            status={status}
            
            handleSendFriendRequest={handleSendFriendRequest}
            handleInteraction={handleInteraction}
        />
    )
}
