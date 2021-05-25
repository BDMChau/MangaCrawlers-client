import React, { useState } from 'react'
import "../Admin.css"
import "./Tables.css"
import "../Charts/Chart.css"
import { Table, Tag, Space, Col, Row, Typography } from 'antd';
import { Avatar } from 'antd';


export default function AdminTable({admins}) {

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'user_avatar',
            key: 'user_avatar',
            render: src => <Avatar size={30} src={src} />,
        },
        {
            title: 'Name',
            dataIndex: 'user_name',
            key: 'user_name',
            className: "name-col",
            render: text => <p>{text}</p>,
        },
        {
            title: 'Email',
            dataIndex: 'user_email',
            key: 'user_email',
            className: "email-col"
        },
        {
            title: 'Role',
            dataIndex: 'user_isAdmin',
            key: 'user_isAdmin',
            render: () => <p>Admin</p>
        },
    ];

    return (
        <Col  xxl={14} xs={23} sm={20} className="table-admin">
            <Typography.Title level={3}>Administrators</Typography.Title>
            <Table
                className="admin-table"
                columns={columns}
                dataSource={admins}
                pagination={false}
            />
        </Col>

    )
}
