import { Col, Empty, Image, List, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import "./ListFollowing.css"
import Rating from "../../Rating/Rating"

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
                    <div className="item">
                        <div className="item-img">
                            <Image
                                className="img"
                                src={manga.url}
                                alt=""
                                preview={false}
                            />
                        </div>
                        <div className="item-title">
                            <div className="item-manga">
                                <Typography.Title className="manga-name" level={5} style={{ cursor: "pointer" }} title="manga name" >{manga.name}</Typography.Title>
                                <Typography.Text className="author-name">{manga.author}</Typography.Text>
                                <Typography.Text>{manga.view} view(s)</Typography.Text>
                                <Rating stars={manga.rating} />
                            </div>

                            <div className="item-chapter">
                                <Typography.Text className="chapter-name">chapter 14</Typography.Text>
                                <Typography.Text className="created-at" >17-05-2021</Typography.Text>
                            </div>
                        </div>
                    </div>
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
