import React, { useState, useEffect, memo } from 'react';
import "./ListGenrePagination.css";
import { Row, Card, List } from 'antd';
import LoadingCircle from '../../Loading/LoadingCircle/LoadingCircle';
import { useHistory } from 'react-router';

const { Meta } = Card;

function ListGenrePagination({mangas}) {
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
    const history = useHistory();

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
                        <Card
                            id={manga.manga_id}
                            onClick={() => history.push(`/manga/${manga.manga_id}`)}
                            className="card"
                            hoverable
                            cover={<div className="manga-img" alt="example" style={{ backgroundImage: `url(${manga.thumbnail})`}} />}
                        >
                            <Meta title={manga.manga_name} description={renderCardDesc()} />
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


export default memo(ListGenrePagination)