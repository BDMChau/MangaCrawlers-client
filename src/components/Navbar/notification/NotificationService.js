import React, { useState, useEffect, memo } from 'react'
import Cookies from 'universal-cookie';

import { Menu, Badge, Popover } from 'antd'
import { BellOutlined } from "@ant-design/icons";
import NotificationsService from './Notifications';

import { useSelector } from 'react-redux';
import { socket } from 'socket/socketClient';
import userApi from 'api/apis/MainServer/userApi';
import { format } from 'helpers/format';
import EVENTS_NAME from 'socket/features/eventsName';


function NotificationService() {
    const userState = useSelector(state => state.userState);

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
            unshiftItem(result)
        });

        setIsFirstRender(false);
    }, []);



    useEffect(() => {
        if (userState[0]) getListNotifications();
    }, [userState[0]])


    useEffect(() => {
        countUnreadNotifications();
    }, [notifications])


    const countUnreadNotifications = () => {
        setBadgeCount(notifications.filter(item => item.is_viewed === false).length)
    }


    const getListNotifications = async () => {
        if (!isEnd) {
            const data = {
                from: fromRow
            }

            try {
                const response = await userApi.getNotifications(token, data);

                if (response.content.msg) {
                    const notificationsList = response.content.notifications_list;
                    if (notificationsList.length === 0 || notificationsList < 5) {
                        setIsEnd(true);
                        return;
                    }

                    notificationsList.forEach(item => {
                        item.created_at = format.formatDate02(item.created_at);
                    });

                    setFromRow(response.content.fromRow);
                    setNotifications(prev => [...prev, ...notificationsList]);
                }
            } catch (err) {
                console.log(err)
            }
        }
    }



    const unshiftItem = (item) => {
        setNotifications(prevState => [item, ...prevState]);
    }



    //////////////// services api ////////////////
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


    const updateInteracted = async (id) => {
        try {
            const data = {
                notification_id: id.toString()
            };

            await userApi.updateInteractedNotification(token, data);
            return;
        } catch (err) {
            console.log(err)
        }
    }


    const handleAcceptInvitation = async (notificationId, targetId, targetTitle) => {
        setIsFirstRender(false);
        // call to server
        try {
            const data = {
                notification_id: notificationId.toString()
            };

            await userApi.acceptInvitation(token, data);

            await updateInteracted(notificationId);
            return;
        } catch (err) {
            console.log(err)
        }
    }




    return (
        <Popover
            overlayClassName="popover-notification"
            style={{ background: "red" }}
            trigger="click"
            visible={visible}
            onVisibleChange={(e) => setVisible(e)}
            content={
                <NotificationsService
                    isFirstRender={isFirstRender}
                    getListNotifications={getListNotifications}
                    notifications={notifications}

                    isEnd={isEnd}

                    readAll={readAll}
                    updateInteracted={updateInteracted}
                    handleAcceptInvitation={handleAcceptInvitation}
                />
            }
        >
            <Menu.Item key="notification" title="Notifications" >
                <Badge count={badgeCount} >
                    <BellOutlined style={{ fontSize: "20px" }} />
                </Badge>
            </Menu.Item>
        </Popover>
    )
}


export default memo(NotificationService);