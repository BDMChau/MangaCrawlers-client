import React from 'react'
import "../ForumHome.css"

import { Avatar, Typography, Tag } from 'antd'

export default function Post({ post, key, smallSize }) {
    return (
        <div className="post" key={key} >
            <div className="img">
                <Avatar
                    className={smallSize ? "avatar-small" : "avatar"}
                    shape="circle"
                    src={post.avatar}
                    title={post.user_name}
                    alt=""
                />
            </div>

            <div className="post-title">
                <div style={{display:"flex", justifyContent:"space-between"}} >
                    <Typography.Title className={smallSize ? "title-small" : "title"} level={5}>{post.title}</Typography.Title>

                    {smallSize
                        ? <span className="comments-count" title="this topic has 100 comments" >100</span>
                        : ""
                    }
                </div>

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

                {smallSize
                    ? ""
                    : <div className="info">
                        <span className="time" >May 10, 2021</span>
                        <span className="comments-count" title="this topic has 100 comments" >100</span>
                    </div>

                }
            </div>
        </div>
    )
}
