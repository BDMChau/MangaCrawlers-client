import React from 'react'
import { NavLink } from 'react-router-dom'
import { Typography } from 'antd'
import redirectURI from 'helpers/redirectURI'
import { format } from 'helpers/format'


export default function CmtTitle({ comment }) {
    return (
        <>
            <NavLink to={redirectURI.userPage_uri(comment.user_id)} >
                <Typography.Text
                    style={{ cursor: "pointer", fontSize: "14px", fontWeight: "500" }}
                >
                    {comment.user_name}
                </Typography.Text>
            </NavLink>

            <Typography.Text
                title={format.formatDate02(comment.comment_time)}
                style={{
                    color: "#848587",
                    fontStyle: "italic",
                    fontWeight: "400",
                    fontSize: "12px",
                    marginLeft: "5px"
                }}
            >
                {format.relativeTime(comment.comment_time)}
            </Typography.Text>
        </>
    )
}

