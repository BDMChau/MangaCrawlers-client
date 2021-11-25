import React from 'react'
import "./PostDetail.css"

import MDEditor from '@uiw/react-md-editor';
import { Avatar, Button, Col, Divider, Row, Typography, Tooltip, Empty } from 'antd';
import { ArrowLeftOutlined, LikeOutlined, DislikeOutlined, PlusOutlined } from "@ant-design/icons"
import { useHistory } from 'react-router';
import Post from '../features/Post';
import Post02 from '../features/Post02';
import { format } from 'helpers/format';
import redirectURI from 'helpers/redirectURI';
import { NavLink } from 'react-router-dom';
import MyTag from "../features/MyTag";
import CommentService from 'components/Comment02/CommentService/CommentService';

import { useDispatch } from 'react-redux';
import { SET_QUOTED_POST } from 'store/features/forum/ForumSlice';


export default function PostDetail({
    postInfo,
    quotedPost,

    sttLike,

    likePost,
    unlikePost,

    dislikePost,
    unDislikePost,

    topLikePosts,
    topDislikePosts
}) {
    const dispatch = useDispatch();
    const history = useHistory();


    const handleRedirectToCreateNewPost = () => {
        dispatch(SET_QUOTED_POST(postInfo));

        history.push("/forums/newpost");
    }

    return (
        Object.keys(postInfo).length
            ? <div className="post-detail-page">
                <Row justify={"center"} className="row" >
                    <Col xs={23} md={23} xl={23} >
                        <Divider orientation="left" style={{ borderTopColor: "#a2a2a2", marginBottom: 0 }}>
                            <Button title="Back to forum page" className="btn-back" onClick={() => history.push("/forums")}>
                                <ArrowLeftOutlined style={{ fontSize: "20px", margin: "4px 0px 0px -6px" }} />
                            </Button>
                        </Divider>
                    </Col>

                    <Col className="post-detail" xs={22} md={22} xl={22}>
                        <div style={{ display: "flex", justifyContent: "space-between" }} >
                            <NavLink to={redirectURI.userPage_uri(postInfo.user_id)} className="post-owner">
                                <Avatar
                                    className="avatar"
                                    src={postInfo.user_avatar}
                                    title="Avatar"
                                    alt=""
                                    style={{ cursor: "pointer" }}
                                />

                                <div className="owner-info">
                                    <Typography.Title level={5} title={postInfo.user_name}>{postInfo.user_name}</Typography.Title>

                                    <Typography.Text className="date-created" title={format.formatDate02(postInfo.created_at)} >{format.relativeTime(postInfo.created_at)}</Typography.Text>
                                </div>

                            </NavLink>

                          
                        </div>

                        {Object.keys(quotedPost).length
                            ? <div style={{ marginBottom: "1.5rem", marginTop: "-1rem" }}>
                                <Typography.Text style={{ fontWeight: "400" }}>Quoted From:</Typography.Text>
                                <Post02 post={quotedPost} key={0} sttLike={true} width={"50%"} />
                            </div>
                            : ""
                        }

                        <Typography.Text style={{fontWeight:"500", fontSize:"24px" }} >{postInfo.title}</Typography.Text>

                        <div className="cates-cont">
                            {postInfo.categoryList?.length
                                ? postInfo.categoryList.map((item, i) => (
                                    <div className="category" key={i}>
                                        <MyTag category={item} key={i} />
                                    </div>
                                ))
                                : ""
                            }
                        </div>

                        <Divider orientation="left" style={{ margin: 0, marginBottom: "1rem" }} />

                        <MDEditor.Markdown
                            source={postInfo.content}
                        />
                    </Col>

                    <Col className="cmt-post-detail" xs={22} md={22} xl={22}>
                        <div>
                            <Button type="primary" style={{ float: "right", margin: "10px 0" }}
                                onClick={handleRedirectToCreateNewPost}
                            >
                                <PlusOutlined style={{ fontSize: "16px", marginBottom: "0px" }} />   Quote
                            </Button>
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

                        <Divider orientation="left" style={{ borderTopColor: "#a2a2a2", marginBottom: "20px", marginTop: "10px" }} />

                        <CommentService
                            targetTitle={"post"}
                            targetId={postInfo.post_id}
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
            : <div className="post-detail-page">
                <Row justify={"center"} className="row" >
                    <Empty description="Not found :(" style={{ marginTop: "12rem", color: "#8a8d92" }} />
                </Row>
            </div>

    )
}
