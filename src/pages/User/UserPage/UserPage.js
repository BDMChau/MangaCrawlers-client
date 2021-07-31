import React from 'react'
import "./UserPage.css"
import FollowingManga from './FollowingManga/FollowingManga'
import HistoryRead from './HistoryRead/HistoryRead'
import {  Row, Typography, Tabs } from 'antd';
import { useHistory } from 'react-router-dom';

const { TabPane } = Tabs;

export default function UserPage({ tabSelected, historyMangas, followingMangas }) {
    const history = useHistory()

    return (
        <Row justify={"center"} className="userpage-row1">

            <Typography.Title level={3} className="userpage-title">Your Collection</Typography.Title>
            <Tabs activeKey={tabSelected} className="userpage-tabs" onChange={(val) => history.push(`/user?v=${val}`)}>
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
