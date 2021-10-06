import React, { useState } from 'react'
import "./Friends.css"

import { Col, Row, Tabs, Typography } from 'antd'
import Friend from './components/Friend';

export default function Friends() {
    const [selectedKey, setSelectedKey] = useState(null);
    const [friends, setFriends] = useState([
        {
            "user_name":"Minh Chau Minhhh Minhhh Minhhh MinhhhMinhhh",
            "status": "Friend",
            "user_avatar": "https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
        },
        {
            "user_name":"Minh Chau Minh",
            "status": "Friend",
            "user_avatar": "https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
        },
        {
            "user_name":"Minh Chau Minh",
            "status": "Friend",
            "user_avatar": "https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
        },
        {
            "user_name":"Minh Chau Minh",
            "status": "Friend",
            "user_avatar": "https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
        },
        {
            "user_name":"Minh Chau Minh",
            "status": "Friend",
            "user_avatar": "https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
        },
        {
            "user_name":"Minh Chau Minh",
            "status": "Friend",
            "user_avatar": "https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
        },
        {
            "user_name":"Minh Chau Minh",
            "status": "Friend",
            "user_avatar": "https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
        },
        {
            "user_name":"Minh Chau Minh",
            "status": "Friend",
            "user_avatar": "https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
        },
        {
            "user_name":"Minh Chau Minh",
            "status": "Friend",
            "user_avatar": "https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
        },
        {
            "user_name":"Minh Chau Minh",
            "status": "Friend",
            "user_avatar": "https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
        },
        {
            "user_name":"Minh Chau Minh",
            "status": "Friend",
            "user_avatar": "https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
        },
        {
            "user_name":"Minh Chau Minh",
            "status": "Friend",
            "user_avatar": "https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
        },
        {
            "user_name":"Minh Chau Minh",
            "status": "Friend",
            "user_avatar": "https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
        },
        {
            "user_name":"Minh Chau Minh",
            "status": "Friend",
            "user_avatar": "https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
        },
    ]);



    const AllFriends = () => (
        <div className="all-friends">
            {friends.length 
            ? friends.map((item, i) => (
                <Friend friend={item} i={i} />
            ))
            :""

            }
        </div>
    )



    const AllRequests = () => (
        <div></div>
    )



    return (
        <Row justify="center" className="friends" >
            <Col xs={23} sm={22} xl={18} className="friends-body" >
                <div className="title">
                    <Typography.Title level={4}>Friends</Typography.Title>

                    <Tabs className="friends-tabs" defaultActiveKey={selectedKey} onChange={(e) => setSelectedKey(e)}>
                        <Tabs.TabPane tab="All Friends" key="1">
                            <AllFriends />
                        </Tabs.TabPane>

                        <Tabs.TabPane tab="Friend Requests" key="2">
                            <AllRequests />
                        </Tabs.TabPane>
                    </Tabs>

                </div>
            </Col>
        </Row>
    )
}
