import React, { useEffect, useState } from 'react'
import "./MangaGenre.css"
import { Col, Row, Typography, Divider, Tag, Tooltip } from 'antd'
import ListGenrePagination from '../../components/List/ListGenrePagination/ListGenrePagination'


export default function MangaGenres() {
    const [genre, setGenre] = useState({
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
                                <Tooltip title={genre.desc} className="item-tag">
                                    <Tag color={genre.color}>{genre.name}</Tag>
                                </Tooltip>
                            </div>
                        </Typography.Title>
                    </Divider>
                    <Typography.Text className="genre-desc">Story genre inspired by historical events or storylines tied to historical events with the timeline playing an important role.</Typography.Text>
                </div>

                <ListGenrePagination />

            </Col>
        </Row>
    )
}
