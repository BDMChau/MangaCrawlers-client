import React from 'react'
import "../ForumHome/ForumHome.css"

import { Button, Typography, Tag, Tooltip } from 'antd'
import { NavLink } from 'react-router-dom'
import redirectURI from 'helpers/redirectURI'
import { LeftOutlined, LikeOutlined, DislikeOutlined } from "@ant-design/icons"
import MyTag from './MyTag'
import { format } from 'helpers/format'


export default function Post02({ post, key, smallSize, renderContent, width, sttLike }) {
    return (
        <NavLink to={redirectURI.postPage_uri(post.post_id)} className="post02" key={key} style={{ width: width ? width : "" }} >
            <div className="post-title">
                <div style={{ display: "flex", justifyContent: "space-between" }} >
                    <Typography.Title className="title" level={5} style={{ fontWeight: "500" }} >{post.title}</Typography.Title>

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

                        <div>
                            <span className="icon-likes-dislikes" >
                                {sttLike ? <LikeOutlined style={{ fontSize: "16px" }} /> : <DislikeOutlined style={{ fontSize: "16px" }} />}
                            </span>

                            <span className="likes-dislikes" style={{}}>
                                {sttLike ? post.likes : post.dislikes}
                            </span>
                        </div>
                    </div>
                }
            </div>
        </NavLink>
    )
}
