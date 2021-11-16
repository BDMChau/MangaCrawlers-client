import React, { useEffect } from 'react'
import "./CategoryPosts.css"
import "../ForumHome/ForumHome.css"

import { Button, Col, Divider, Row, Tag, Typography, Tooltip, Empty, Skeleton } from 'antd'
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons"

import Post from '../features/Post'
import { useHistory } from 'react-router'
import MyTag from '../features/MyTag'
import { NavLink } from 'react-router-dom'
import SkeletonCustom from 'components/SkeletonCustom/SkeletonCustom'

export default function CategoryPosts({ posts, total, isLoading, categories, category }) {
    const history = useHistory();

    return (
        <div className="forum-home" >
            <Col span={24} className="banner" >
                <Typography.Title level={3}>MangaCrawlers Community Forums</Typography.Title>

                <NavLink to="/forums/newpost" title="New Post" >
                    <Button
                        style={{ borderRadius: "8px", height: "35px" }}
                        type="primary"
                        icon={<PlusOutlined style={{ fontSize: "16px" }} />}
                    >
                        New Post
                    </Button>
                </NavLink>
            </Col>

            <Row justify="center" className="cate-posts">
                <Col xs={24} md={16} xl={14} style={{ marginBottom: "30px" }} >
                    <Divider orientation="left" style={{ borderTopColor: "#a2a2a2", margin: 0 }}>
                        <Button title="Back to forum page" className="btn-back" onClick={() => history.push("/forums")}>
                            <ArrowLeftOutlined style={{ fontSize: "20px", margin: "4px 0px 0px -6px" }} />
                        </Button>

                        {Object.keys(category).length !== 0
                            ? <Typography.Title level={5} className="title-h5">
                                <Tooltip title={category.name} className="item-tag">
                                    <Tag color={category.color === "none" ? "" : category.color}>{category.name}</Tag>
                                </Tooltip>
                            </Typography.Title>
                            : ""
                        }
                    </Divider>
                </Col>

                <Col className="left" xs={24} md={14} xl={12}>
                    <div className="categories-cont">
                        {categories.length
                            ? categories.map((item, i) => (
                                <MyTag category={item} key={i} />
                            ))
                            : ""
                        }
                    </div>

                    <div style={{ marginTop: "20px" }}>
                        <Typography.Title level={5}>{total} posts</Typography.Title>

                        {isLoading
                            ? <>
                                <Skeleton active paragraph={{ rows: 0 }} />
                                <Skeleton active paragraph={{ rows: 0 }} />
                                <Skeleton active paragraph={{ rows: 0 }} />
                                <Skeleton active paragraph={{ rows: 0 }} />
                                <Skeleton active paragraph={{ rows: 0 }} />
                                <Skeleton active paragraph={{ rows: 0 }} />
                                <Skeleton active paragraph={{ rows: 0 }} />
                            </>
                            : posts.length
                                ? posts.map((post, i) => (
                                    <Post post={post} key={i} renderContent={true} />
                                ))
                                : <Empty description="No posts!" image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ marginTop: "8rem", color: "#8a8d92" }} />


                        }
                    </div>
                </Col>


            </Row>
        </div>
    )
}
