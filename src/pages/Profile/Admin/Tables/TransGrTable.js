import React, { useState } from 'react'
import "../Admin.css"
import "./Tables.css"
import "../Charts/Chart.css"

import { Table, Tag, Space, Col, Row, Typography, Popconfirm } from 'antd';
import { Avatar } from 'antd';

export default function TransGrTable() {
    const [users, setusers] = useState([
        {
            name: "Black Clover",
            email: "bdmchau105@gamil.com",
            projects: 2,
            members: 10,
        },
    ])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            className: "name-col",
            render: text => <p>{text}</p>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: text => <p>{text}</p>,
        },
        {
            title: 'Projects',
            key: 'projects',
            dataIndex: 'projects',
            className: "projects-col",
            render: text => <p>{text} project(s)</p>
        },
        {
            title: 'Members',
            key: 'members',
            dataIndex: 'members',
            render: text => <a>{text} member(s)</a>
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Are you sure to delete this user?"
                        onConfirm={"confirm"}
                        onCancel={"cancel"}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a>Remove</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Col xxl={14} xs={23} sm={20} className="table-trans-gr">
            <Typography.Title level={3}>Translation Team</Typography.Title>
            <Table
                className="manga-table"
                columns={columns}
                dataSource={users}
                pagination={false}
            />
        </Col>
    )
}
