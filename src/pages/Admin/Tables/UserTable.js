import React from 'react'
import "../Admin.css"
import "./Tables.css"
import "../Charts/Chart.css"

import { Table, Space, Col, Typography, Popconfirm, Button } from 'antd';
import { Avatar } from 'antd';

export default function TableUser({ users, handleDeprecateUser, handleRemoveUser, isLoading }) {


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
            title: 'Verification',
            dataIndex: 'user_isVerified',
            key: 'user_isVerified',
            render: isVerified => isVerified ? <p>Verified</p> : <p>Unverified</p>
        },
        {
            title: 'Action',
            key: 'action',
            render: (user, record) => (
                <div style={{ display: 'flex' }}>
                    <Space size="middle">
                        <Popconfirm
                            title="Are you sure to deprecated this account?"
                            onConfirm={() => handleDeprecateUser(user.user_id)}
                            onCancel={"cancel"}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Typography.Text style={{ color: "#629EFF", cursor: "pointer" }} >Unapprove</Typography.Text>
                        </Popconfirm>
                    </Space>
                    <p style={{ color: "#18AEFF", margin: "0" }}>&nbsp;/&nbsp;</p>
                    <Space size="middle">
                        <Popconfirm
                            title="Are you sure to delete this account?"
                            onConfirm={() => handleRemoveUser(user.user_id)}
                            onCancel={"cancel"}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Typography.Text style={{ color: "#629EFF", cursor: "pointer" }} >Remove</Typography.Text>
                        </Popconfirm>
                    </Space>
                </div>
            ),
        },
    ];
    return (
        <Col xxl={14} xs={23} sm={20} className="table-user">
            <div style={{ display: "flex" }}>
                <Typography.Title level={3}>User</Typography.Title>
                {
                    isLoading
                        ? <Button className="table-btn-loading" loading={isLoading}></Button>
                        : ""
                }
            </div>
            <Table
                className="user-table"
                columns={columns}
                dataSource={users}
                pagination={true}
            />
        </Col>
    )
}
