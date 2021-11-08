import React, { useState, useEffect } from 'react'
import "../../../Admin.css"
import "../../../components/Charts/Chart.css"

import { Table, Col, Typography, Image, Button, Input } from 'antd';
import DropOption from 'components/DropOption/DropOption';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import redirectURI from 'helpers/redirectURI';


export default function MangaTable({ mangas, handleRemoveManga, isLoading }) {
    const [data, setData] = useState([])


    useEffect(() => {
        if (mangas.length) setData(mangas);
    }, [mangas])


    const onSearch = (val) => {
        setTimeout(() => {
            if (val) {
                const result = mangas.filter(item => item.manga_name.toLowerCase().includes(val.toLowerCase()))

                setData(result)
            } else {
                setData(mangas)
            }
        }, 300);
    }



    const columns = [
        {
            width: '5%',
            fixed: 'left',
            title: 'ID',
            dataIndex: 'manga_id',
            key: 'manga_id',
        },
        {
            title: 'THUMBNAIL',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            width: '6%',
            fixed: 'left',
            render: text => <Image
                className="image-thumb-admin"
                style={{ width: "40px", borderRadius: "2px" }}
                src={text}
                alt={text}
            />
        },
        {
            title: 'MANGA',
            dataIndex: 'manga_name',
            key: 'manga_name',
            className: "name-col",
            render: text => <p>{text}</p>,
        },
        {
            title: 'AUTHOR',
            dataIndex: 'author_name',
            key: 'author_name',
        },
        {
            title: 'VIEWS',
            key: 'views',
            dataIndex: 'views',
            className: "views-col",
            render: text => <p>{text}</p>
        },
        {
            title: 'CHAPTERS',
            key: 'chapters_length',
            dataIndex: 'chapters_length',
            render: (text, manga) => <a>{text} chapter(s)</a>
        },
        {
            title: 'RATING',
            key: 'stars',
            dataIndex: 'stars',
            render: text => <Typography.Text>{text}/5</Typography.Text>
        },
        {
            title: 'OPERATION',
            key: 'operation',
            fixed: 'right',
            width: '8%',
            render: (manga) => (
                <DropOption
                    menuOptions={[
                        { key: '1', name: `Preview`, icon: <EyeOutlined style={{ fontSize: "20px" }} />, path: redirectURI.mangaPage_uri(manga.manga_id, manga.manga_name) },
                        { key: '2', name: `Delete`, icon: <DeleteOutlined style={{ fontSize: "20px" }} />, keyId: "delete", funcAction: () => handleRemoveManga(manga.manga_id) },
                    ]}
                />
            ),
        },
    ];

    return (
        <Col xxl={16} xs={23} sm={20} className="table-manga">
            <div style={{ display: "flex" }}>
                <Input placeholder="Search..." onChange={(e) => onSearch(e.target.value)} style={{ width: 200, margin: '5px 11px' }} />
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
                dataSource={data}
                pagination={{
                    showTotal: () => `Total ${mangas.length} Manga Series`,
                }}
                rowKey={manga => manga.manga_id}
            // scroll={{ x: 1200 }}

            />

        </Col>
    )
}
