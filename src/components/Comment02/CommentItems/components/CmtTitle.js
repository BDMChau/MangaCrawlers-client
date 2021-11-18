import React from 'react'
import { NavLink } from 'react-router-dom'
import { Typography } from 'antd'
import redirectURI from 'helpers/redirectURI'


export default function CmtTitle({ comment }) {
    return (
        <NavLink to={redirectURI.userPage_uri(comment.user_id)} >
            <Typography.Text
                style={{ cursor: "pointer", fontSize: "14px", fontWeight: "500" }}
            >
                {comment.user_name}
            </Typography.Text>
        </NavLink>
    )
}

