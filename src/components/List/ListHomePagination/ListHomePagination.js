import React, { useState, useEffect, memo } from 'react';
import "./ListHomePagination.css";
import { Col, Row, Card, List } from 'antd';
import LoadingCircle from '../../Loading/LoadingCircle/LoadingCircle';
import { useHistory } from 'react-router';
import ArrayMethods from '../../../helpers/ArrayMethods';

const { Meta } = Card;

function ListHomePagination({ allMangas }) {
    const [listChapters, setListChapter] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [pageSize, setPageSize] = useState(9)
    const history = useHistory()



    useEffect(() => {
        if (!allMangas.length) {
            setIsLoading(true)
        } else {
            setIsLoading(false)
            
            const shuffledList = ArrayMethods.shuffle(allMangas);
            setListChapter(shuffledList)
        }
    }, [allMangas])

    useEffect(() => {
        if (window.innerWidth >= 375 && window.innerWidth <= 768) {
            setPageSize(4)
        } else if (window.innerWidth >= 768 && window.innerWidth <= 768) {
            setPageSize(10)
        } else if (window.innerWidth >= 1024 && window.innerWidth <= 1600) {
            setPageSize(8)
        } else {
            setPageSize(9)
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

    const renderLatestManga = () => {
        return (
            isLoading
                ? <LoadingCircle width={"90%"} height="60%" fontSizeIcon={"70px"} fontSizeText={"17px"} />
                : <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: () => {
                            console.log("page");
                        },
                        pageSize: pageSize,
                        defaultCurrent: 1,
                        total: listChapters.length,
                    }}
                    dataSource={listChapters}
                    footer={false}
                    renderItem={item => (
                        <div>
                            <Card
                                id={item.manga_id}
                                onClick={() => history.push(`/manga/${item.manga_id}`)}
                                className="card"
                                hoverable
                                cover={<div className="manga-img" alt="example" style={{ backgroundImage: `url(${item.thumbnail})` }} />}
                            >
                                <Meta title={item.manga_name} description={renderCardDesc()} />
                            </Card>
                        </div>
                    )}
                />

        )
    }

    return (
        <div className="list-home-pagination">

            <Row className="latest-cards">

                {renderLatestManga()}

            </Row>

        </div>
    )
}

export default memo(ListHomePagination)