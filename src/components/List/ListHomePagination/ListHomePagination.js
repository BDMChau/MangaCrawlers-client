import React, { useState, useEffect, memo } from 'react';
import "./ListHomePagination.css";
import { Row, Card, List } from 'antd';
import LoadingCircle from '../../Loading/LoadingCircle/LoadingCircle';
import arrayMethods from '../../../helpers/arrayMethods';
import { NavLink } from 'react-router-dom';

const { Meta } = Card;

function ListHomePagination({ mangas }) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    // const [pageSize, setPageSize] = useState(9)



    useEffect(() => {
        if (!mangas.length) {
            setIsLoading(true)
        } else {
            setIsLoading(false)

            const shuffledList = arrayMethods.shuffle(mangas);
            setData(shuffledList)
        }
    }, [mangas])

    // useEffect(() => {
    //     if (window.innerWidth >= 375 && window.innerWidth < 768) {
    //         setPageSize(4)
    //     } else if (window.innerWidth >= 768 && window.innerWidth <= 768) {
    //         setPageSize(10)
    //     } else if (window.innerWidth >= 1024 && window.innerWidth <= 1600) {
    //         setPageSize(8)
    //     } else {
    //         setPageSize(9)
    //     }
    // })


    const renderCardDesc = (name, time) => {
        return (<div className="desc" >
            <span className="desc-1" > {name} </span>
            <span className="desc-2" > {time} </span>
        </div >
        )
    }

    const renderLatestManga = () => {
        return (
            isLoading ?
                <LoadingCircle width={"90%"}
                    height="60%"
                    fontSizeIcon={"70px"}
                    fontSizeText={"17px"}
                />
                : <List 
                    itemLayout="vertical"
                    size="large"
                    pagination={
                        {
                            onChange: () => {
                                console.log("page");
                            },
                            pageSize: 12,
                            defaultCurrent: 1,
                            total: data.length,
                        }
                    }
                    dataSource={data}
                    footer={false}
                    renderItem={
                        manga => (<div id={manga.manga_id} >
                            <NavLink to={`/manga/${manga.manga_id}`}>
                                <Card id={manga.manga_id}
                                    className="card"
                                    hoverable
                                     cover={< div className="manga-img"
                                        alt="example"
                                        style={
                                            { backgroundImage: `url(${manga.thumbnail})` }
                                        }
                                    />} > <Meta
                                        title={manga.manga_name}
                                        description={renderCardDesc(manga.chapter_name, manga.createdAt)}
                                    />
                                </Card>
                            </NavLink>
                        </div>
                        )
                    }
                />

        )
    }

    return (
        <div className="list-home-pagination" >

            <Row className="latest-cards" >

                {renderLatestManga()}

            </Row>

        </div>
    )
}

export default memo(ListHomePagination);