import { Card, Row, Typography } from 'antd'
import React from 'react'
import ListFollowing from '../../../../components/List/ListFollowing/ListFollowing'
import "./HistoryRead.css"

export default function HistoryRead() {
    return (
        <Row justify={"center"} className="following-manga">
            <Typography.Title level={3}>Keep reading these manga ^^</Typography.Title>
            <ListFollowing />
        </Row>
    )
}
