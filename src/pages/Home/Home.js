import React from 'react'
import "./Home.css"

import HomeNavbar from '../../components/HomeNavbar/HomeNavbar'
import FooterContainer from '../../components/Footer/Footer'
import SliderHorizontal from '../../components/Sliders/SliderHorizontal'
import { Col, Row, Card } from 'antd'

const { Meta } = Card;

export default function Home() {



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
                <Col span={20} xl={15} className="recommended">
                    <h2>Recommended Manga</h2>
                    <SliderHorizontal />
                </Col>

               <Row justify={"center"} className="home-middle">
               <Col span={13} md={12} xl={9} xxl={10} className="lastest">
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
                <Col span={7} md={8} xl={6} xxl={5} className="popular">
                    <h2>Popular Manga</h2>
                </Col>

                <FooterContainer />
               </Row>
            </Row>
        </div>
    )
}
