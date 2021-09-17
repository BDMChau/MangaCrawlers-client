import React from 'react'
import "../../Admin.css"
import "./Tables.css"
import "../../components/Charts/Chart.css"

import { Table, Col, Typography, Button } from 'antd';
import { Avatar } from 'antd';
import DropOption from 'components/DropOption/DropOption';
import { DeleteOutlined, FieldTimeOutlined } from '@ant-design/icons';


export default function TableUser({ users, handleDeprecateUser, handleRemoveUser, isLoading }) {


    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'user_avatar',
            key: 'user_avatar',
            width:"6%",
            fixed: 'left',
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
            title: 'Operation',
            key: 'operation',
            fixed: 'right',
            width: '8%',
            render: (user, record) => (
                <DropOption
                    menuOptions={[
                        { key: '1', name: `Deprecated`, icon: <FieldTimeOutlined style={{fontSize:"20px"}} />, keyId: "delete", funcAction: () => handleDeprecateUser(user.user_id) },
                        { key: '2', name: `Delete`, icon: <DeleteOutlined style={{fontSize:"20px"}} />, keyId: "delete", funcAction: () => handleRemoveUser(user.user_id) },
                    ]}
                />
            )
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
                bordered
                simple
                dataSource={users}
                pagination={{
                    showTotal: () => `Total ${users.length} Users`,
                }}
                rowKey={user => user.manga_id}
            />
        </Col>
    )
}
