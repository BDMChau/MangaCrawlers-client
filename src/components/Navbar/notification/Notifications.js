import React, { useEffect, useRef } from 'react';
import "../Navbar.css";
import { Button, Empty, Typography, Tooltip } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import Notification from './Notification';

import SkeletonCustom from 'components/SkeletonCustom/SkeletonCustom';


function Notifications({isFirstRender, getListNotifications, notifications, isEnd, readAll }) {
    const scrollRef = useRef(null);


    ////////// scroll //////////
    useEffect(() => {
        let myRef = scrollRef.current;

        if (myRef) {
            // when first loading
            if(isFirstRender) myRef.scrollTop = 0;
            else myRef.scrollTop = myRef.scrollTop;
        }
    })


    const getMoreHistoryNotifications = async (e) => {
        const bottom = e.target.scrollHeight - e.target.clientHeight;

        if (e.target.scrollTop >= bottom - 20) {
            let myRef = scrollRef.current;

            await getListNotifications();

            if (!isEnd) {
                myRef.scrollTop = bottom;
            }
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

export default Notifications;