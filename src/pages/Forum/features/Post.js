import React from 'react'
import "../ForumHome/ForumHome.css"

import { Avatar, Typography, Tag, Tooltip } from 'antd'
import { NavLink } from 'react-router-dom'
import redirectURI from 'helpers/redirectURI'

export default function Post({ post, key, smallSize, renderContent, width }) {
    return (
        <div className="post" key={key} style={{ width: width ? width : "" }} >
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
            </div>

            <div className="post-title">
                <div style={{ display: "flex", justifyContent: "space-between" }} >
                    <NavLink to={redirectURI.postPage_uri(post.post_id)}>
                        <Typography.Title className={smallSize ? "title-small" : "title"} level={5}>{post.title}</Typography.Title>
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
                                <Tag color={item.color} style={{ border: "none" }} >{item.name}</Tag>
                            </div>
                        ))
                        : ""
                    }
                </div>

                {smallSize
                    ? ""
                    : <div className="info">
                        <span className="time" >May 10, 2021</span>

                        <Tooltip title={`this topic has ${post.comment_count} comments`} >
                            <span className="comments-count">{post.comment_count}</span>
                        </Tooltip>
                    </div>

                }
            </div>
        </div>
    )
}
