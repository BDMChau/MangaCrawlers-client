import React, { useEffect, useState } from 'react'
import "./MangaGenres.css"
import { Col, Row, Typography, Divider, Popover, Tag, Tooltip } from 'antd'
import ListGenrePagination from '../../components/List/ListGenrePagination/ListGenrePagination'


export default function MangaGenres() {
    const [genres, setGenres] = useState([
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },

    ])
    const [isFlexWrap, setIsFlexWrap] = useState(false)


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
                        <Typography.Title level={5} className="title-h5" style={{ flexWrap: isFlexWrap ? "wrap" : "unset" }}>
                            Genre(s):
                            {
                                genres.map((item) => {
                                    if (item !== null) {
                                        return (
                                            <Tooltip title={item.desc} className="item-tag">
                                                <Tag color={item.color}>{item.name}</Tag>
                                            </Tooltip>
                                        )
                                    }
                                })
                            }
                        </Typography.Title>
                    </Divider>
                </div>

                <ListGenrePagination />

            </Col>
        </Row>
    )
}
