import React, { useEffect, useState } from 'react'
import "./Manga.css"
import { NavLink, useHistory } from 'react-router-dom';
import { Col, Row, Button, Typography, Tag, Tooltip, Image } from 'antd';
import ListSide from '../../../components/List/ListSide/ListSide';
import ListChapters from '../../../components/List/ListChapters/ListChapters';
import Rating from '../../../components/Rating/Rating';
import FadingText from '../../../components/FadingText/FadingText';
import Spacing from '../../../components/Spacing/Spacing'
import { useSelector } from 'react-redux';
import { message_error } from '../../../components/notifications/message';
import CommentInput from 'components/Comment/CommentInput/CommentInput';
import { regex } from 'helpers/regex';
import uriRedirect from 'helpers/uriRedirect';


function Manga({
    weeklyMangas,
    manga,
    genres,
    chapters,
    suggestionList,

    addToFollowingManga,
    removeFollowingManga,
    isLoading,

    isFollowed,
    isLoadingFollow,

    mangaStars,
    handleRatingManga,

    addCmt,
    isAddedCmt,
    setIsAddedCmt,
    isAdding,
    comments,
    getCmtsChapter,
    isEndCmts
}) {
    const userState = useSelector((state) => state.userState);
    const history = useHistory();

    // state for Start Reading button
    const [chapterId01, setChapterId01] = useState("");
    const [chapterName01, setChapterName01] = useState("");


    const goToSearchMangeWithGenrePage = (id) => {
        history.push(`/manga/genre/tag?v=${id}`);
    }

    useEffect(() => {
        if (chapters[0]) {
            setChapterName01(chapters[0].chapter_name)
            setChapterId01(chapters[0].chapter_id)
        }
    }, [chapters])



    return (
        <div className="manga" key={manga.manga_id}>
            <Row justify={'center'}>
                <div className="manga-bg">
                    <div
                        className="manga-bg-img"
                        style={{ backgroundImage: `url(${manga.thumbnail})` }}>
                    </div>
                </div>
            </Row>

            <Row justify={"center"} className="manga-body-row">
                <Col span={24} sm={22} xxl={19} className="manga-body">
                    <Row justify={"center"} className="header">
                        <Col span={24} className="thumbnail">
                            <Image preview={false} className="thumbnail-img" src={manga.thumbnail} alt="" />
                        </Col>
                        <Col md={13} lg={12} sm={12} xs={20} xxl={15} className="title">
                            <div className="name">
                                <Typography.Title level={3}>{manga.manga_name}</Typography.Title>
                            </div>

                            <div className="author">
                                Author:
                                <NavLink to="#" className="link" key={manga.author_id}>
                                    {manga.author_name ? manga.author_name : " Unknown"}
                                </NavLink>
                            </div>
                            <div className="trans_group">
                                Translated by:
                                <NavLink to="#" className="link" key={manga.author_id}>
                                    {manga.transgroup_name ? manga.transgroup_name : " Unknown"}
                                </NavLink>
                            </div>

                            <div className="genre">
                                {genres
                                    ? genres.map((genre, i) => (
                                        <Tooltip title={genre.genre_description} className="item-tag">
                                            <Tag
                                                key={i}
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
                                <Rating stars={mangaStars} handleRatingManga={(value) => handleRatingManga(value)} />
                            </div>

                            <div className="manga-views">
                                <Typography.Text>{manga.views} views </Typography.Text>
                            </div>

                            <div className="interact">
                                <Button className="btn-read-now" title="Read Now">
                                    <NavLink to={
                                        Object.keys(manga).length !== 0
                                            ? uriRedirect.uriChapterPage(manga.manga_id, manga.manga_name, chapterId01, chapterName01)
                                            : ""
                                    }
                                        style={{ marginLeft: 0 }}
                                    >
                                        Start Reading
                                    </NavLink>
                                </Button>

                                <Button
                                    type="primary"
                                    className="btn-add-favorite"
                                    title="Add to Library"
                                    loading={isLoadingFollow}
                                    onClick={() =>
                                        userState[0]
                                            ? isFollowed
                                                ? removeFollowingManga(manga.manga_id)
                                                : addToFollowingManga(manga.manga_id)
                                            : message_error("You have to login first!")
                                    }

                                >
                                    {isFollowed ? "Remove from Library" : "Add to Library"}
                                </Button>
                            </div>
                        </Col>


                    </Row>

                    <Row justify={"center"} className="middle">
                        <Col span={24} md={22} lg={23} xxl={22} className="desc-wrapper">
                            <div className="desc">
                                <h2>Synopsis</h2>
                                <FadingText content={manga.description} />
                            </div>
                        </Col>
                        <Col span={24} md={22} lg={23} xxl={22} className="chapter-list">
                            <h3>Chapters</h3>
                            <div className="line"></div>

                            <ListChapters
                                chapters={chapters}
                                mangaId={manga.manga_id}
                                mangaName={manga.manga_name}
                                height={"400px"}
                            />
                        </Col>



                        <Col span={24} md={22} lg={23} xxl={16} className="manga-comments">
                            <Spacing />
                            <div className="comments">
                                <h2>MangaClawers Comments</h2>
                                <div className="comments-body">
                                    <CommentInput
                                        mangaId={manga.manga_id}

                                        setIsAddedCmt={setIsAddedCmt}
                                        isAddedCmt={isAddedCmt}
                                        addCmt={(cmtContent) => addCmt(cmtContent)}
                                        isAdding={isAdding}
                                        isEndCmts={isEndCmts}

                                        getCmtsChapter={getCmtsChapter}
                                        comments={comments}
                                    />
                                </div>

                            </div>
                        </Col>

                        <Col span={24} md={22} lg={23} xxl={6} className="rank-list">
                            <div className="top-week-rank">
                                <h3>Weekly Manga Ranking</h3>

                                <ListSide mangas={weeklyMangas} height={"415px"} isLoading={isLoading} />

                            </div>
                            <div className="favorite-suggest">
                                <h3>You may also like</h3>

                                <ListSide mangas={suggestionList} height={"415px"} isLoading={isLoading} />
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