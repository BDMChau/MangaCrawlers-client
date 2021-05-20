import React, { memo, useEffect, useState } from 'react'
import "./Manga.css"
import { NavLink, useHistory } from 'react-router-dom';
import { Col, Input, Row, Comment, Avatar, Form, Button, Typography, Tag, Tooltip } from 'antd';
import ListSide from '../../components/List/ListSide/ListSide';
import ListChapters from '../../components/List/ListChapters/ListChapters';
import Rating from '../../components/Rating/Rating';
import FooterContainer from '../../components/Footer/Footer';
import CommentForm from '../../components/CommentForm/CommentForm';
import { unset } from 'lodash';
import FadingText from '../../components/FadingText/FadingText';
import Spacing from '../../components/Spacing/Spacing'


function Manga({ weeklyMangas, manga, genres, chapters }) {
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
    const history = useHistory();
    const [chapterId01, setChapterId01] = useState("");


    const goToSearchMangeWithGenrePage = (id) => {
        history.push(`/manga/genre/tag?v=${id}`);
    }

    useEffect(() => {
        if (chapters[0]) {
            setChapterId01(chapters[0].chapter_id)
        }
    }, [chapters])


    return (
        <div className="manga" key={manga.manga_id}>
            <Row justify={'center'}>
                <div className="manga-bg">
                    <div className="manga-bg-img"
                        style={{ backgroundImage: `url(${manga.thumbnail})` }}
                    >
                    </div>
                </div>
            </Row>
            <Row justify={"center"} className="manga-body-row">
                <Col span={23} md={17} xxl={19} className="manga-body">
                    <Row justify={"center"} className="header">
                        <Col md={4} sm={3} lg={4} xxl={4} className="thumbnail">
                            <img className="thumbnail-img" src={manga.thumbnail} alt="" />
                        </Col>
                        <Col md={13} lg={12} sm={4} xs={20} xxl={15} className="title">
                            <div className="name">
                                <h3>{manga.manga_name}</h3>
                            </div>

                            <div className="author">
                                Author:
                            <NavLink to="" className="link" key={manga.author_id}>
                                    {manga.author_name}
                                </NavLink>
                            </div>

                            <div className="genre">
                                {genres
                                    ? genres.map(genre => (
                                        <Tooltip title={genre.genre_description} className="item-tag">
                                            <Tag
                                                className="link"
                                                color={genre.color}
                                                onClick={() => goToSearchMangeWithGenrePage(genre.genre_id)}
                                            >
                                                {genre.genre_name}
                                            </Tag>
                                        </Tooltip>
                                    ))
                                    : ""
                                }

                            </div>
                            <div className="status">
                                <Typography.Text style={{ color: manga.status === "Completed" ? "#52c41a" : "#189cfc" }}>
                                    {manga.status}
                                </Typography.Text>
                            </div>

                            <div className="manga-rating">
                                <Rating stars={manga.stars} />
                            </div>

                            <div className="manga-views">
                                <Typography.Text>{manga.views} views </Typography.Text>
                            </div>

                            <div className="interact">
                                <Button className="btn-read-now" title="Read Now">
                                    <NavLink to={`/chapter/${manga.manga_id}/${chapterId01}`} style={{ marginLeft: 0 }}>
                                        Read Now
                                </NavLink>
                                </Button>

                                <Button type="primary" className="btn-add-favorite" title="Add to Favorite">
                                    Add to Favorite
                                </Button>
                            </div>
                        </Col>


                    </Row>

                    <Row justify={"center"} className="middle">
                        <Col span={24} md={22} lg={23} xxl={22} className="desc-wrapper">
                            <div className="desc">
                                <h2>Description</h2>
                                <FadingText content={manga.description} />
                            </div>
                        </Col>
                        <Col span={24} md={22} lg={23} xxl={22} className="chapter-list">
                            <h3>Chapters</h3>
                            <div className="line"></div>

                            <ListChapters chapters={chapters} mangaId={manga.manga_id} height={"400px"} />
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

export default Manga;