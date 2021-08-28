import React, { useEffect, useState } from 'react'
import "./MangaGenres.css"
import { Col, Row, Typography, Divider, Popover, Tag, Tooltip, Button } from 'antd'
import ListGenrePagination from '../../../components/List/ListGenrePagination/ListGenrePagination'
import { LeftOutlined } from "@ant-design/icons"
import { useHistory } from 'react-router'

export default function MangaGenres({ mangas, genres }) {
    const [isFlexWrap, setIsFlexWrap] = useState(false)
    const history = useHistory()


    // check resposive tags title
    useEffect(() => {
        if (window.innerWidth >= 375 && window.innerWidth <= 414 && genres.length >= 5) {
            setIsFlexWrap(true)
        }
    }, [])


    return (
        <Row justify={"center"} className="manga-genres" >
            <Col sm={24} md={21} xl={17} xxl={21} className="manga-list" >
                <div className="title">
                    <Divider orientation="left" style={{ borderTopColor: "#a2a2a2" }}>
                        <Button title="Back to search with genres" className="btn-left" onClick={() => history.push("/search")}>
                            <LeftOutlined style={{ fontSize: "20px", margin: "4px 0px 0px -6px" }} />
                        </Button>
                        <Typography.Title level={5} className="title-h5" style={{ flexWrap: isFlexWrap ? "wrap" : "unset" }}>
                            Genre(s):
                            {
                                genres.length
                                    ? genres.map((item, i) => {
                                        if (item !== null) {
                                            return (
                                                <Tooltip title={item.genre_description} className="item-tag">
                                                    <Tag key={i} color={item.genre_color}>{item.genre_name}</Tag>
                                                </Tooltip>
                                            )
                                        }
                                    })
                                    : ""
                            }
                        </Typography.Title>
                    </Divider>
                </div>

                <ListGenrePagination mangas={mangas} />

            </Col>
        </Row>
    )
}
