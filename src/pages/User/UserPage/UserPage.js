import React from 'react'
import "./UserPage.css"
import FollowingManga from './FollowingManga/FollowingManga'
import HistoryRead from './HistoryRead/HistoryRead'
import { Table, Tag, Space, Col, Row, Typography, Tabs, Radio } from 'antd';
import { Avatar } from 'antd';

const { TabPane } = Tabs;

export default function UserPage({ query }) {
    return (
        <Row justify={"center"} className="userpage-row1">

            <Typography.Title level={3} className="userpage-title">Your Collection</Typography.Title>
            <Tabs defaultActiveKey={query} className="userpage-tabs">
                <TabPane tab="Following" key="following">
                    <FollowingManga />
                </TabPane>

                <TabPane tab="History" key="history">
                    <HistoryRead />
                </TabPane>
            </Tabs>

        </Row>
    )
}
