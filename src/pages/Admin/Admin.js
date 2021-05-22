import React, { useState } from 'react'
import "./Admin.css"
import "./Tables/Tables.css"
import "./Charts/Chart.css"
import { Table, Tag, Space, Col, Row, Typography, Tabs, Radio } from 'antd';
import { Avatar } from 'antd';
import UserTable from './Tables/UserTable';
import AdminTable from './Tables/AdminTable';
import UserChart from './Charts/UserChart';
import MangaTable from './Tables/MangaTable';
import MangaChart from './Charts/MangaChart';
import TransGrTable from './Tables/TransGrTable';
import TransGrChart from './Charts/TransGrChart';

const { TabPane } = Tabs;

export default function Admin() {


    const renderUserStatistic = () => (
        <div>
            <UserTable />
            <UserChart />
        </div>
    )

    const renderMangaStatistic = () => (
        <div>
            <MangaTable />
            <MangaChart />
        </div>
    )

    const renderTransGrStatistic = () => (
        <div>
            <TransGrTable />
            <TransGrChart />
        </div>
    )


    return (
        <div className="admin-page">
            <Row justify={"center"} className="admin-row1">

                <Typography.Title level={3} className="admin-title">Administrator Page</Typography.Title>
                <Tabs defaultActiveKey="1" className="admin-tabs">
                    <TabPane tab="User Statistics" key="1">
                        {renderUserStatistic()}
                    </TabPane>
                    <TabPane tab="Manga Statistics" key="2">
                        {renderMangaStatistic()}
                    </TabPane>
                    <TabPane tab="Translation Group Statistics" key="3">
                        {renderTransGrStatistic()}
                    </TabPane>
                </Tabs>

                <AdminTable />
            </Row>
        </div>
    )
}
