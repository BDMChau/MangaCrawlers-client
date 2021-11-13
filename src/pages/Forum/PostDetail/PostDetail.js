import React from 'react'
import "./PostDetail.css"

import MDEditor from '@uiw/react-md-editor';
import CommentContainter from 'components/Comment02/CommentContainter/CommentContainter';
import { Avatar, Button, Col, Divider, Row, Typography, Tooltip } from 'antd';
import { LeftOutlined, LikeOutlined, DislikeOutlined } from "@ant-design/icons"
import { useHistory } from 'react-router';
import Post from '../features/Post';
import Post02 from '../features/Post02';

export default function PostDetail({
    postInfo,
    sttLike,

    likePost,
    unlikePost,

    dislikePost,
    unDislikePost,

    topLikePosts,
    topDislikePosts
}) {
    const history = useHistory();

    return (
        <div className="post-detail-page">
            <Row justify={"center"} className="row" >
                <Col xs={23} md={23} xl={23} >
                    <Divider orientation="left" style={{ borderTopColor: "#a2a2a2", marginBottom: 0 }}>
                        <Button title="Back" className="btn-back" onClick={() => history.goBack()}>
                            <LeftOutlined style={{ fontSize: "20px", margin: "4px 0px 0px -6px" }} />
                        </Button>
                    </Divider>
                </Col>

                <Col className="post-detail" xs={22} md={22} xl={22}>
                    <div style={{ display: "flex", justifyContent: "space-between" }} >
                        <div className="post-owner">
                            <Avatar className="avatar" src={postInfo.user_avatar} title="Avatar" alt="" />

                            <div className="owner-info">
                                <Typography.Title level={5} title={postInfo.user_name}>{postInfo.user_name}</Typography.Title>
                                <Typography.Text className="date-created" >{postInfo.created_at}</Typography.Text>
                            </div>

                        </div>

                        <div className="interact">
                            <div style={{ marginRight: "15px" }} >
                                <Tooltip title={sttLike !== 1 ? "I like this" : ""} >
                                    <Button className="btn-like-dislike" onClick={() => sttLike === 1 ? unlikePost() : likePost()}
                                        icon={
                                            <LikeOutlined style={{ fontSize: "20px", color: sttLike === 1 ? "#1890FF" : "unset" }} />
                                        }
                                    />
                                </Tooltip>
                                <Typography.Text>{postInfo.likes}</Typography.Text>
                            </div>

                            <div>
                                <Tooltip title={sttLike !== 2 ? "I dislike this" : ""} >
                                    <Button className="btn-like-dislike" onClick={() => sttLike === 2 ? unDislikePost() : dislikePost()}
                                        icon={
                                            <DislikeOutlined style={{ fontSize: "20px", color: sttLike === 2 ? "#80808080" : "unset" }} />
                                        }
                                    />
                                </Tooltip>
                                <Typography.Text>{postInfo.dislikes}</Typography.Text>
                            </div>
                        </div>
                    </div>

                    <Typography.Title level={4}>{postInfo.title}</Typography.Title>
                    <Divider orientation="left" style={{ margin: 0, marginBottom: "30px" }} />

                    <MDEditor.Markdown
                        source={postInfo.content}
                    />
                </Col>

                <Col className="cmt-post-detail" xs={22} md={22} xl={22}>
                    <Divider orientation="left" style={{ borderTopColor: "#a2a2a2", marginBottom: "30px" }} />

                    <CommentContainter
                        postId={postInfo.post_id}
                    />
                </Col>

                <Col className="more-posts" xs={22} md={11} xl={11}>
                    <Typography.Title level={5} style={{ padding: "0 5px" }} >Hot Topics</Typography.Title>
                    {topLikePosts.map(post => (
                        <Post02 post={post} sttLike={true} />
                    ))}
                </Col>

                <Col className="more-posts" xs={22} md={11} xl={11}>
                    <Typography.Title level={5} style={{ padding: "0 5px" }} >Down Votes</Typography.Title>
                    {topDislikePosts.map(post => (
                        <Post02 post={post} sttLike={false} />
                    ))}
                </Col>
            </Row>
        </div>
    )
}
