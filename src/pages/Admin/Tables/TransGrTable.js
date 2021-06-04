import React from 'react'
import "../Admin.css"
import "./Tables.css"
import "../Charts/Chart.css"

import { Table, Space, Col, Typography, Popconfirm } from 'antd';

export default function TransGrTable({ transGrs }) {
    const columns = [
        {
            title: 'Team Name',
            dataIndex: 'transgroup_name',
            key: 'transgroup_name',
            className: "name-col",
            render: text => <p>{text}</p>,
        },
        {
            title: 'Team Email',
            dataIndex: 'transgroup_email',
            key: 'transgroup_email',
            render: text => <p>{text}</p>,
        },
        // {
        //     title: 'Members',
        //     key: 'members',
        //     dataIndex: 'members',
        //     render: text => <a>{text} member(s)</a>
        // },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Are you sure to delete this team?"
                        onConfirm={"confirm"}
                        onCancel={"cancel"}
                        okText="Yes"
                        cancelText="No"
                    >
                         <Typography.Text style={{ color: "#629EFF", cursor: "pointer" }} >Remove</Typography.Text>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Col xxl={14} xs={23} sm={20} className="table-trans-gr">
            <Typography.Title level={3}>Translation Team</Typography.Title>
            <Table
                className="trans-gr-table"
                columns={columns}
                dataSource={transGrs}
                pagination={true}
            />
        </Col>
    )
}
