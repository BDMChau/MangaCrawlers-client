import React, { useEffect, useState } from 'react'
import "./UserInfo.css";

import { useHistory, useLocation } from 'react-router';
import UserInfo from './UserInfo';
import userApi from 'api/apis/MainServer/userApi';
import { socket, socketActions } from 'socket/socketClient';
import { message_error, message_success } from 'components/toast/message';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import EVENTS_NAME from 'socket/features/eventsName';
import { NavLink } from 'react-router-dom';
import redirectURI from 'helpers/redirectURI';

export default function UserInfoService() {
    const userState = useSelector((state) => state.userState);
    const stuffsState = useSelector((state) => state.stuffsState);

    const history = useHistory();
    const query = new URLSearchParams(useLocation().search);
    const queryVal = query.get("v");
    const queryUserId = query.get("id");

    const [userId, setUserId] = useState({});

    const [sent, setSent] = useState(false);

    const [userInfo, setUserInfo] = useState({});
    const [friends, setFriends] = useState([]);
    const [mutualFriends, setMutualFriends] = useState([]);
    const [posts, setPosts] = useState([]);

    const [fromFr, setFromFr] = useState(10);
    const [fromPost, setFromPost] = useState(0);
    const [isEndFr, setIsEndFr] = useState(false);
    const [isEndPost, setIsEndPost] = useState(false);

    const [status, setStatus] = useState("");

    const cookies = new Cookies();
    const token = cookies.get("token");


    useEffect(() => {
        if (queryUserId && !queryVal) history.push(`${redirectURI.userPage_uri(queryUserId)}&v=posts`)
    }, [queryUserId])


    useEffect(() => {
        if (Object.keys(userInfo).length) {
            socket.on(EVENTS_NAME.NOTIFY_ONLINE, (result) => {
                if (userInfo.user_id === result.sender_id) {
                    if (result.status_number === 1) setUserInfo({ ...userInfo, is_online: true });
                    else setUserInfo({ ...userInfo, is_online: false });
                }
            });
        }
    }, [userInfo])


    useEffect(() => {
        if (queryUserId) {
            setPosts([]);
            setFriends([]);
            setFromFr(0);
            setFromPost(0);
            setIsEndFr(false);
            setIsEndPost(false);

            setUserId(queryUserId);
        }
    }, [queryUserId])


    // get more data when user scroll at bottom page
    useEffect(() => {
        if (stuffsState[1] && stuffsState[0]) {
            if (queryVal === "posts") {
                getPosts(queryUserId);
            } else if (queryVal === "friends") {
                getFriends(queryUserId);
            } else if (queryVal === "mutual_friends") {
                // get all
            }
        }
    }, [stuffsState])


    useEffect(() => {
        if (userId && fromFr === 0 && fromPost === 0 && !isEndFr && !isEndPost) {
            getMuTualFriends(userId);
            getUserInfo(userId);
            getFriends(userId);
            getPosts(userId);
            checkFriendStatus(userId)
        }
    }, [fromFr, fromPost, userId, isEndFr, isEndPost])


    useEffect(() => {
        if (userState[0]) checkFriendStatus(queryUserId)
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


    const getFriends = async (id) => {
        if (isEndFr) return;

        const data = {
            user_id: id.toString(),
            from: fromFr,
            amount: 6
        }

        try {
            const res = await userApi.getFriendsOfUser(data);
            if (res.content.err) return;

            if (res.content.list_friends.length < 6) {
                setIsEndFr(true);
            }

            setFriends(prev => [...prev, ...res.content.list_friends]);
            setFromFr(res.content.from);
        } catch (err) {
            console.log(err);
        }
    }

    const getMuTualFriends = async (id) => {
        if(!token || !userState[0]) return;

        const data = { user_id: id.toString() }

        try {
            const res = await userApi.getMutualFriends(token, data);
            if (res.content.err) return;

            setMutualFriends(res.content.list_mutual);
        } catch (err) {
            console.log(err);
        }
    }

    const getPosts = async (id) => {
        if (isEndPost) return;

        const data = {
            user_id: id.toString(),
            from: fromPost,
            amount: 6
        }

        try {
            const res = await userApi.getPostsOfUser(data);
            if (res.content.err) return;

            if (res.content.posts.length < 6) {
                setIsEndPost(true);
            }

            setPosts(prev => [...prev, ...res.content.posts]);
            setFromPost(res.content.from);
        } catch (err) {
            console.log(err);
        }
    }



    //////////////////////// services ////////////////////////
    const checkFriendStatus = async (id) => {
        if (!userState[0]) return;

        const data = {
            to_user_id: id.toString()
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


    // controller
    const handleInteraction = (type) => {
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
            case 100:
                handleDeclineFriendReq();
                break;

            default:
                message_error("Error!")
                break;
        }
    }


    useEffect(() => {
        socket.on(EVENTS_NAME.SEND_OK, (result) => {
            setSent(true);
        });
    }, []);

    // when user sent a req successfully
    useEffect(() => {
        if (sent) {
            checkFriendStatus(userInfo.user_id)
            setSent(false);
        }
    }, [sent])


    const handleSendFriendRequest = () => {
        if (!userState[0]) return message_error("You have to logged in to do this action!");
        if (userState[0].user_id.toString() === queryUserId.toString()) return message_error("You cannot send request to yourself!")

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
    }


    // delete notification
    const handleCancleRequest = async () => {
        try {
            const res = await updateInteracted(1, 1, 1);
            if (!res) {
                message_error("Failed!");
                return;
            }

            checkFriendStatus(userInfo.user_id);
        } catch (err) {
            console.log(err);
        }
    }

    const handleUnfriend = async () => {
        const data = {
            to_user_id: userInfo.user_id.toString()
        };

        try {
            const res = await userApi.unfriend(token, data);
            if (res.content.err) {
                message_error("Failed!");
                return;
            }

            checkFriendStatus(userInfo.user_id);
            return;
        } catch (err) {
            console.log(err);
            message_error("Failed!");
        }
    }


    const handleAcceptFriendReq = async () => {
        try {
            const data = {
                to_user_id: userInfo.user_id.toString()
            };

            const response = await userApi.acceptFriendReq(token, data);
            if (response.content.err) {
                message_error("Failed!");
                return false;
            }

            message_success('Success');


            await updateInteracted(3, 2, 2);
            checkFriendStatus(userInfo.user_id)
            return true;
        } catch (err) {
            console.log(err)
            message_error("Failed!");
            return false;
        }
    }

    const handleDeclineFriendReq = async () => {
        try {
            const res = await updateInteracted(1, 2, 2);
            if (!res) {
                message_error("Failed!");
                return;
            }

            checkFriendStatus(userInfo.user_id);
        } catch (err) {
            console.log(err);

        }
    }




    // update interact notification
    const updateInteracted = async (action, type, cmdFrom) => {
        const data = {
            to_user_id: userInfo.user_id.toString(),
            target_title: "user",
            action: action, // 1: delete, 2: accept join team, 3: accept friend
            type: type, // 1: set delete true, 2: set interact true
            cmd_from: cmdFrom // 1: sender update, 2: reciever update
        };

        try {
            const res = await userApi.updateNotificationFrReq(token, data);
            if (res.content.err) return false;

            return true;
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div>
            <UserInfo
                userLoggedState={userState[0]}
                userInfo={userInfo}
                queryId={queryUserId.toString()}

                status={status}

                handleSendFriendRequest={handleSendFriendRequest}
                handleInteraction={handleInteraction}

                posts={posts}
                friends={friends}
                mutualFriends={mutualFriends}
            />
        </div>
    )
}
