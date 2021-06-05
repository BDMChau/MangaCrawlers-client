import { Col, Empty, Image, List, Typography } from 'antd'
import React from 'react'
import "./ListVersion02.css"
import Rating from "../../Rating/Rating"
import { NavLink } from 'react-router-dom'

export default function ListVersion02({ mangas }) {
    // const [pageSize, setPageSize] = useState(9)

    React.useEffect(() => {
        console.log(mangas)
    }, [mangas.length])

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
                }}
                dataSource={mangas}
                footer={false}
                renderItem={manga => (
                    <NavLink to={manga.isProject ? `/user/projects/upload?v=${manga.manga_id}` : `/manga/${manga.manga_id}`} className="item">
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
                                    <Rating stars={manga.stars} hideText={true} />
                                </div>
                            </div>

                            <div className="item-chapter">
                                <Typography.Text className="chapter-name">{manga.chapter_name ? manga.chapter_name : ""}</Typography.Text>
                                <Typography.Text style={{ fontStyle: "italic" }} className="created-at" >{manga.createdAt ? manga.createdAt : ""}</Typography.Text>
                            </div>
                        </div>
                    </NavLink>
                )}
            />
            : <Empty
                description="You haven't do anything yet"
                style={{ marginTop: "40px", color: "#8a8d92", fontSize: "18px" }}
            />


    )



    return (
        <Col xs={24} md={20} xl={20} xxl={20} className="col-list-follow" >
            {renderMangas()}
        </Col>
    )
}
