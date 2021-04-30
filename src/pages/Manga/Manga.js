import React, { useEffect, useState } from 'react'
import "./Manga.css"
import starblank from "../../assets/img/starblank.svg"
import starfilled from "../../assets/img/starfilled.svg"
import { NavLink } from 'react-router-dom';
import { Col, Row } from 'antd';
import ListManga from '../../components/ListManga/ListManga';
import ListChapters from '../../components/ListManga/ListChapters';


export default function Manga() {
    const [listChapters, setListChapter] = useState([
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
            <Col xl={16} lg={20} sm={22} xs={24} className="manga-body">
                <div className="header">
                    <div className="thumbnail">
                        <div className="thumbnail-img"
                            style={{ backgroundImage: `url(https://static.zerochan.net/YoRHa.No.2.Type.B.full.2067762.jpg)` }}
                        >
                        </div>
                    </div>
                    <div className="title">
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
                    </div>
                </div>

                <div className="middle">
                    <div className="chapter-list">
                        <h3>Chapters</h3>
                        <div className="line"></div>

                        <ListChapters listData={listChapters} height={"500px"} />
                    </div>

                    <div className="rank-list">
                        <div className="top-week-rank">
                            <h3>Weekly Manga Ranking</h3>

                            <ListManga listData={listChapters} height={"100%"} />

                        </div>
                        <div className="favorite-suggest">
                            <h3>You may also like</h3>

                            <ListManga listData={listChapters} height={"100%"} />

                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}
