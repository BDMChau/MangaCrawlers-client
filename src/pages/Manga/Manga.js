import React, { useEffect, useState } from 'react'
import "./Manga.css"
import { NavLink } from 'react-router-dom';
import { Col, Input, Row, Comment, Avatar, Form, Button } from 'antd';
import ListSide from '../../components/List/ListSide/ListSide';
import ListChapters from '../../components/List/ListChapters/ListChapters';
import Rating from '../../components/Rating/Rating';
import FooterContainer from '../../components/Footer/Footer';
import CommentForm from '../../components/CommentForm/CommentForm';
import { unset } from 'lodash';
import FadingText from '../../components/FadingText/FadingText';
import Spacing from '../../components/Spacing/Spacing'


export default function Manga({weeklyMangas}) {
    const [listChapters, setListChapter] = useState([
        "Chapter1: ",
        "Chapter1: ",
        "Chapter1: ",
        "Chapter1: ",
        "Chapter1: ",
        "Chapter1: ",
        "Chapter1: ",
        "Chapter1: ",
        "Chapter1: ",
        "Chapter1: ",
        "Chapter1: ",
        "Chapter1: ",
        "Chapter1: ",
        "Chapter1: ",
        "Chapter1: ",
        "Chapter1: ",
        "Chapter1: ",
        "Chapter1: ",
        "Chapter1: ",
        "Chapter1: ",

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
                                <Button className="btn-read-now">
                                    <NavLink to="/author/id" style={{ marginLeft: 0 }}>
                                        Read Now
                                </NavLink>
                                </Button>

                                <Button type="primary" className="btn-add-favorite">
                                    Add to Favorite
                                </Button>
                            </div>
                        </Col>


                    </Row>

                    <Row justify={"center"} className="middle">
                        <Col span={24} md={22} lg={23} xxl={22} className="desc-wrapper">
                            <div className="desc">
                                <h2>Description</h2>
                                <FadingText content={"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."} />
                            </div>
                        </Col>
                        <Col span={24} md={22} lg={23} xxl={22} className="chapter-list">
                            <h3>Chapters</h3>
                            <div className="line"></div>

                            <ListChapters listData={listChapters} height={"400px"} />
                        </Col>



                        <Col span={24} md={22} lg={23} xxl={16} className="manga-comments">
                            <Spacing />
                            <div className="comments">
                                <h2>MangaClawers Comments</h2>
                                <div className="comments-body">
                                    <CommentForm />
                                </div>

                            </div>
                        </Col>

                        <Col span={24} md={22} lg={23} xxl={6} className="rank-list">
                            <div className="top-week-rank">
                                <h3>Weekly Manga Ranking</h3>

                                <ListSide mangas={weeklyMangas} height={"415px"} />

                            </div>
                            <div className="favorite-suggest">
                                <h3>You may also like</h3>

                                <ListSide listData={listChapters} height={"415px"} />
                            </div>
                        </Col>

                        {/* <Col span={24} md={17} xl={17} xxl={22} className="home-footer">
                            <FooterContainer />
                        </Col> */}

                    </Row>
                </Col>

            </Row>
        </div>
    )
}
