import React, { useState, useEffect } from 'react'
import "./Home.css"

import HomeNavbar from '../../components/HomeNavbar/HomeNavbar'
import ListSide from '../../components/List/ListSide/ListSide'
import FooterContainer from '../../components/Footer/Footer'
import CarouselHorizontal from '../../components/Carousels/Horizontal/CarouselHorizontal'
import { Col, Row } from 'antd'
import CarouselVertical from '../../components/Carousels/Vertical/CarouselVertical'
import Spacing from '../../components/Spacing/Spacing'
import ListHomePagination from '../../components/List/ListHomePagination/ListHomePagination'


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

    const renderCardDesc = () => {
        return (
            <div className="desc">
                <span className="desc-1" >Chapter 100</span>
                <span className="desc-2" >10 hours ago</span>
            </div>
        )
    }

    const handleScrollGetMoreMessage = (e) => {
        console.log(e.target.scrollTop)
    }

    return (
        <div className="home" onScroll={(e) => handleScrollGetMoreMessage(e)}>
            <div className="home-bg">
                <div className="home-bg-img"
                    style={{ backgroundImage: `url(https://images.hdqwalls.com/download/anime-scenery-field-4k-9j-1920x1080.jpg)` }}
                >
                </div>
            </div>
            <div className="home-middle-wrap">
                <Row justify={"center"} className="home-middle-header">
                    <HomeNavbar />
                    <Col span={23} md={17} xl={17} xxl={21} className="trending">
                        <h2>Trending Manga</h2>
                        <CarouselHorizontal />
                    </Col>

                    <Col span={23} md={17} xl={17} xxl={21} className="home-spacing-top">
                        <Spacing />
                    </Col>

                    <Row justify={"center"} className="home-middle">
                        <Col span={20} md={10} xl={10} xxl={14} className="lastest">
                            <h2>Lastest Manga</h2>

                            <ListHomePagination />
                        </Col>

                        <Col span={20} md={7} xl={7} xxl={7} className="home-side">
                            <div className="top-manga">
                                <h2>Top Manga</h2>
                                <ListSide listData={listChapters} height={"100%"} />
                            </div>
                            <div className="top-manga">
                                <h2>Top Manga</h2>
                                <ListSide listData={listChapters} height={"100%"} />
                            </div>
                        </Col>

                        <Col span={20} md={17} xl={17} xxl={21} className="home-spacing-bottom">
                            <Spacing />
                        </Col>

                        <Col span={20} md={17} xl={17} xxl={21} className="recommended">
                            <h2>Recommended Manga</h2>
                            <CarouselVertical />
                        </Col>

                        <Col span={20} md={17} xl={17} xxl={21} className="home-footer">
                            <FooterContainer />
                        </Col>

                    </Row>
                </Row>
            </div>
        </div>
    )
}
