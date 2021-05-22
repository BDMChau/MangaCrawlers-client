import React from 'react'
import "./UserPage.css"
import FollowingManga from './FollowingManga/FollowingManga'
import HistoryRead from './HistoryRead/HistoryRead'
import { Table, Tag, Space, Col, Row, Typography, Tabs, Radio } from 'antd';
import { Avatar } from 'antd';

const { TabPane } = Tabs;

export default function UserPage() {
    return (
        <Row justify={"center"} className="userpage-row1">

            <Typography.Title level={3} className="userpage-title">Your Collection</Typography.Title>
            <Tabs defaultActiveKey="1" className="userpage-tabs">
                <TabPane tab="Following" key="1">
                    <FollowingManga />
                </TabPane>

                <TabPane tab="History" key="2">
                    <HistoryRead />
                </TabPane>
            </Tabs>

        </Row>
    )
}
