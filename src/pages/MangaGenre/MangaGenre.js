import React, { useEffect, useState } from 'react'
import "./MangaGenre.css"
import { Col, Row, Typography, Divider, Tag, Tooltip } from 'antd'
import ListGenrePagination from '../../components/List/ListGenrePagination/ListGenrePagination'


export default function MangaGenres({ genre, mangas }) {
    const [genreas, setGenreasc] = useState({
        name: "Action",
        desc: "ascccccc cccccccc cccccccccg fbfsdfvdhjkfbd vindilbnrdi obrnbfdl kbnfl;g",
        color: "red"
    })





    return (
        <Row justify={"center"} className="manga-genre" >
            <Col sm={24} md={21} xl={17} xxl={21} className="manga-list" >
                <div className="title">
                    <Divider orientation="left" style={{ borderTopColor: "#a2a2a2", marginBottom: 0 }}>
                        <Typography.Title level={5} className="title-h5">
                            Genre:
                             <div>
                                <Tooltip title={genre.genre_desc} className="item-tag">
                                    <Tag color={genre.genre_color}>{genre.genre_name}</Tag>
                                </Tooltip>
                            </div>
                        </Typography.Title>
                    </Divider>
                    <Typography.Text className="genre-desc">{genre.genre_desc}</Typography.Text>
                </div>

                <ListGenrePagination mangas={mangas} />

            </Col>
        </Row>
    )
}
