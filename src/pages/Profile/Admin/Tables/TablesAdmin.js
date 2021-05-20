import React, { useState } from 'react'
import "../Admin.css"
import "./Tables.css"
import "../Charts/Chart.css"
import { Table, Tag, Space, Col, Row, Typography } from 'antd';
import { Avatar } from 'antd';


export default function TablesAdmin() {
    const [admins, setAdmins] = useState([
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
        },
        {
            name: "Chau",
            email: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
        },
    ])

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: text => <Avatar size={22} src={text} />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <p>{text}</p>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
    ];

    return (
        <Col xxl={6} xs={24} sm={11} xl={9} className="table-admin">
            <Table 
            className="admin-table-item"
            columns={columns} 
            dataSource={admins} 
            pagination={false} 
            />
        </Col>

    )
}
