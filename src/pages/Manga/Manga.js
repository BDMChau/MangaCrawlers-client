import React, { useEffect, useState } from 'react'
import "./Manga.css"
import starblank from "../../assets/img/starblank.svg"
import starfilled from "../../assets/img/starfilled.svg"
import { NavLink } from 'react-router-dom';
import { Col, Input, Row } from 'antd';
import ListSide from '../../components/List/ListSide/ListSide';
import ListChapters from '../../components/List/ListChapters/ListChapters';

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
        <Row justify={'center'} className="manga">
            <Col span={24} className="manga-bg">
                <div className="manga-bg-img"
                    style={{ backgroundImage: `url(https://static.zerochan.net/YoRHa.No.2.Type.B.full.2067762.jpg)` }}
                >
                </div>
            </Col>
            <Row justify={"center"} className="manga-body-row">
                <Col md={18} lg={23} sm={22} xs={18} xl={24} className="manga-body">
                    <Row justify={"center"} className="header">
                        <Col md={4} sm={3} lg={4} xl={3} className="thumbnail">
                            <img className="thumbnail-img" src="https://static.zerochan.net/YoRHa.No.2.Type.B.full.2067762.jpg" alt="" />
                        </Col>
                        <Col md={13} lg={12} sm={4} xs={20} xl={18} className="title">

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

                            <div className="desc">
                                <p> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make  </p>
                            </div>

                            <div className="evalute">
                                <img className="evalute-img" src={starfilled} alt="" />
                                <img className="evalute-img" src={starfilled} alt="" />
                                <img className="evalute-img" src={starfilled} alt="" />
                                <img className="evalute-img" src={starfilled} alt="" />
                                <img className="evalute-img" src={starblank} alt="" />
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

                    <Row className="middle">
                        <Col md={16} lg={12} sm={4} xs={20} xl={15} className="chapter-list">
                            <h3>Chapters</h3>
                            <div className="line"></div>

                            <ListChapters listData={listChapters} height={"400px"} />

                            <div className="comments">
                                <h2>Manga Clawers</h2>
                                <div className="text"> </div>
                                <TextArea className="input" placeholder="Write a comment..." />
                            </div>
                        </Col>


                        <Col md={6} lg={6} sm={4} xs={14} xl={7} className="rank-list">
                            <div className="top-week-rank">
                                <h3>Weekly Manga Ranking</h3>

                                <ListSide listData={listChapters} height={"100%"} />

                            </div>
                            <div className="favorite-suggest">
                                <h3>You may also like</h3>

                                <ListSide listData={listChapters} height={"100%"} />

                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Row>
    )
}
