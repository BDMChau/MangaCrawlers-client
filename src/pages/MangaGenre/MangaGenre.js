import React, { useEffect } from 'react'
import "./MangaGenre.css"
import { Col, Row, Typography } from 'antd'
import ListGenrePagination from '../../components/List/ListGenrePagination/ListGenrePagination'
import FooterContainer from "../../components/Footer/Footer"


export default function MangaGenre() {


    return (
            <Row justify={"center"} className="manga-genre" >
                <Col sm={24} md={21} xl={17} xxl={21} className="manga-list" >
                    <div className="title">
                        <Typography.Title level={3} >Genre: Action</Typography.Title>
                    </div>
                    <ListGenrePagination />
                    
                </Col>
            </Row>
    )
}
