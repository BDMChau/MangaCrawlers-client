import React, { useState } from 'react'
import "../Admin.css"
import "./Tables.css"
import "../Charts/Chart.css"

import { Table, Space, Col, Typography, Popconfirm, Image } from 'antd';
import { NavLink } from 'react-router-dom';

export default function MangaTable({ mangas }) {


    const columns = [
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: text => <Image
            className="image-thumb-admin"
                style={{ width: "30px", borderRadius: "2px" }}
                src={text}
                alt={text}
            />
        },
        {
            title: 'Manga',
            dataIndex: 'manga_name',
            key: 'manga_name',
            className: "name-col",
            render: text => <p>{text}</p>,
        },
        {
            title: 'Author',
            dataIndex: 'author_name',
            key: 'author_name',
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
            key: 'chapters_length',
            dataIndex: 'chapters_length',
            render: text => <a>{text} chapter(s)</a>
        },
        {
            title: 'Rating',
            key: 'stars',
            dataIndex: 'stars',
            render: text => <a>{text}/5</a>
        },
        {
            title: 'Action',
            key: 'action',
            render: (manga) => (
                <div style={{ display: 'flex' }}>
                    <Space size="middle">
                        <NavLink to={`/manga/${manga.manga_id}`} >Preview</NavLink>
                    </Space>
                    <p style={{ color: "#18AEFF", margin: "0" }}>&nbsp;/&nbsp;</p>
                    <Space size="middle">
                        <Popconfirm
                            title="Are you sure to delete this account?"
                            // onConfirm={() => handleRemoveManaga(manga.manga_id)}
                            onCancel={"cancel"}
                            okText="Yes"
                            cancelText="No"
                        >
                            <a>Remove</a>
                        </Popconfirm>
                    </Space>
                </div>
            ),
        },
    ];

    return (
        <Col xxl={16} xs={23} sm={20} className="table-manga">
            <Typography.Title level={3}>Manga</Typography.Title>
            <Table
                className="manga-table"
                columns={columns}
                dataSource={mangas}
                pagination={true}
            />
        </Col>
    )
}
