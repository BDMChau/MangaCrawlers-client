import React, { useState, useEffect } from 'react'
import "./Home.css"

import HomeNavbar from '../../components/HomeNavbar/HomeNavbar'
import ListSide from '../../components/List/ListSide/ListSide'
import FooterContainer from '../../components/Footer/Footer'
import CarouselHorizontal from '../../components/Carousels/Horizontal/CarouselHorizontal'
import { Col, Row } from 'antd'
import CarouselVertical from '../../components/Carousels/Vertical/CarouselVertical'
import Spacing from '../../components/Spacing/Spacing'

const ListHomePagination = React.lazy(() => import('../../components/List/ListHomePagination/ListHomePagination'))

export default function Home() {
    const [listChapters, setListChapter] = useState([
        "Chapter1: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter1: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter1: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter1: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter1: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter1: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter1: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter1: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter1: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter1: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter1: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter1: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter1: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
        "Chapter1: fgbnfnhfgnmghfmghjmgmfghnfghbfgmnghmghjm,hhhhhhhhhhhh",
    ])


    return (
        <div className="home">
            <div className="home-bg">
                <div className="home-bg-img"
                    // style={{ backgroundImage: `url(https://images.hdqwalls.com/download/anime-scenery-field-4k-9j-1920x1080.jpg)` }}
                >
                </div>
            </div>
            <div className="home-middle-wrap">
                <Row justify={"center"} className="home-middle-header">
                    <HomeNavbar />
                    <Col span={23} md={21} xl={17} xxl={21} className="trending">
                        <h2>Trending Manga</h2>
                        <CarouselHorizontal />
                    </Col>

                    <Col span={23} md={20} xl={17} xxl={21} className="home-spacing-top">
                        <Spacing />
                    </Col>

                    <Row justify={"center"} className="home-middle">
                        <Col span={16} md={11} xl={10} xxl={14} className="lastest">
                            <h2>Lastest Manga</h2>

                            <ListHomePagination />
                        </Col>

                        <Col span={16} md={8} xl={7} xxl={7} className="home-side">
                            <div className="top-manga">
                                <h2>Top Manga Ranking</h2>
                                <ListSide listData={listChapters} height={"415px"} />
                            </div>
                            <div className="weekly-manga">
                                <h2>Weekly Manga Ranking</h2>
                                <ListSide listData={listChapters} height={"415px"} />
                            </div>
                        </Col>

                        <Col span={16} md={21} xl={17} xxl={21} className="home-spacing-bottom">
                            <Spacing />
                        </Col>

                        <Col span={16} md={21} xl={17} xxl={21} className="recommended">
                            <h2>Wallpaper</h2>
                            <CarouselVertical />
                        </Col>

                        <Col span={16} md={21} xl={17} xxl={21} className="home-footer">
                            <FooterContainer />
                        </Col>

                    </Row>
                </Row>
            </div>
        </div>
    )
}
