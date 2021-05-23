import { Card, Row, Typography } from 'antd'
import React from 'react'
import ListFollowing from '../../../../components/List/ListFollowing/ListFollowing'
import "./FollowingManga.css"

export default function FollowingManga({followingMangas}) {
    return (
        <Row justify={"center"} className="following-manga">
            <Typography.Title level={3}>Your Library</Typography.Title>
            <ListFollowing mangas={followingMangas} />
        </Row>
    )
}
