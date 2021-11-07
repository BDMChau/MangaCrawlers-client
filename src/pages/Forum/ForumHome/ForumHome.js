import React, { useRef, useState, useEffect } from 'react'
import "./ForumHome.css"

import MyTag from '../features/MyTag'
import Post from '../features/Post'

import { Col, Row, Typography } from 'antd'


export default function ForumHome({ categories, posts }) {
    const scrollRef = useRef();


    ////////// scroll //////////
    const handleScroll = (e) => {
        const scrollTop = e.target.scrollTop;
        const clientHeight = e.target.clientHeight;
        const scrollHeight = e.target.scrollHeight;

    
    }



    return (
        <div className="forum-home" >
            <Col span={24} className="banner" >
                <Typography.Title level={3}>MangaCrawlers Community Forums</Typography.Title>
            </Col>

            <Row justify="center" className="forum-home-body">
                <Col className="left" xs={24} md={14} xl={9}>
                    <Typography.Title level={3}>Newest</Typography.Title>
                    {posts.length
                        ? <div onScroll={(e) => handleScroll(e)} >
                            {
                                posts.map((post, i) => (
                                    <Post post={post} key={i} />

                                ))
                            }
                        </div>
                        : ""
                    }
                </Col>

                <Col className="right" xs={24} md={14} xl={7}>
                    <div>
                        <div className="trending-posts">
                            <Typography.Title level={4} style={{ marginTop: "5px" }} >Trending</Typography.Title>
                            {posts.length
                                ? posts.map((post, i) => (
                                    <Post post={post} key={i} smallSize={true} />
                                ))
                                : ""
                            }
                        </div>

                        <div className="categories-cont">
                            {categories.length
                                ? categories.map((item, i) => (
                                    <MyTag category={item} key={i} />
                                ))
                                : ""

                            }
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
