import React, { useEffect, useState } from 'react'
import "./UserInfo.css";

import { Col, Image, Row, Typography, Button, Empty, Divider } from 'antd';
import { UserAddOutlined, MinusOutlined } from '@ant-design/icons';
import { NavLink, useHistory } from 'react-router-dom';
import FriendsModal from '../Friends/components/FriendsModal';
import { LeftOutlined } from "@ant-design/icons"
import redirectURI from 'helpers/redirectURI';

export default function UserInfo({ userLoggedState, userInfo, queryId, status, handleSendFriendRequest }) {
    const [visibleMutualModal, setVisibleMutualModal] = useState(false)
    const [visibleFriendsModal, setVisibleFriendsModal] = useState(false)

    const history = useHistory();

    useEffect(() => {
        console.log(userInfo)
    }, [userInfo])


    const FriendStt = () => {

        return(
            <Button
            style={{ marginTop: "20px", width: 'fit-content', height: "35px" }}
            type="primary"
            icon={<UserAddOutlined style={{ fontSize: "16px" }} />}
            onClick={handleSendFriendRequest}
        >
            {status}
        </Button>

        )
    }


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
                                    : FriendStt()
                                }
                            </div>
                        </div>

                        <div className="posts-cont">
                            <Typography.Title level={4} style={{ margin: "0 0 10px 7px" }}>Recently  Posts</Typography.Title>
                            <div className="posts">
                                <img src="https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg" alt="" />
                                <img src="https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg" alt="" />
                                <img src="https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg" alt="" />
                                <img src="https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg" alt="" />
                                <img src="https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg" alt="" />
                                <img src="https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg" alt="" />
                                <img src="https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg" alt="" />
                                <img src="https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg" alt="" />
                                <img src="https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg" alt="" />
                            </div>
                        </div>
                    </>
                    : <Empty description="" style={{ paddingTop: "80px" }} />
                }
            </Col>

            <FriendsModal visibleProp={visibleMutualModal} closeModal={(status) => setVisibleMutualModal(status)} title="Mutual Friends" />
        </Row>
    )
}
