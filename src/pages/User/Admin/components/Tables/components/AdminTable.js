import React from 'react'
import "../../../Admin.css"
import "../Tables.css"
import "../../../components/Charts/Chart.css"
import { Table, Col, Typography } from 'antd';
import { Avatar } from 'antd';


export default function AdminTable({ admins }) {

    const columns = [
        {
            width: '5%',
            fixed: 'left',
            title: 'ID',
            dataIndex: 'user_id',
            key: 'user_id',
        },
        {
            width: '6%',
            fixed: 'left',
            title: 'AVATAR',
            dataIndex: 'user_avatar',
            key: 'user_avatar',
            render: src => <Avatar size={45} src={src} />,
        },
        {
            title: 'NAME',
            dataIndex: 'user_name',
            width: '8%',
            key: 'user_name',
            className: "name-col",
            render: text => <p>{text}</p>,
        },
        {
            width: '8%',
            title: 'ROLE',
            dataIndex: 'user_isAdmin',
            key: 'user_isAdmin',
            render: () => <p style={{ marginTop: "12px" }}>Admin</p>
        },
        {
            fixed: 'right',
            width: '8%',
            title: 'EMAIL',
            dataIndex: 'user_email',
            key: 'user_email',
            className: "email-col"
        },
    ];

    return (
        <Col xxl={14} xs={23} sm={20} className="table-admin">
            <Table
                className="admin-table"
                columns={columns}
                dataSource={admins}
                pagination={false}
            />
        </Col>

    )
}
