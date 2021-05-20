import React, { useState } from 'react'
import "./Admin.css"
import "./Tables/Tables.css"
import "./Charts/Chart.css"
import { Table, Tag, Space, Col, Row, Typography } from 'antd';
import { Avatar } from 'antd';
import TableUser from './Tables/TableUser';
import TablesAdmin from './Tables/TablesAdmin';
import UserChart from './Charts/UserChart';

export default function Admin() {



    return (
        <div className="admin-page">
            <Typography.Title level={3} className="admin-title">Administrator Page</Typography.Title>
            <Row justify={"center"} className="admin-row1">
                <Typography.Title level={3}>Users</Typography.Title>
                    <TableUser />
                    <Typography.Title level={3}>Administrator</Typography.Title>
                    <TablesAdmin />
                    <UserChart/>
            </Row>
        </div>
    )
}
