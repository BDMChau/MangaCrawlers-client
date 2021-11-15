import React from 'react'
import "./MangaGenre.css"
import { Col, Row, Typography, Divider, Tag, Tooltip, Button } from 'antd'
import ListGenrePagination from '../../../components/List/ListGenrePagination/ListGenrePagination'
import { LeftOutlined } from "@ant-design/icons"
import { useHistory } from 'react-router'


export default function MangaGenres({ genre, mangas }) {
    const history = useHistory();

    return (
        <Row justify={"center"} className="manga-genre" >
            <Col sm={24} md={21} xl={17} xxl={21} className="manga-list" >
                <div className="title">
                    <Divider orientation="left" style={{ borderTopColor: "#a2a2a2", marginBottom: 0 }}>
                        <Button title="Back to search with genres" className="btn-left" onClick={() => history.push("/search_with_genres")}>
                            <LeftOutlined style={{ fontSize: "20px", margin: "4px 0px 0px -6px" }} />
                        </Button>
                        <Typography.Title level={5} className="title-h5">
                            Genre:
                            <div>
                                {Object.keys(genre).length
                                    ? <Tooltip title={genre.genre_desc} className="item-tag">
                                        <Tag color={genre.genre_color}>{genre.genre_name}</Tag>
                                    </Tooltip>
                                    : ""
                                }
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
