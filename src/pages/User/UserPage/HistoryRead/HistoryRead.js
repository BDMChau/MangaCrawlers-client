import { Card, Row, Typography } from 'antd'
import React from 'react'
import ListVersion02 from '../../../../components/List/ListVersion02/ListVersion02'
import "./HistoryRead.css"

export default function HistoryRead({ historyMangas, handleDeleteManga }) {
    return (
        <Row justify={"center"} className="following-manga">
            <Typography.Title level={3}>Keep reading these manga ^^</Typography.Title>

            <ListVersion02
                mangas={historyMangas}
                handleDeleteManga={handleDeleteManga}
                disableActions={false}
            />
        </Row>
    )
}
