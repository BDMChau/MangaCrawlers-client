import { Col, Empty, Image, List, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import "./ListFollowing.css"
import Rating from "../../Rating/Rating"
import { NavLink } from 'react-router-dom'

export default function ListFollowing({ mangas }) {
    // const [pageSize, setPageSize] = useState(9)

    // useEffect(() => {
    //     if (window.innerWidth >= 375 && window.innerWidth < 768) {
    //         setPageSize(5)
    //     } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
    //         setPageSize(8)
    //     } else if (window.innerWidth >= 1024 && window.innerWidth <= 1200) {
    //         setPageSize(12)
    //     } else if (window.innerWidth >= 1200 && window.innerWidth <= 1600) {
    //         setPageSize(9)
    //     } else {
    //         setPageSize(10)
    //     }
    // }, [])

    const renderMangas = () => (
        mangas.length
            ? <List
                className="list-following"
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: () => {
                        console.log("page");
                    },
                    pageSize: 10,
                    defaultCurrent: 1,
                    total: mangas.length,
                    // total: listChapters.length,
                }}
                dataSource={mangas}
                footer={false}
                renderItem={manga => (
                    <NavLink to={`/manga/${manga.manga_id}`} className="item">
                        <div className="item-img">
                            <Image
                                className="img"
                                src={manga.thumbnail}
                                alt=""
                                preview={false}
                            />
                        </div>
                        <div className="item-title">
                            <div className="item-manga">
                                <Typography.Title className="manga-name" level={5} style={{ cursor: "pointer" }} title={manga.manga_name} >{manga.manga_name}</Typography.Title>
                                <Typography.Text className="author-name" title={manga.author}>{manga.author}</Typography.Text>
                                <Typography.Text title="views">{manga.views ? manga.views : 0} view(s)</Typography.Text>
                                <Typography.Text title="status" style={{ color: manga.status === "Completed" ? "#52c41a" : "#189cfc" }}>
                                    {manga.status ? manga.status : ""}
                                </Typography.Text>
                                <div style={{ pointerEvents: "none" }} >
                                    <Rating stars={manga.rating} />
                                </div>
                            </div>

                            <div className="item-chapter">
                                <Typography.Text className="chapter-name">{manga.chapter_name ? manga.chapter_name : ""}</Typography.Text>
                                <Typography.Text className="created-at" >{manga.createdAt ? manga.createdAt : ""}</Typography.Text>
                            </div>
                        </div>
                    </NavLink>
                )}
            />
            : <Empty
                description="You haven't read anything yet"
                style={{ marginTop: "40px", color: "#8a8d92", fontSize: "18px" }}
            />


    )



    return (
        <Col xs={24} md={20} xl={20} xxl={20} className="col-list-follow" >
            {renderMangas()}
        </Col>
    )
}
