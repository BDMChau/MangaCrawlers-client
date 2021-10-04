import React, { useState, useEffect, memo } from 'react'
import Cookies from 'universal-cookie';

import { Menu, Badge, Popover } from 'antd'
import { BellOutlined } from "@ant-design/icons";
import NotificationsService from './Notifications';

import { useDispatch, useSelector } from 'react-redux';
import { SET_TRANSGROUP_ID } from 'store/features/user/UserSlice';

import { socket } from 'socket/socketClient';
import userApi from 'api/apis/MainServer/userApi';
import { format } from 'helpers/format';
import EVENTS_NAME from 'socket/features/eventsName';
import { message_error, message_success } from 'components/alerts/message';


function NotificationService({ isMobile }) {
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
            unshiftItem(result)
        });

        setIsFirstRender(false);
    }, []);



    useEffect(() => {
        getListNotifications();
    }, [])


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
                message_success('Joined ^^!');
            }

            await updateInteracted(notificationId);
            return true;
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