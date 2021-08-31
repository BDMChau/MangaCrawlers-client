import React, { useState, useEffect } from 'react'
import "./Chapter.css"
import { LeftOutlined, RightOutlined, HomeOutlined, AppstoreAddOutlined, MinusSquareOutlined } from "@ant-design/icons";
import { useSelector } from 'react-redux';
import smoothscroll from 'smoothscroll-polyfill';
import { NavLink } from 'react-router-dom';
import ImgsChapter from './ImgsChapter';
import { message_error } from '../../../components/notifications/message';
import { Button, Col, Dropdown, Menu, Row, Tooltip, Typography } from 'antd'
import CommentInput from 'components/Comment/CommentInput/CommentInput';
import { regex } from 'helpers/regex';
import uriRedirect from 'helpers/uriRedirect';



function Chapter({
    imgs,
    chapters,
    chapterInfo,
    mangaName,
    mangaId,

    isLoading,

    addToFollowingManga,
    removeFollowingManga,
    isLoadingAddFollow,
    isFollowed,
    addReadingHistory,

    handleNextChapter,
    handlePrevChapter,

    addCmt,
    isAddedCmt,
    setIsAddedCmt,
    isAdding,
    comments,
    getCmtsChapter,
    isEndCmts
}) {
    const userState = useSelector((state) => state.userState);
    const stuffsState = useSelector(state => state.stuffsState);
    const [chapterName, setChapterName] = useState("");




    useEffect(() => {
        smoothscroll.polyfill();
        window.scroll({
            top: 0,
            behavior: "smooth"
        });

    }, [imgs])





    const dropDownItems = (
        <Menu>
            {
                chapters
                    ? chapters.map((chapter, i) => (
                        <Menu.Item key={i} className="dropdown-item-chapter-page">
                            <NavLink
                                title={chapter.chapter_name}
                                className="dropdown-item-title"
                                to={uriRedirect.uriChapterPage(mangaId, mangaName, chapter.chapter_id, chapter.chapter_name)}
                                onChange={() => setChapterName(chapter.chapter_name)}
                                onClick={() => addReadingHistory(chapterInfo.manga.manga_id, chapter.chapter_id)}
                            >
                                <Typography.Text className="title-name">{chapter.chapter_name}</Typography.Text>
                                <Typography.Text className="title-time">{chapter.createdAt}</Typography.Text>
                            </NavLink>
                        </Menu.Item>
                    ))
                    : ""
            }
        </Menu>
    );


    return (
        <Row justify={"center"} className="chapter">
            {chapterInfo.manga
                ? <Typography.Title level={2} className="title">{chapterInfo.manga ? chapterInfo.manga.manga_name : ""}</Typography.Title>
                : <Typography.Title level={2} className="title" style={{ color: "transparent" }}>.</Typography.Title>

            }
            {stuffsState[0] === "true"
                ? <Col span={23} sm={13} md={20} xxl={10} style={{ height: "44px", marginTop: "10px" }}></Col>
                : ""
            }
            <Col span={23} sm={18} md={17} xl={14} xxl={12} className={stuffsState[0] === "true" ? "dropdown-chapter sticky" : "dropdown-chapter"}>
                <Tooltip title="Go back to manga page">
                    <Button className="btn-home">
                        <NavLink to={chapterInfo.manga ? uriRedirect.uriMangaPage(chapterInfo.manga) : "#"}>
                            <HomeOutlined style={{ fontSize: stuffsState[0] === "true" ? "22px" : "22px", transition: "0.5s" }} />
                        </NavLink>
                    </Button>
                </Tooltip>

                <Tooltip title="Previous Chap">
                    <Button className="btn-prev" onClick={() => handlePrevChapter()}>
                        <LeftOutlined style={{ fontSize: stuffsState[0] === "true" ? "22px" : "22px", transition: "0.5s" }} />
                    </Button>
                </Tooltip>

                <Tooltip title={chapterName ? chapterName : chapterInfo.chapter_name}>
                    <Dropdown className="dropdown-items" overlay={dropDownItems} trigger={['click']} >
                        <Typography.Text title="" onClick={e => e.preventDefault()} style={{ fontSize: stuffsState[0] === "true" ? "22px" : "22px", transition: "0.5s" }}>
                            {chapterName ? chapterName : chapterInfo.chapter_name}
                        </Typography.Text>
                    </Dropdown>
                </Tooltip>

                <Tooltip title="Next Chap">
                    <Button className="btn-next" onClick={() => handleNextChapter()}>
                        <RightOutlined style={{ fontSize: stuffsState[0] === "true" ? "22px" : "22px", transition: "0.5s" }} />
                    </Button>
                </Tooltip>

                <Tooltip title={isFollowed ? "Remove from Library" : "Add to Library"}>
                    <Button
                        loading={isLoadingAddFollow}
                        className="btn-add-favor"
                        onClick={() =>
                            userState[0]
                                ? isFollowed
                                    ? removeFollowingManga(chapterInfo.manga.manga_id)
                                    : addToFollowingManga(chapterInfo.manga.manga_id)
                                : message_error("You have to login first!")
                        }
                    >
                        {isFollowed
                            ? <MinusSquareOutlined style={{ fontSize: stuffsState[0] === "true" ? "20px" : "20px", transition: "0.5s", marginTop: "3px" }} />
                            : <AppstoreAddOutlined style={{ fontSize: stuffsState[0] === "true" ? "18px" : "18px", transition: "0.5s" }} />}
                    </Button>
                </Tooltip>

            </Col>

            <ImgsChapter imgs={imgs} isFixedMenu={stuffsState[0]} isLoading={isLoading} />


            <Col span={22} xxl={16}>
                <CommentInput
                    setIsAddedCmt={setIsAddedCmt}
                    isAddedCmt={isAddedCmt}
                    addCmt={(cmtContent) => addCmt(cmtContent)}
                    isAdding={isAdding}
                    isEndCmts={isEndCmts}

                    getCmtsChapter={getCmtsChapter}
                    comments={comments}
                />
            </Col>
        </Row >
    )
}

export default Chapter;