import React, { useState, useEffect } from 'react'
import "../../../Admin.css"
import "../Tables.css"
import "../../../components/Charts/Chart.css"

import { Table, Col, Input, Button } from 'antd';
import { Avatar } from 'antd';
import DropOption from 'components/DropOption/DropOption';
import { DeleteOutlined, FieldTimeOutlined } from '@ant-design/icons';


export default function TableUser({ users, handleDeprecateUser, handleRemoveUser, isLoading }) {
    const [data, setData] = useState([])


    useEffect(() => {
        if (users.length) setData(users);
    }, [users])


    const onSearch = (val) => {
        setTimeout(() => {
            if (val) {
                const result = users.filter(item => item.user_name.toLowerCase().includes(val.toLowerCase()))

                setData(result)
            } else {
                setData(users)
            }
        }, 300);
    }


    const columns = [
        {
            title: 'AVATAR',
            dataIndex: 'user_avatar',
            key: 'user_avatar',
            width:"6%",
            fixed: 'left',
            render: src => <Avatar size={40} src={src} />,
        },
        {
            title: 'NAME',
            dataIndex: 'user_name',
            key: 'user_name',
            className: "name-col",
            render: text => <p>{text}</p>,
        },
        {
            title: 'EMAIL',
            dataIndex: 'user_email',
            key: 'user_email',
            className: "email-col"
        },
        {
            title: 'VERTIFICATION',
            dataIndex: 'user_isVerified',
            key: 'user_isVerified',
            render: isVerified => isVerified ? <p>Verified</p> : <p>Unverified</p>
        },
        {
            title: 'OPERATION',
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
            <Input placeholder="Search..." onChange={(e) => onSearch(e.target.value)} style={{ width: 200, margin: '5px 11px' }} />
            <div style={{ display: "flex" }}>
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
                dataSource={data}
                pagination={{
                    showTotal: () => `Total ${users.length} Users`,
                }}
                rowKey={user => user.manga_id}
            />
        </Col>
    )
}
