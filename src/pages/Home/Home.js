import React, { useState, useEffect } from 'react'
import "./Home.css"

import HomeNavbar from '../../components/HomeNavbar/HomeNavbar'
import ListSide from '../../components/List/ListSide/ListSide'
import CarouselHorizontal from '../../components/Carousels/Horizontal/CarouselHorizontal'
import { Col, Divider, Row } from 'antd'
import CarouselVertical from '../../components/Carousels/Vertical/CarouselVertical'
import Spacing from '../../components/Spacing/Spacing'

const ListHomePagination = React.lazy(() => import('../../components/List/ListHomePagination/ListHomePagination'))

export default function Home({latestMangas, topMangas, weeklyMangas, searchResults, onSearch, isLoadingSearch}) {
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
                    //  style={{ backgroundImage: `url("../../assets/img/wallpaper.jpg")` }}
                >
                <CarouselHorizontal itemsShow={1} isCenter={false} arrows={false} autoplaySpeed={4000} isPadding={false} />
                </div>
            </div>
            <div className="home-middle-wrap">
                <Row justify={"center"} className="home-middle-header">
                    <HomeNavbar 
                        searchResults={searchResults} 
                        onSearch={(val) => onSearch(val)} 
                        isLoadingSearch={isLoadingSearch}
                    />

                    <Col span={23} md={21} xl={17} xxl={21} className="trending">
                    <Divider orientation="left" style={{ borderTopColor: "#a2a2a2" }}><h2>Trending Manga</h2></Divider>
                        <CarouselHorizontal isCenter={false} arrows={true} autoplaySpeed={6000} isPadding={true} />
                    </Col>

                    <Col span={23} md={20} xl={17} xxl={21} className="home-spacing-top">
                        <Spacing />
                    </Col>

                    <Row justify={"center"} className="home-middle">
                        <Col span={16} md={11} xl={10} xxl={14} className="lastest">
                            <h2>Lastest Manga</h2>

                            <ListHomePagination mangas={latestMangas} />
                        </Col>

                        <Col span={16} md={8} xl={7} xxl={7} className="home-side">
                            <div className="weekly-manga">
                                <h2>Weekly Manga Ranking</h2>
                                <ListSide mangas={weeklyMangas} height={"415px"} />
                            </div>
                            <div className="top-manga">
                                <h2>Top Manga Ranking</h2>
                                <ListSide mangas={topMangas} height={"415px"} />
                            </div>
                        </Col>

                        <Col span={16} md={21} xl={17} xxl={21} className="home-spacing-bottom">
                            <Spacing />
                        </Col>

                        <Col span={16} md={21} xl={17} xxl={21} className="recommended">
                            <h2>Wallpaper</h2>
                            <CarouselVertical />
                        </Col>

                        {/* <Col span={16} md={21} xl={17} xxl={21} className="home-footer">
                            <FooterContainer />
                        </Col> */}

                    </Row>
                </Row>
            </div>
        </div>
    )
}
