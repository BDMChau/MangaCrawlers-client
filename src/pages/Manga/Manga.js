import React, { useEffect, useState } from 'react'
import "./Manga.css"
import starblank from "../../assets/img/starblank.svg"
import starfilled from "../../assets/img/starfilled.svg"
import { NavLink } from 'react-router-dom';
import { Col, Input, Row } from 'antd';
import ListSide from '../../components/List/ListSide/ListSide';
import ListChapters from '../../components/List/ListChapters/ListChapters';
import Rating from '../../components/Rating/Rating';
import FooterContainer from '../../components/Footer/Footer';

const { TextArea } = Input;

export default function Manga() {
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
        <div className="manga">
            <Row justify={'center'}>
                <div className="manga-bg">
                    <div className="manga-bg-img"
                        style={{ backgroundImage: `url(https://static.zerochan.net/YoRHa.No.2.Type.B.full.2067762.jpg)` }}
                    >
                    </div>
                </div>
            </Row>
            <Row justify={"center"} className="manga-body-row">
                <Col span={23} md={17} xxl={19} className="manga-body">
                    <Row justify={"center"} className="header">
                        <Col md={4} sm={3} lg={4} xxl={4} className="thumbnail">
                            <img className="thumbnail-img" src="https://static.zerochan.net/YoRHa.No.2.Type.B.full.2067762.jpg" alt="" />
                        </Col>
                        <Col md={13} lg={12} sm={4} xs={20} xxl={15} className="title">
                            <div className="name">
                                <h3>Nier: Automata</h3>
                            </div>

                            <div className="author">
                                Author:
                            <NavLink to="/author/id" className="link">
                                    AuthorName
                            </NavLink>
                            </div>

                            <div className="genre">
                                <NavLink to="/author/id" className="link">
                                    Genre
                                </NavLink>
                                <NavLink to="/author/id" className="link">
                                    Genre
                                </NavLink>
                            </div>

                            <div className="manga-rating">
                                <Rating />
                            </div>

                            <div className="interact">
                                <NavLink to="/author/id" className="link" style={{ marginLeft: 0 }}>
                                    Read Now
                                </NavLink>

                                <NavLink to="/author/id" className="link">
                                    Add to Library
                                </NavLink>
                            </div>
                        </Col>


                    </Row>

                    <Row justify={"center"} className="middle">
                        <Col span={24} md={22} lg={23} xxl={22} className="desc-wrapper">
                            <div className="desc">
                                <h2>Description</h2>
                                <p> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.  </p>
                            </div>
                        </Col>
                        <Col span={24} md={22} lg={23} xxl={22} className="chapter-list">
                            <h3>Chapters</h3>
                            <div className="line"></div>

                            <ListChapters listData={listChapters} height={"400px"} />
                        </Col>

                        <Col span={24} md={22} lg={23} xxl={16} className="chapter-comments">

                            <div className="comments">
                                <h2>Manga Clawers</h2>
                                <div className="text"> </div>
                                <TextArea className="input" placeholder="Write a comment..." />
                            </div>
                        </Col>

                        <Col span={24} md={22} lg={23} xxl={6} className="rank-list">
                            <div className="top-week-rank">
                                <h3>Weekly Manga Ranking</h3>

                                <ListSide listData={listChapters} height={"100%"} />

                            </div>
                            <div className="favorite-suggest">
                                <h3>You may also like</h3>

                                <ListSide listData={listChapters} height={"100%"} />
                            </div>
                        </Col>

                        <Col span={24} md={17} xl={17} xxl={22} className="home-footer">
                            <FooterContainer />
                        </Col>

                    </Row>
                </Col>

            </Row>
        </div>
    )
}
