import React, { useState, useEffect } from 'react'
import "../../../Admin.css"
import "../Tables.css"
import "../../../components/Charts/Chart.css"

import { Table, Col, Input, Button } from 'antd';
import { Avatar } from 'antd';
import DropOption from 'components/DropOption/DropOption';
import { DeleteOutlined, FieldTimeOutlined } from '@ant-design/icons';


export default function PostTable({ posts, handleDeprecatePost, isLoading }) {
    const [data, setData] = useState([])


    useEffect(() => {
        if (posts.length) setData(posts);
    }, [posts])


    const onSearch = (val) => {
        setTimeout(() => {
            if (val) {
                const result = posts.filter(item => item.title.toLowerCase().includes(val.toLowerCase()))

                setData(result)
            } else {
                setData(users)
            }
        }, 300);
    }


    const columns = [
        {
            width: '5%',
            fixed: 'left',
            title: 'ID',
            dataIndex: 'post_id',
            key: 'post_id',
        },
        {
            title: 'POST TITLE',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'POST STATUS',
            dataIndex: 'is_deprecated',
            key: 'is_deprecated',
            render: is_deprecated => !is_deprecated ? <p style={{ color: "grey" }} >Deprecated</p> : <p style={{ color: "#29c729" }} >Active</p>
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
            title: 'OPERATION',
            key: 'operation',
            fixed: 'right',
            width: '8%',
            render: (post, record) => (
                <DropOption
                    menuOptions={[
                        { key: '1', name: `Deprecate`, icon: <FieldTimeOutlined style={{ fontSize: "20px" }} />, keyId: "delete", funcAction: () => handleDeprecatePost(post.post_id) },
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
                    showTotal: () => `Total ${posts.length} Posts`,
                }}
                rowKey={user => user.manga_id}
            />
        </Col>
    )
}
