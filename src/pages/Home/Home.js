import React, { useState } from 'react'
import "./Home.css"

import HomeNavbar from '../../components/HomeNavbar/HomeNavbar'
import ListSide from '../../components/List/ListSide/ListSide'
import FooterContainer from '../../components/Footer/Footer'
import CarouselHorizontal from '../../components/Sliders/Horizontal/CarouselHorizontal'
import { Col, Row, Card } from 'antd'
import CarouselVertical from '../../components/Sliders/Vertical/CarouselVertical'

const { Meta } = Card;

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

    return (
        <div className="home">
            <div className="home-bg">
                <div className="home-bg-img"
                    style={{ backgroundImage: `url(https://cdnb.artstation.com/p/users/covers/000/055/173/default/7bd1ec476c0745b4abb2134af68db53c.jpg?1524656521)` }}
                >
                </div>
            </div>
            <Row justify={"center"} className="home-middle-header">
                <HomeNavbar />
                <Col span={23} md={20} xl={15} className="recommended">
                    <h2>Recommended Manga</h2>
                    <CarouselHorizontal />
                </Col>

                <Row justify={"center"} className="home-middle">
                    <Col span={23} md={12} xl={9} xxl={10} className="lastest">
                        <h2>Lastest Manga</h2>
                        <Row className="latest-cards">
                            <Card
                                className="card"
                                hoverable
                                cover={<img alt="example" src="https://www.teahub.io/photos/full/76-761792_nier-automata-music-concert.jpg" />}
                            >
                                <Meta title="Manga 1" description={renderCardDesc()} />
                            </Card>
                            <Card
                                className="card"
                                hoverable
                                cover={<img alt="example" src="https://www.teahub.io/photos/full/76-761792_nier-automata-music-concert.jpg" />}
                            >
                                <Meta title="Manga 1" description={renderCardDesc()} />
                            </Card>
                            <Card
                                className="card"
                                hoverable
                                cover={<img alt="example" src="https://www.teahub.io/photos/full/76-761792_nier-automata-music-concert.jpg" />}
                            >
                                <Meta title="Manga 1" description={renderCardDesc()} />
                            </Card>
                            <Card
                                className="card"
                                hoverable
                                cover={<img alt="example" src="https://www.teahub.io/photos/full/76-761792_nier-automata-music-concert.jpg" />}
                            >
                                <Meta title="Manga 1" description={renderCardDesc()} />
                            </Card>
                            <Card
                                className="card"
                                hoverable
                                cover={<img alt="example" src="https://www.teahub.io/photos/full/76-761792_nier-automata-music-concert.jpg" />}
                            >
                                <Meta title="Manga 1" description={renderCardDesc()} />
                            </Card>
                            <Card
                                className="card"
                                hoverable
                                cover={<img alt="example" src="https://www.teahub.io/photos/full/76-761792_nier-automata-music-concert.jpg" />}
                            >
                                <Meta title="Manga 1" description={renderCardDesc()} />
                            </Card>
                            <Card
                                className="card"
                                hoverable
                                cover={<img alt="example" src="https://www.teahub.io/photos/full/76-761792_nier-automata-music-concert.jpg" />}
                            >
                                <Meta title="Manga 1" description={renderCardDesc()} />
                            </Card>
                            <Card
                                className="card"
                                hoverable
                                cover={<img alt="example" src="https://www.teahub.io/photos/full/76-761792_nier-automata-music-concert.jpg" />}
                            >
                                <Meta title="Manga 1" description={renderCardDesc()} />
                            </Card>
                            <Card
                                className="card"
                                hoverable
                                cover={<img alt="example" src="https://www.teahub.io/photos/full/76-761792_nier-automata-music-concert.jpg" />}
                            >
                                <Meta title="Manga 1" description={renderCardDesc()} />
                            </Card>
                            <Card
                                className="card"
                                hoverable
                                cover={<img alt="example" src="https://www.teahub.io/photos/full/76-761792_nier-automata-music-concert.jpg" />}
                            >
                                <Meta title="Manga 1" description={renderCardDesc()} />
                            </Card>
                            <Card
                                className="card"
                                hoverable
                                cover={<img alt="example" src="https://www.teahub.io/photos/full/76-761792_nier-automata-music-concert.jpg" />}
                            >
                                <Meta title="Manga 1" description={renderCardDesc()} />
                            </Card>
                            <Card
                                className="card"
                                hoverable
                                cover={<img alt="example" src="https://www.teahub.io/photos/full/76-761792_nier-automata-music-concert.jpg" />}
                            >
                                <Meta title="Manga 1" description={renderCardDesc()} />
                            </Card>
                            <Card
                                className="card"
                                hoverable
                                cover={<img alt="example" src="https://www.teahub.io/photos/full/76-761792_nier-automata-music-concert.jpg" />}
                            >
                                <Meta title="Manga 1" description={renderCardDesc()} />
                            </Card>
                        </Row>
                    </Col>

                    <Col span={23} md={8} xl={6} xxl={5} className="home-side">
                        <div className="top-manga">
                            <h2>Top Manga</h2>
                            <ListSide listData={listChapters} height={"100%"} />
                        </div>

                    </Col>

                    <Col span={23} md={20} xl={15} className="trending">
                        <h2>Trending Manga</h2>
                        <CarouselVertical />
                    </Col>

                    <FooterContainer />
                </Row>
            </Row>
        </div>
    )
}
