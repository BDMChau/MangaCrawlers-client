import React, { useState, useEffect, memo } from 'react'
import Cookies from 'universal-cookie';

import { Menu, Badge, Popover } from 'antd'
import { BellOutlined } from "@ant-design/icons";
import Notifications from './Notifications';

import { useDispatch, useSelector } from 'react-redux';
import { SET_TRANSGROUP_ID } from 'store/features/user/UserSlice';
import { SET_INTERACT_NOTIFICATION } from "store/features/stuffs/StuffsSlice"

import { socket } from 'socket/socketClient';
import userApi from 'api/apis/MainServer/userApi';
import { format } from 'helpers/format';
import EVENTS_NAME from 'socket/features/eventsName';
import { message_error, message_success } from 'components/alerts/message';


function NotificationService({ isMobile }) {
    const stuffSlice = useSelector((state) => state.stuffsState);
    const notificationIdToUpdate = stuffSlice[1] ? stuffSlice[1] : null;

    const dispatch = useDispatch();

    const [fromRow, setFromRow] = useState(0)
    const [notifications, setNotifications] = useState([])
    const [badgeCount, setBadgeCount] = useState()

    const [isEnd, setIsEnd] = useState(false)
    const [visible, setVisible] = useState(false);
    const [isFirstRender, setIsFirstRender] = useState(true);

    const cookies = new Cookies();
    const token = cookies.get("token")



    // socket
    useEffect(() => {
        socket.on(EVENTS_NAME.FROM_SERVER_TO_SPECIFIC_USERS, (result) => {
            result.created_at = format.formatDate02(result.created_at);
            unshiftItem(result)
        });

        setIsFirstRender(false);
    }, []);



    useEffect(() => {
        if (!notifications.length) getListNotifications();
    }, [])


    // update interact in client
    useEffect(() => {
        if (notificationIdToUpdate) {
            const copy = notifications.map(item => ({ ...item }));
            for (let i = 0; i < copy.length; i++) {
                if (copy[i].notification_id === notificationIdToUpdate) {
                    copy[i].is_viewed = true;
                    copy[i].is_interacted = true;
                    break;
                }

            }

            setNotifications(copy);
            dispatch(SET_INTERACT_NOTIFICATION(null))
        }
    }, [notificationIdToUpdate])


    useEffect(() => {
        countUnreadNotifications();
    }, [notifications])


    useEffect(() => {
        if (badgeCount < 0) setBadgeCount(0);
    }, [badgeCount])


    const countUnreadNotifications = () => {
        setBadgeCount(notifications.filter(item => item.is_viewed === false).length)
    }


    const unshiftItem = (item) => {
        setNotifications(prevState => [item, ...prevState]);
    }


    //////////////// services api ////////////////
    const getListNotifications = async () => {
        if (!isEnd) {
            const data = {
                from: fromRow
            }

            try {
                const response = await userApi.getNotifications(token, data);

                if (response.content.msg) {
                    const notificationsList = response.content.notifications_list;
                    notificationsList.forEach(item => {
                        item.created_at = format.formatDate02(item.created_at);
                    });

                    if (notificationsList.length === 0 || notificationsList.length < 5) {
                        setIsEnd(true);
                        setNotifications(prev => [...prev, ...notificationsList]);
                        return;
                    }

                    setFromRow(response.content.fromRow);
                    setNotifications(prev => [...prev, ...notificationsList]);
                }
            } catch (err) {
                console.log(err)
            }
        }
    }


    const readAll = async () => {
        const copy = [...notifications];
        notifications.forEach(item => {
            item.is_viewed = true;
        })
        setNotifications(copy);

        // call to server
        try {
            await userApi.updateViewedNotifications(token);

        } catch (err) {
            console.log(err)
        }
    }


    const updateInteracted = async (id, action) => {
        try {
            const data = {
                notification_id: id.toString(),
                action: action
            };

            await userApi.updateInteractedNotification(token, data);

            dispatch(SET_INTERACT_NOTIFICATION(id))
            setBadgeCount(badgeCount - 1);
            return;
        } catch (err) {
            console.log(err)
        }
    }


    const handleAcceptInvitation = async (notificationId, targetId, targetTitle) => {
        setIsFirstRender(false);
        // call to server
        try {
            if (targetTitle === 'transgroup') {
                const data = {
                    transgroup_id: targetId.toString()
                };

                const response = await userApi.acceptInvitationToJoinTem(token, data);
                if (response.content.err) {
                    message_error('You were in a team, cannot join more than one in a time!', 4);
                    return false;
                }

                dispatch(SET_TRANSGROUP_ID(response.content.transgroup_id));
                setBadgeCount(badgeCount - 1);

                message_success('Joined ^^!');
            }

            await updateInteracted(notificationId, 2);
            return true;

        } catch (err) {
            console.log(err)
            message_error("Failed!");
            return false;
        }
    }

    const handleAcceptFriendReq = async (notificationId, senderId, targetTitle) => {
        setIsFirstRender(false);
        
        try {
            if (targetTitle === 'user') {
                const data = {
                    to_user_id: senderId.toString()
                };

                const response = await userApi.acceptFriendReq(token, data);
                if (response.content.err) {
                    message_error("Failed!");
                    return false;
                }

                setBadgeCount(badgeCount - 1);
                message_success('Success');
            }

            await updateInteracted(notificationId, 3);
            return true;
        } catch (err) {
            console.log(err)
            message_error("Failed!");
            return false;
        }
    }




    return (
        <Popover
            overlayClassName="popover-notification"
            style={{ position: "fixed" }}
            trigger="click"
            visible={visible}
            onVisibleChange={(e) => setVisible(e)}
            content={
                <Notifications
                    isFirstRender={isFirstRender}
                    getListNotifications={getListNotifications}
                    notifications={notifications}

                    isEnd={isEnd}

                    readAll={readAll}
                    updateInteracted={updateInteracted}

                    handleAcceptInvitation={handleAcceptInvitation}
                    handleAcceptFriendReq={handleAcceptFriendReq}
                />
            }
        >
            <Menu.Item key="notification" title="Notifications" icon={<BellOutlined style={{ fontSize: "22px" }} />} style={{ paddingTop: "3px" }} >
                {isMobile ? "Notifications" : ""}

                <Badge
                    count={badgeCount}
                    style={{
                        position: 'absolute',
                        right: isMobile ? '82px' : '0px',
                        marginTop: '-23px',
                    }}
                >
                </Badge>
            </Menu.Item>
        </Popover>
    )
}


export default memo(NotificationService);