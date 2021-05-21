import React, { useState } from 'react'
import "../Admin.css"
import "./Tables.css"
import "../Charts/Chart.css"

import { Table, Tag, Space, Col, Row, Typography, Popconfirm } from 'antd';
import { Avatar } from 'antd';

export default function TableUser() {
    const [users, setusers] = useState([
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            Role: "Regular User",
            isVerified: "Verified",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            Role: "Regular User",
            isVerified: "Verified",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            Role: "Regular User",
            isVerified: "Verified",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            Role: "Regular User",
            isVerified: "Verified",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            Role: "Regular User",
            isVerified: "Verified",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            Role: "Regular User",
            isVerified: "Verified",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            Role: "Regular User",
            isVerified: "Verified",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            Role: "Regular User",
            isVerified: "Verified",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            Role: "Regular User",
            isVerified: "Verified",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            Role: "Regular User",
            isVerified: "Verified",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            Role: "Regular User",
            isVerified: "Verified",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            Role: "Regular User",
            isVerified: "Verified",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            Role: "Regular User",
            isVerified: "Verified",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            Role: "Regular User",
            isVerified: "Verified",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            Role: "Regular User",
            isVerified: "Verified",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            Role: "Regular User",
            isVerified: "Verified",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            Role: "Regular User",
            isVerified: "Verified",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            Role: "Regular User",
            isVerified: "Verified",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            Role: "Regular User",
            isVerified: "Verified",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            Role: "Regular User",
            isVerified: "Verified",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            Role: "Regular User",
            isVerified: "Verified",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            Role: "Regular User",
            isVerified: "Verified",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            Role: "Regular User",
            isVerified: "Verified",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            Role: "Regular User",
            isVerified: "Verified",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            Role: "Regular User",
            isVerified: "Verified",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            Role: "Regular User",
            isVerified: "Verified",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            Role: "Regular User",
            isVerified: "Verified",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            Role: "Regular User",
            isVerified: "Verified",
        },
    ])

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: text => <Avatar size={24} src={text} />,
        },
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
        },
        {
            title: 'Role',
            key: 'role',
            dataIndex: 'Role',
            className: "name-col",
            render: text => <p>{text}</p>
        },
        {
            title: 'Verrify',
            key: 'isVerified',
            dataIndex: 'isVerified',
            render: text => <a>{text}</a>
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
        <Col xxl={14} xs={23} sm={20} className="table-user">
            <Typography.Title level={3}>User</Typography.Title>
            <Table
                className="user-table"
                columns={columns}
                dataSource={users}
                pagination={false}
            />
        </Col>
    )
}
