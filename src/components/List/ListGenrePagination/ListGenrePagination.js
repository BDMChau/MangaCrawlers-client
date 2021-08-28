import React, { useState, useEffect, memo } from 'react';
import "./ListGenrePagination.css";
import { Row, Card, List } from 'antd';
import LoadingCircle from '../../Loading/LoadingCircle/LoadingCircle';
import { NavLink } from 'react-router-dom';
import { regex } from 'config/regex';

const { Meta } = Card;

function ListGenrePagination({ mangas }) {
    const [isLoading] = useState(false)
    const [, setPageSize] = useState(9)

    // responsive items quantity
    useEffect(() => {
        if (window.innerWidth >= 375 && window.innerWidth < 768) {
            setPageSize(6)
        } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
            setPageSize(12)
        } else if (window.innerWidth >= 1024 && window.innerWidth <= 1200) {
            setPageSize(12)
        } else if (window.innerWidth >= 1200 && window.innerWidth <= 1600) {
            setPageSize(9)
        } else {
            setPageSize(10)
        }
    })


    const renderCardDesc = () => {
        return (
            <div className="desc">
                <span className="desc-1" >Chapter 100</span>
                <span className="desc-2" >10 hours ago</span>
            </div>
        )
    }

    const renderMangas = () => {
        return (
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: () => {
                        console.log("page");
                    },
                    pageSize: 12,
                    defaultCurrent: 1,
                    total: 10,
                    // total: listChapters.length,
                }}
                dataSource={mangas}
                footer={false}
                renderItem={manga => (
                    <div>
                        <NavLink to={`/manga/${manga.manga_name.replaceAll(regex.special_char, "-")}-${manga.manga_id}`}>
                            <Card
                                id={manga.manga_id}
                                className="card"
                                hoverable
                                cover={<div className="manga-img" alt="example" style={{ backgroundImage: `url(${manga.thumbnail})` }} />}
                            >
                                <Meta title={manga.manga_name} description={renderCardDesc()} />
                            </Card>
                        </NavLink>
                    </div >
                )
                }
            />
        )
    }

    return (
        <div className="list-genre-pagination">

            <Row justify={"center"} className="manga-genre-cards">
                {isLoading
                    ? <LoadingCircle width={"90%"} height="60%" fontSizeIcon={"70px"} fontSizeText={"17px"} />
                    : renderMangas()
                }
            </Row>

        </div>
    )
}


export default memo(ListGenrePagination)