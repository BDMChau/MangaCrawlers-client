import React from 'react'
import "./UserPage.css"
import FollowingManga from './FollowingManga/FollowingManga'
import HistoryRead from './HistoryRead/HistoryRead'
import {  Row, Typography, Tabs } from 'antd';

const { TabPane } = Tabs;

export default function UserPage({ query, historyMangas, followingMangas }) {
    return (
        <Row justify={"center"} className="userpage-row1">

            <Typography.Title level={3} className="userpage-title">Your Collection</Typography.Title>
            <Tabs defaultActiveKey={query} className="userpage-tabs">
                <TabPane tab="Following" key="following">
                    <FollowingManga followingMangas={followingMangas} />
                </TabPane>

                <TabPane tab="History" key="history">
                    <HistoryRead historyMangas={historyMangas} />
                </TabPane>
            </Tabs>

        </Row>
    )
}
