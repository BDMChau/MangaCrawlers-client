import React, { useRef, useState, useEffect } from 'react'
import "./ForumHome.css"

import MyTag from '../features/MyTag'
import Post from '../features/Post'

import { Button, Col, Row, Typography } from 'antd'

import { PlusOutlined } from "@ant-design/icons"
import { NavLink } from 'react-router-dom'
import { enquireScreen, unenquireScreen } from 'enquire-js'
import SkeletonCustom from 'components/SkeletonCustom/SkeletonCustom'


export default function ForumHome({ categories, posts, isLoading, postsTopCmts, postsRandom }) {
    const [isMobile, setIsMobile] = useState(false);

    const scrollRef = useRef();

    // check mobile device
    useEffect(() => {
        const enquireHandler = enquireScreen(mobile => {
            if (mobile === true) setIsMobile(mobile);
            else setIsMobile(false)
        }, "only screen and (min-width: 300px) and (max-width: 1190px)")

        return () => unenquireScreen(enquireHandler);
    }, [])



    const renderRight = () => (
        <div>
            <div className="trending-posts" style={{ marginBottom: "2.7rem" }} >
                <Typography.Title level={5} style={{ marginTop: "10px" }} >Trending</Typography.Title>
                {postsTopCmts.length
                    ? postsTopCmts.map((post, i) => (
                        <Post post={post} key={i} smallSize={true} />
                    ))
                    : ""
                }
            </div>

            <div className="trending-posts">
                <Typography.Title level={5} style={{ marginTop: "5px" }} >Maybe you like</Typography.Title>
                {postsRandom.length
                    ? postsRandom.map((post, i) => (
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
    )

    const renderLeft = () => (
        <>
            <Typography.Title level={3}>Newest</Typography.Title>
            {posts.length
                ? <div onScroll={(e) => handleScroll(e)} >
                    <>
                        {posts.map((post, i) => (
                            <Post post={post} key={i} />

                        ))}

                        {isLoading
                            ? <SkeletonCustom paragraphRows={5} />
                            : ""
                        }
                    </>

                </div>
                : ""
            }
        </>
    )


    return (
        <div className="forum-home" >
            <Col span={24} className="banner" >
                <Typography.Title level={3}>MangaCrawlers Community Forums</Typography.Title>

                <NavLink to="/forum/newpost" title="New Post" >
                    <Button
                        style={{ borderRadius: "8px", height: "35px" }}
                        type="primary"
                        icon={<PlusOutlined style={{ fontSize: "16px" }} />}
                    >
                        New Post
                    </Button>
                </NavLink>
            </Col>

            <Row justify="center" className="forum-home-body">
                <Col className="left" xs={24} md={18} xl={9}>
                    {isMobile ? renderRight() : renderLeft()}
                </Col>

                <Col className="right" xs={24} md={18} xl={7}>
                    {isMobile ? renderLeft() : renderRight()}
                </Col>
            </Row>
        </div>
    )
}
