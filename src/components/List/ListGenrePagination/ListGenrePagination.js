import React, { useState, useEffect } from 'react';
import "./ListGenrePagination.css";
import { Col, Row, Card, List } from 'antd';
import LoadingCircle from '../../Loading/LoadingCircle/LoadingCircle';

const { Meta } = Card;

export default function ListGenrePagination() {
    const [listChapters, setListChapter] = useState([
        "Chapter1: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter2: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter3: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter4: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter88: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter6: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter15: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter13: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter143534: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter1344: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter12: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter111: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter135647: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter135647: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter135647: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter135647: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter135647: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter135647: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter135647: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter135647: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter135647: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter135647: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter135647: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter135647: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter135647: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter145: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
    ])
    const [isLoading, setIsLoading] = useState(false)
    const [pageSize, setPageSize] = useState(9)


    useEffect(() => {
        if (window.innerWidth >= 375 && window.innerWidth < 768) {
            setPageSize(6)
        } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
            setPageSize(12)
        } else if (window.innerWidth >= 1024 && window.innerWidth <= 1600) {
            setPageSize(12)
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
                    pageSize: pageSize,
                    defaultCurrent: 1,
                    total: listChapters.length,
                    // total: listChapters.length,
                }}
                dataSource={listChapters}
                footer={false}
                renderItem={item => (
                    <div>
                        <Card
                            id={item}
                            className="card"
                            hoverable
                            cover={<img alt="example" src="https://www.teahub.io/photos/full/76-761792_nier-automata-music-concert.jpg" />}
                        >
                            <Meta title="Manga 22351" description={renderCardDesc()} />
                        </Card>
                    </div>
                )}
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
