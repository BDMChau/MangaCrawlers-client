import React, { useState } from 'react'
import "../Admin.css"
import "./Tables.css"
import "../Charts/Chart.css"

import { Table, Space, Col, Typography, Popconfirm, Image, Button } from 'antd';
import DropOption from 'components/DropOption/DropOption';

export default function MangaTable({ mangas, handleRemoveManga, isLoading }) {


    const columns = [
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            width: '6%',
            fixed: 'left',
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
            title: 'Operation',
            key: 'operation',
            fixed: 'right',
            width: '8%',
            render: (manga) => (
                <DropOption
                    menuOptions={[
                        { key: '1', name: `Preview`, path: `/manga/${manga.manga_id}` },
                        { key: '2', name: `Delete`, keyId: "delete", funcAction: () => handleRemoveManga(manga.manga_id) },
                    ]}
                />
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
                bordered
                simple
                dataSource={mangas}
                pagination={{
                    showTotal: () => `Total ${mangas.length} Manga Series`,
                }}
                rowKey={manga => manga.manga_id}
            // scroll={{ x: 1200 }}

            />

        </Col>
    )
}
