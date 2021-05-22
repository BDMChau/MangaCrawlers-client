import React, { useState } from 'react'
import "../Admin.css"
import "./Tables.css"
import "../Charts/Chart.css"

import { Table, Tag, Space, Col, Row, Typography, Popconfirm } from 'antd';
import { Avatar } from 'antd';

export default function MangaTable() {
    const [users, setusers] = useState([
        {
            name: "Black Clover",
            author: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            views: 1100,
            chapters: 10,
            rating: 3,
        },
        {
            name: "Black Clover",
            author: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            views: 1100,
            chapters: 10,
            rating: 3,
        },
        {
            name: "Black Clover",
            author: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            views: 1100,
            chapters: 10,
            rating: 3,
        },
        {
            name: "Black Clover",
            author: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            views: 1100,
            chapters: 10,
            rating: 3,
        },
        {
            name: "Black Clover",
            author: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            views: 1100,
            chapters: 10,
            rating: 3,
        },
        {
            name: "Black Clover",
            author: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            views: 1100,
            chapters: 10,
            rating: 3,
        },
        {
            name: "Black Clover",
            author: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            views: 1100,
            chapters: 10,
            rating: 3,
        },
        {
            name: "Black Clover",
            author: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            views: 1100,
            chapters: 10,
            rating: 3,
        },
        {
            name: "Black Clover",
            author: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            views: 1100,
            chapters: 10,
            rating: 3,
        },
        {
            name: "Black Clover",
            author: "bdmchau105@gamil.com",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
            views: 1100,
            chapters: 10,
            rating: 3,
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
            title: 'Author',
            dataIndex: 'author',
            key: 'email',
        },
        {
            title: 'Views',
            key: 'views',
            dataIndex: 'views',
            className: "views-col",
            render: text => <p>{text}</p>
        },
        {
            title: 'Chapters',
            key: 'chapters',
            dataIndex: 'chapters',
            render: text => <a>{text} chapter(s)</a>
        },
        {
            title: 'Rating',
            key: 'rating',
            dataIndex: 'rating',
            render: text => <a>{text}/5</a>
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
        <Col xxl={14} xs={23} sm={20} className="table-manga">
            <Typography.Title level={3}>Manga</Typography.Title>
            <Table
                className="manga-table"
                columns={columns}
                dataSource={users}
                pagination={false}
            />
        </Col>
    )
}
