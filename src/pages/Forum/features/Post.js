import React, { useState, useEffect } from 'react'
import "../ForumHome/ForumHome.css"

import { Avatar, Typography, Menu, Tooltip, Button, Dropdown } from 'antd'
import { EllipsisOutlined } from "@ant-design/icons";
import { NavLink } from 'react-router-dom'
import redirectURI from 'helpers/redirectURI'
import MyTag from './MyTag'
import { format } from 'helpers/format'
import forumApi from 'api/apis/MainServer/forumApi';
import Cookies from 'universal-cookie';
import { useSelector } from 'react-redux';
import { notification_error } from 'components/toast/notification';


export default function Post({ postProp, key, smallSize, renderContent, width, action }) {
    const userState = useSelector((state) => state.userState);
    const [post, setPost] = useState({});

    const cookies = new Cookies();
    const token = cookies.get("token");



    useEffect(() => {
        setPost(postProp);
    }, [postProp])


    const handleDeletePost = async (postId) => {
        if (!userState[0]) return;

        const data = { post_id: postId }

        try {
            const res = await forumApi.deletePost(token, data);
            if (res.content.err) {
                notification_error("Failed!");
                return;
            }

            setPost({});
        } catch (err) {
            console.log(err)
        }
    }


    const dropDownItems = (
        <Menu style={{ borderRadius: "10px" }}>
            <Menu.Item key="0" style={{ borderRadius: "8px", fontWeight: "500" }} onClick={() => handleDeletePost(post.post_id)} >
                Delete Post
            </Menu.Item>
        </Menu>
    );


    return (
        Object.keys(post).length
            ? <div className="post" key={key} style={{ width: width ? width : "" }} >
                <div className="img">
                    <NavLink to={redirectURI.postPage_uri(post.post_id)}>
                        <Avatar
                            className={smallSize ? "avatar-small" : "avatar"}
                            shape="circle"
                            src={post.user_avatar}
                            title={post.user_name}
                            alt=""
                        />
                    </NavLink>

                    {action
                        ? <Dropdown overlay={dropDownItems} trigger={['click']}>
                            <Button
                                title="Action"
                                style={{ width: "30px", height: "30px", borderRadius: "50%", border: "none", marginLeft: "7px", marginTop: "5px" }}
                                icon={<EllipsisOutlined style={{ fontSize: "24px", paddingTop: "0px" }} />}
                            />
                        </Dropdown>
                        : ""
                    }
                </div>

                <div className="post-title">
                    <div style={{ display: "flex", justifyContent: "space-between" }} >
                        <NavLink to={redirectURI.postPage_uri(post.post_id)}>
                            <Typography.Title className={smallSize ? "title-small" : "title"} level={5} style={{ fontWeight: "500", fontSize: "15px" }} >{post.title}</Typography.Title>
                        </NavLink>

                        {smallSize
                            ? <Tooltip title={`this topic has ${post.comment_count} comments`} >
                                <span className="comments-count">{post.comment_count}</span>
                            </Tooltip>
                            : ""
                        }
                    </div>

                    {renderContent
                        ? <div className="post-content">
                            <Typography.Text style={{ color: "#00000066" }}>{post.content}</Typography.Text>
                        </div>
                        : ""
                    }

                    <div className="categories">
                        {post.categoryList?.length
                            ? post.categoryList.map((item, i) => (
                                <div className="category" key={i}>
                                    <MyTag category={item} key={i} />
                                </div>
                            ))
                            : ""
                        }
                    </div>

                    {smallSize
                        ? ""
                        : <div className="info">
                            <span className="time" title={format.formatDate02(post.created_at)}>
                                {format.relativeTime(post.created_at)}
                            </span>

                            <Tooltip title={`this topic has ${post.comment_count} comments`} >
                                <span className="comments-count">{post.comment_count}</span>
                            </Tooltip>
                        </div>
                    }

                </div>
            </div>
            : ""
    )
}
