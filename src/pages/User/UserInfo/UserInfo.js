import React, { useEffect, useState } from 'react'
import "./UserInfo.css";

import { Col, Row, Typography, Button, Empty, Divider, Dropdown, Menu, Tabs } from 'antd';
import { UserAddOutlined, } from '@ant-design/icons';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import FriendsModal from '../Friends/components/FriendsModal';

import { LeftOutlined, FieldTimeOutlined } from "@ant-design/icons"

import redirectURI from 'helpers/redirectURI';
import Post from 'pages/Forum/features/Post';
import SkeletonCustom from 'components/SkeletonCustom/SkeletonCustom';
import Friend from '../Friends/components/Friend';

export default function UserInfo({ userLoggedState, userInfo, queryId, status, handleSendFriendRequest, handleInteraction, posts }) {
    const [visibleMutualModal, setVisibleMutualModal] = useState(false);
    const [tabSelected, setTabSelected] = useState(null);

    const history = useHistory();
    const query = new URLSearchParams(useLocation().search);
    const queryVal = query.get("v");


    const [friends] = useState([

        {
            user_email: "BroadcastChannel.com",
            user_avatar: "https://anhdepfree.com/wp-content/uploads/2020/05/hinh-anh-bao-ve-moi-truong-y-nghia.jpg",
            user_name: "ACASCACWAVAV",
            user_id: "asccacsc"
        },
        {
            user_email: "BroadcastChannel.com",
            user_avatar: "https://anhdepfree.com/wp-content/uploads/2020/05/hinh-anh-bao-ve-moi-truong-y-nghia.jpg",
            user_name: "ACASCACWAVAV",
            user_id: "asccacsc"
        },
        {
            user_email: "BroadcastChannel.com",
            user_avatar: "https://anhdepfree.com/wp-content/uploads/2020/05/hinh-anh-bao-ve-moi-truong-y-nghia.jpg",
            user_name: "ACASCACWAVAV",
            user_id: "asccacsc"
        },
    ])


    const dropDownItem01 = (
        <Menu style={{ borderRadius: "10px" }}>
            <Menu.Item key="0" style={{ borderRadius: "8px" }} onClick={() => handleInteraction(status)} >
                Cancle Request
            </Menu.Item>
        </Menu>
    );

    const dropDownItem02 = (
        <Menu style={{ borderRadius: "10px" }}>
            <Menu.Item key="0" style={{ borderRadius: "8px" }} onClick={() => handleInteraction(status)} >
                Unfriend
            </Menu.Item>
        </Menu>
    );

    const FriendStt = () => {
        switch (status) {
            case 0:
                return (
                    <Button
                        style={{ marginTop: "20px", width: 'fit-content', height: "35px" }}
                        type="primary"
                        icon={<UserAddOutlined style={{ fontSize: "16px" }} />}
                        onClick={() => handleInteraction(status)}
                    >
                        Add Friend
                    </Button>
                );
            case 1:
                return (
                    <Dropdown overlay={dropDownItem01} trigger={['click']}>
                        <Button
                            icon={<FieldTimeOutlined style={{ fontSize: "16px" }} />}
                            type="primary"
                        >
                            Pending
                        </Button>
                    </Dropdown>
                )
            case 2:
                return (
                    <Dropdown overlay={dropDownItem02} trigger={['click']}>
                        <Button
                            type="primary"
                        >
                            Friend
                        </Button>
                    </Dropdown>
                )
            case 3:
                return (
                    <div style={{ display: "flex" }}>
                        <Button
                            style={{ marginTop: "20px", width: 'fit-content', height: "32px", marginRight: "5px" }}
                            type="danger"
                            onClick={() => handleInteraction(100)}
                        >
                            Cancle
                        </Button>

                        <Button
                            style={{ marginTop: "20px", width: 'fit-content', height: "32px" }}
                            type="primary"
                            onClick={() => handleInteraction(status)}
                        >
                            Accept
                        </Button>
                    </div>
                )

            default:
                return <></>
        }
    }



    const renderPosts = () => (
        <div className="posts">
            {posts.length
                ? posts.map(post => (
                    <Post post={post} width={"48%"} />
                ))
                : <>
                    <SkeletonCustom paragraphRows={15} />
                </>

            }
        </div>
    )

    const renderFriends = () => (
        <div className="friends">
            {friends.length
                ? friends.map(fr => (
                    <Friend friend={fr} isHidden={true} />
                ))
                : <>
                    <SkeletonCustom paragraphRows={15} />
                </>

            }
        </div>
    )


    return (
        <Row justify="center" className="user-info-page">
            <Col xs={23} sm={18} md={18} xl={13} className="col01">
                <Divider orientation="left" style={{ borderTopColor: "#a2a2a2", marginBottom: 0 }}>
                    <Button title="Go Back" className="btn-left" onClick={history.goBack} >
                        <LeftOutlined style={{ fontSize: "20px", margin: "4px 0px 0px -6px" }} />
                    </Button>
                </Divider>

                {/* && userInfo.user_id !== userLoggedState.user_id */}
                {Object.keys(userInfo).length > 0
                    ? <>
                        <div className="info-cont">
                            <div className="avatar" style={{ backgroundImage: `url(${userInfo.user_avatar})` }} ></div>

                            <div className="info">
                                <Typography.Title level={3} style={{ margin: 0 }}>{userInfo.user_name}</Typography.Title>
                                <Typography.Text style={{ color: "#747373", fontSize: "16px" }}>{userInfo.user_email}</Typography.Text>

                                <NavLink to="#" className="mutual-text" onClick={() => setVisibleMutualModal(true)} >
                                    100 mutual friends
                                </NavLink>

                                <Typography.Text style={{ color: "#747373" }}>
                                    Team:&nbsp;
                                    <NavLink to={redirectURI.userPage_uri(userInfo.user_id)}>
                                        {userInfo.transgroup_name ? userInfo.transgroup_name : "Unknown"}
                                    </NavLink>
                                </Typography.Text>

                                <Typography.Text style={{ color: "#747373" }}>
                                    {userInfo.user_desc ? userInfo.user_desc : ""}
                                </Typography.Text>

                                {userLoggedState?.user_id.toString() === queryId
                                    ? ""
                                    : <div style={{ marginTop: "10px" }}>
                                        <FriendStt />
                                    </div>
                                }
                            </div>
                        </div>

                        <Col xs={24} sm={24} xl={24} className="col02">

                            <Tabs activeKey={queryVal ? queryVal : "posts"} setTabSelected={setTabSelected}
                                onChange={(key) => {
                                    history.push(`${redirectURI.userPage_uri(userInfo.user_id)}&v=${key}`)
                                    setTabSelected(key)
                                }}
                            >
                                <Tabs.TabPane tab="Recently Posts" key="posts">
                                    <div className="posts-cont">
                                        {renderPosts()}
                                    </div>
                                </Tabs.TabPane>

                                <Tabs.TabPane tab="Friends" key="friends">
                                    <div className="friends-cont">
                                        {renderFriends()}
                                    </div>
                                </Tabs.TabPane>

                                <Tabs.TabPane tab="Mutual Friends" key="mutual_friends">
                                    <div className="friends-cont">
                                        {renderFriends()}
                                    </div>
                                </Tabs.TabPane>
                            </Tabs>

                        </Col>
                    </>
                    : <Empty description="" style={{ paddingTop: "80px" }} />
                }
            </Col>

            <FriendsModal visibleProp={visibleMutualModal} closeModal={(status) => setVisibleMutualModal(status)} title="Mutual Friends" />
        </Row>
    )
}
