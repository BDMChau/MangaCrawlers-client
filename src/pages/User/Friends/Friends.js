import React, { useEffect, useState } from 'react'
import "./Friends.css"

import { Col, Empty, Row, Tabs, Typography } from 'antd'
import Friend from './components/Friend';
import { useSelector } from 'react-redux';
import FriendRequest from './components/FriendRequest';
import SkeletonCustom from 'components/SkeletonCustom/SkeletonCustom';
import { socket } from 'socket/socketClient';
import EVENTS_NAME from 'socket/features/eventsName';

export default function Friends({ listRequests, totalFriends, listFriends, isLoading, selectedKey, setSelectedKey }) {
    const userState = useSelector((state) => state.userState);


    const AllFriends = () => (
        listFriends.length
            ? <div>
                <Typography.Text
                    style={{
                        fontWeight: "500",
                        fontSize: "16px",
                        margin: "0px 0 0px 6px"
                    }}
                >
                    {totalFriends} friends
                </Typography.Text>
                <div className="all-friends">
                    <>
                        {listFriends.map((item, i) => (
                            <Friend friend={item} i={i} />
                        ))}

                        {isLoading
                            ? <SkeletonCustom paragraphRows={3} />
                            : ""
                        }
                    </>

                </div>
            </div>
            : <Empty description="" style={{ marginTop: "80px" }} />
    )



    const AllFriendRequests = () => (
        userState[0]
            ? <div>
                <div className="all-friends">
                    {listRequests.length
                        ? <>
                            {listRequests.map((request, i) => (
                                <FriendRequest requestProp={request} i={i} />
                            ))}

                            {isLoading
                                ? <SkeletonCustom paragraphRows={3} />
                                : ""
                            }
                        </>

                        : <Empty description="" style={{ margin: "0 auto", marginTop: "80px" }} />
                    }

                </div>
            </div>
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
                                window.history.replaceState(null, null, `/user/friends/${key}`)
                            } else {
                                window.history.replaceState(null, null, `/user/friends/${key}`)
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
