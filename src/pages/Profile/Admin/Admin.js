import React, { useState } from 'react'
import "./Admin.css"
import "./Tables/Tables.css"
import "./Charts/Chart.css"
import { Table, Tag, Space, Col, Row, Typography } from 'antd';
import { Avatar } from 'antd';
import TableUser from './Tables/TableUser';
import TablesAdmin from './Tables/TablesAdmin';
import UserChart from './Charts/UserChart';
import { Tabs, Radio } from 'antd';

const { TabPane } = Tabs;

export default function Admin() {


    const renderUserStatistic = () => (
        <div>
            <TableUser />
            <UserChart />
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
                        <h1>acasc</h1>
                    </TabPane>
                    <TabPane tab="Translation Group Statistics" key="3">
                        {renderUserStatistic()}
                    </TabPane>
                </Tabs>

                <TablesAdmin />
            </Row>
        </div>
    )
}
