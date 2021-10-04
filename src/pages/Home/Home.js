import React from 'react'
import "./Home.css"

import HomeNavbar from '../../components/HomeNavbar/HomeNavbar'
import ListSide from '../../components/List/ListSide/ListSide'
import CarouselHorizontal from '../../components/Carousels/Horizontal/CarouselHorizontal'
import { Col, Divider, Row } from 'antd'
import CarouselVertical from '../../components/Carousels/Vertical/CarouselVertical'
import Spacing from '../../components/Spacing/Spacing'

const ListHomePagination = React.lazy(() => import('../../components/List/ListHomePagination/ListHomePagination'))

export default function Home({
    latestMangas,
    topMangas,
    weeklyMangas,
    dailyMangas,
    isLoading,

    searchResults,
    onSearch,
    isLoadingSearch,
}) {

    return (
        <div className="home">
            <div className="home-bg">
                <div className="home-bg-img"
                //  style={{ backgroundImage: `url("../../assets/img/wallpaper.jpg")` }}
                >
                    <CarouselHorizontal data={[]} itemsShow={1} isCenter={false} arrows={false} autoplaySpeed={4000} isPadding={false} />
                </div>
            </div>
            <div className="home-middle-wrap">
                <Row justify={"center"} className="home-middle-header">
                    <HomeNavbar
                        searchResults={searchResults}
                        onSearch={(val) => onSearch(val)}
                        isLoadingSearch={isLoadingSearch}
                    />

                    <Col span={24} md={21} xl={17} xxl={21} className="trending">
                        <Divider orientation="left" style={{ borderTopColor: "#a2a2a2" }}>
                            <h2>Seasonal</h2>
                        </Divider>
                        <CarouselHorizontal
                            data={dailyMangas}
                            isLoading={isLoading}
                            isCenter={false}
                            arrows={true}
                            autoplaySpeed={6000}
                            isPadding={true}
                        />
                    </Col>

                    <Col span={23} md={20} xl={17} xxl={21} className="home-spacing-top">
                        <Spacing />
                    </Col>

                    <Row justify={"center"} className="home-middle">
                        <Col span={18} md={11} xl={10} xxl={14} xs={16} className="lastest">
                            <h2>Recently Added</h2>

                            <ListHomePagination mangas={latestMangas} />
                        </Col>

                        <Col span={16} md={10} xl={7} xxl={7} className="home-side">
                            <div className="weekly-manga">
                                <h2>Weekly Ranking</h2>
                                <ListSide mangas={weeklyMangas} height={"415px"} isLoading={isLoading} />
                            </div>
                            <div className="top-manga">
                                <h2>Top Views</h2>
                                <ListSide mangas={topMangas} height={"415px"} isLoading={isLoading} />
                            </div>
                        </Col>

                        <Col span={16} md={21} xl={17} xxl={21} className="home-spacing-bottom">
                            <Spacing />
                        </Col>

                        <Col span={16} md={21} xl={17} xxl={21} className="wallpaper">
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
