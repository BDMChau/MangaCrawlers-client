import React, { useState } from 'react'
import "../Admin.css"
import "./Tables.css"
import "../Charts/Chart.css"

import { Table, Space, Col, Typography, Popconfirm, Image, Button } from 'antd';
import { NavLink } from 'react-router-dom';

export default function MangaTable({ mangas, handleRemoveManga, isLoading }) {


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
            render: text => <Typography.Text>{text} chapter(s)</Typography.Text>
        },
        {
            title: 'Rating',
            key: 'stars',
            dataIndex: 'stars',
            render: text => <Typography.Text>{text}/5</Typography.Text>
        },
        {
            title: 'Action',
            key: 'action',
            render: (manga) => (
                <div style={{ display: 'flex' }}>
                    <Space size="middle">
                        <NavLink to={`/manga/${manga.manga_id}`} >Preview</NavLink>
                    </Space>
                    <Typography.Text style={{ color: "#18AEFF", margin: "0" }}>&nbsp;/&nbsp;</Typography.Text>
                    <Space size="middle">
                        <Popconfirm
                            title="Are you sure to delete this account?"
                            onConfirm={() => handleRemoveManga(manga.manga_id)}
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
        <Col xxl={16} xs={23} sm={20} className="table-manga">
            <div style={{ display: "flex" }}>
                <Typography.Title level={3}>Manga</Typography.Title>
                {
                    isLoading
                        ? <Button className="table-btn-loading" loading={isLoading}></Button>
                        : ""
                }
            </div>

            <Table
                className="manga-table"
                columns={columns}
                dataSource={mangas}
                pagination={true}
            />
        </Col>
    )
}
