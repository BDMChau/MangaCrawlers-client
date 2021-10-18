import React, { useState } from 'react'
import "./Friends.css"

import { Col, Empty, Row, Tabs, Typography } from 'antd'
import Friend from './components/Friend';
import { useSelector } from 'react-redux';

export default function Friends({ userId, selectedKey, setSelectedKey }) {
    const userState = useSelector((state) => state.userState);

    const [friends, setFriends] = useState([
        {
            "user_name": "Minh Chau Minhhh Minhhh Minhhh MinhhhMinhhh",
            "status": "Friend",
            "user_avatar": "https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
        },
        {
            "user_name": "Minh Chau Minh",
            "status": "Friend",
            "user_avatar": "https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
        },
        {
            "user_name": "Minh Chau Minh",
            "status": "Friend",
            "user_avatar": "https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
        },
        {
            "user_name": "Minh Chau Minh",
            "status": "Friend",
            "user_avatar": "https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
        },
        {
            "user_name": "Minh Chau Minh",
            "status": "Friend",
            "user_avatar": "https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
        },
        {
            "user_name": "Minh Chau Minh",
            "status": "Friend",
            "user_avatar": "https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
        },
        {
            "user_name": "Minh Chau Minh",
            "status": "Friend",
            "user_avatar": "https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
        },
        {
            "user_name": "Minh Chau Minh",
            "status": "Friend",
            "user_avatar": "https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
        },
        {
            "user_name": "Minh Chau Minh",
            "status": "Friend",
            "user_avatar": "https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
        },
        {
            "user_name": "Minh Chau Minh",
            "status": "Friend",
            "user_avatar": "https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
        },
        {
            "user_name": "Minh Chau Minh",
            "status": "Friend",
            "user_avatar": "https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
        },
        {
            "user_name": "Minh Chau Minh",
            "status": "Friend",
            "user_avatar": "https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
        },
        {
            "user_name": "Minh Chau Minh",
            "status": "Friend",
            "user_avatar": "https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
        },
        {
            "user_name": "Minh Chau Minh",
            "status": "Friend",
            "user_avatar": "https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
        },
    ]);



    const AllFriends = () => (
        <>
            <Typography.Text
                style={{
                    fontWeight: "500",
                    fontSize: "16px",
                    margin: "0px 0 0px 6px"
                }}
            >
                100 friends
            </Typography.Text>
            <div className="all-friends">
                {friends.length
                    ? friends.map((item, i) => (
                        <Friend friend={item} i={i} />
                    ))
                    : ""

                }
            </div>
        </>
    )



    const AllRequests = () => (
        userState[0]
            ? <div>acacasc</div>
            : <Empty description="" style={{ marginTop: "80px" }} />

    )



    return (
        <Row justify="center" className="friends" >
            <Col xs={23} sm={22} xl={18} className="friends-body" >
                <div className="title">
                    <Typography.Title level={4}>Friends</Typography.Title>

                    <Tabs className="friends-tabs" activeKey={selectedKey ? selectedKey : "all_friends"} setTabSelected={setSelectedKey}
                        onChange={(key) => {
                            if (key === "all_friends") {
                                window.history.replaceState(null, null, `/${userId}/friends/${key}`)
                            } else {
                                window.history.replaceState(null, null, `/${userId}/friends/${key}`)
                            }

                            setSelectedKey(key)
                        }}>
                        <Tabs.TabPane tab="All Friends" key="all_friends">
                            <AllFriends />
                        </Tabs.TabPane>

                        <Tabs.TabPane tab="Friend Requests" key="friend_requests">
                            <AllRequests />
                        </Tabs.TabPane>
                    </Tabs>

                </div>
            </Col>
        </Row>
    )
}
