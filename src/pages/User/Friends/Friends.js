import React, { useEffect, useState } from 'react'
import "./Friends.css"

import { Col, Empty, Row, Tabs, Typography } from 'antd'
import Friend from './components/Friend';
import { useSelector } from 'react-redux';
import FriendRequest from './components/FriendRequest';
import SkeletonCustom from 'components/SkeletonCustom/SkeletonCustom';
import { socket } from 'socket/socketClient';
import EVENTS_NAME from 'socket/features/eventsName';
import Post from 'pages/Forum/features/Post';

export default function Friends({ listRequests, posts, totalFriends, listFriends, isLoading, selectedKey, setSelectedKey }) {
    const userState = useSelector((state) => state.userState);


    const AllPosts = () => (
        userState[0]
            ? <div>
                <div className="items-cont">
                    {posts.length
                        ? <>
                            {posts.map((post, i) => (
                                <Post postProp={post} key={i} width={"49%"} action={true} />
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
                <div className="items-cont">
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
                <div className="items-cont">
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
                    <Typography.Title level={4}>Your Activity</Typography.Title>

                    <Tabs className="friends-tabs" activeKey={selectedKey ? selectedKey : "all_friends"} setTabSelected={setSelectedKey}
                        onChange={(key) => {
                            if (key === "all_friends") {
                                window.history.replaceState(null, null, `/user/own/${key}`)
                            } else if (key === "posts") {
                                window.history.replaceState(null, null, `/user/own/${key}`)
                            }

                            setSelectedKey(key)
                        }}>
                        <Tabs.TabPane tab="Your Posts" key="posts">
                            <AllPosts />
                        </Tabs.TabPane>

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
