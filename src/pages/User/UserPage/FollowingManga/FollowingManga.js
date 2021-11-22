import { Card, Row, Typography } from 'antd'
import React from 'react'
import ListVersion02 from '../../../../components/List/ListVersion02/ListVersion02'
import "./FollowingManga.css"

export default function FollowingManga({ followingMangas }) {
    return (
        <Row justify={"center"} className="following-manga">
            <Typography.Title level={3}>Your Library</Typography.Title>

            <ListVersion02
                mangas={followingMangas}
                disableActions={true}
            />
        </Row>
    )
}
