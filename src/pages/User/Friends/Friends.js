import React, { useEffect, useState } from 'react'
import "./Friends.css"

import { Col, Empty, Row, Tabs, Typography } from 'antd'
import Friend from './components/Friend';
import { useSelector } from 'react-redux';
import FriendRequest from './components/FriendRequest';

export default function Friends({ userId, listRequests, listFriends, selectedKey, setSelectedKey }) {
    const userState = useSelector((state) => state.userState);

    

    const AllFriends = () => (
        listFriends.length
            ? <>
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
                    {listFriends.map((item, i) => (
                        <Friend friend={item} i={i} />
                    ))}

                </div>
            </>
            : <Empty description="" style={{ marginTop: "80px" }} />
    )



    const AllFriendRequests = () => (
        userState[0]
            ? <>
                <div className="all-friends">
                    {listRequests.length
                        ? listRequests.map((request, i) => (
                            <FriendRequest requestProp={request} i={i} />
                        ))

                        : <Empty description="" style={{ margin:"0 auto", marginTop: "80px" }} />
                    }

                </div>
            </>
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
                                window.history.replaceState(null, null, `/user/${userId}/friends/${key}`)
                            } else {
                                window.history.replaceState(null, null, `/user/${userId}/friends/${key}`)
                            }

                            setSelectedKey(key)
                        }}>
                        <Tabs.TabPane tab="All Friends" key="all_friends">
                            <AllFriends />
                        </Tabs.TabPane>

                        <Tabs.TabPane tab="Friend Requests" key="friend_requests">
                            <AllFriendRequests />
                        </Tabs.TabPane>
                    </Tabs>

                </div>
            </Col>
        </Row>
    )
}
