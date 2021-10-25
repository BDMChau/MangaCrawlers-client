import React from 'react'
import "../ForumHome.css"

import { Avatar, Typography, Tag } from 'antd'

export default function Post({ post, key }) {
    return (
        <div className="post" key={key} >
            <div className="img">
                <Avatar
                    className="avatar"
                    size="large"
                    shape="circle"
                    src={post.avatar}
                    title={post.user_name}
                    alt=""
                />
            </div>
            
            <div className="post-title">
                <Typography.Title className="title" level={5}>{post.title}</Typography.Title>

                <div className="categories">
                    {post.categories.length
                        ? post.categories.map((item, i) => (
                            <div className="category">
                                <Tag color={item.cate_color}>{item.cate_name}</Tag>
                            </div>
                        ))
                        : ""
                    }
                </div>

                <div className="info">
                    <span className="time" >May 10, 2021</span>
                    <span className="comments" title="this topic has 100 comments" >100</span>
                </div>
            </div>
        </div>
    )
}
