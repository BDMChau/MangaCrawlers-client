import React, { useEffect, useState } from 'react'
import "./UserInfo.css";

import { Col, Image, Row, Typography, Button } from 'antd';
import { UserAddOutlined, MinusOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import MultualFriendsModal from '../Friends/components/MultualFriendsModal';

export default function UserInfo() {
    const [visibleMutualModal, setVisibleMutualModal] = useState(false)

    useEffect(() => {
        console.log(visibleMutualModal)
    }, [visibleMutualModal])

    return (
        <Row justify="center" className="user-info-page">
            <Col xs={23} sm={18} md={18} xl={13} className="col01">
                <div className="info-cont">
                    <Image
                        className="avatar"
                        src="https://internationalnewsagency.org/wp-content/uploads/2021/07/Tsuki-ga-Michibiku-Isekai-Douchuu-1200x675.jpg"
                        alt=""
                    />

                    <div className="info">
                        <Typography.Title level={3} style={{ margin: 0 }}>Minh Chou</Typography.Title>
                        <Typography.Text style={{ color: "#747373", fontSize: "16px" }}>bdmchau105@gmail.com</Typography.Text>

                        <NavLink to="#" className="mutual-text" onClick={() => setVisibleMutualModal(true)} >
                            100 mutual friends
                        </NavLink>

                        <Typography.Text style={{ color: "#747373" }}>
                            Team:
                            <NavLink to="#"> Unknown</NavLink>
                        </Typography.Text>

                        <Typography.Text style={{ color: "#747373" }}>
                            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on
                        </Typography.Text>

                        <Button
                            style={{ marginTop: "20px", width: 'fit-content' }}
                            type="primary"
                            icon={<UserAddOutlined style={{ fontSize: "16px" }} />}
                        >
                            Add Friend
                        </Button>
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
            </Col>

            <MultualFriendsModal visibleProp={visibleMutualModal} closeModal={(status) => setVisibleMutualModal(status)} />
        </Row>
    )
}
