import React, { useState, useEffect, useRef } from 'react';
import "../Navbar.css";
import { Button, Empty, Typography, Tooltip } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import Notification from './Notification';
import { useDispatch, useSelector } from 'react-redux';
import { SET_COUNT_UNREAD_NOTIFICATIONS } from 'store/features/stuffs/StuffsSlice';

import userApi from 'api/apis/MainServer/userApi';
import Cookies from 'universal-cookie';
import { format } from 'helpers/format';
import SkeletonCustom from 'components/SkeletonCustom/SkeletonCustom';
import { socket } from 'socket/socketClient';
import EVENTS_NAME from 'socket/features/eventsName';


function NotificationsService() {
    const userState = useSelector(state => state.userState);
    const dispatch = useDispatch()

    const [fromRow, setFromRow] = useState(0)
    const [notifications, setNotifications] = useState([])
    const [isEnd, setIsEnd] = useState(false)

    const scrollRef = useRef(null);

    const cookies = new Cookies();
    const token = cookies.get("token")


    // socket
    useEffect(() => {
        socket.on(EVENTS_NAME.FROM_SERVER_TO_SPECIFIC_USERS, (result) => {
            unshiftItem(result)
        });
    }, []);


    useEffect(() => {
        if (userState[0]) getListNotifications();
    }, [userState[0]])


    useEffect(() => {
        if (notifications.length) countUnreadNotifications();
    }, [notifications])


    const countUnreadNotifications = () => {
        dispatch(SET_COUNT_UNREAD_NOTIFICATIONS(notifications.filter(item => item.is_viewed === false).length))
    }


    const getListNotifications = async () => {
        if (!isEnd) {
            const data = {
                from: fromRow
            }

            try {
                const response = await userApi.getNotifications(token, data);
                console.log(response)
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


    ////////// scroll //////////
    useEffect(() => {
        let myRef = scrollRef.current;

        if (myRef) {
            const currentScroll = myRef.scrollTop + myRef.clientHeight;

            // when first loading
            myRef.scrollTop = 0;
        }
    })

    const getMoreHistoryNotifications = async (e) => {
        const bottom = e.target.scrollHeight - e.target.clientHeight;

        if (e.target.scrollTop === bottom) {
            let myRef = scrollRef.current;

            await getListNotifications();

            if (!isEnd) {
                myRef.scrollTop = bottom;
            }
        }
    }

    const unshiftItem = (item) => {
        setNotifications(prevState => [item, ...prevState]);
    }


    const readAll = async () => {
        const copy = [...notifications];

        copy.forEach(item => {
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


    return (
        <div style={{ minHeight: '50px' }}>
            <div className="notification-title">
                <Typography.Title level={3} >Notifications</Typography.Title>

                <Tooltip title='Read All'>
                    <Button
                        icon={<CheckOutlined style={{ fontSize: "23px", color: "#188CF9" }} />}
                        style={{
                            borderRadius: "50%",
                            border: "none",
                            marginLeft: "5px"
                        }}
                        onClick={() => readAll()}
                    />
                </Tooltip>
            </div>

            {notifications.length
                ? <div className="notifications-cont" onScroll={(e) => getMoreHistoryNotifications(e)} ref={scrollRef}>

                    {notifications.map((item, i) => (
                        <>
                            <Notification item={item} key={i} />
                        </>
                    ))}

                    {isEnd
                        ? ""
                        : <div style={{ width: '95%', margin: "0 10px", bottom: 0, position: 'relative' }}>
                            <SkeletonCustom
                                paragraphRows={1}
                                avatar={true}
                                avatarShape={'circle'}
                            />
                            <SkeletonCustom
                                paragraphRows={1}
                                avatar={true}
                                avatarShape={'circle'}
                            />
                        </div>}
                </div>
                : <Empty description="" style={{ padding: "15px", textAlign: "center" }} />}

        </div>
    )
}

export default NotificationsService;