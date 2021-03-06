import React, { useState, useEffect } from 'react'
import "./Chapter.css"
import CommentItems from '../../components/CommentItems/CommentItems';
import { LeftOutlined, RightOutlined, HomeOutlined, AppstoreAddOutlined, MinusSquareOutlined } from "@ant-design/icons";
import { useSelector } from 'react-redux';
import smoothscroll from 'smoothscroll-polyfill';
import { NavLink } from 'react-router-dom';
import ImgsChapter from './ImgsChapter';
import { message_error } from '../../components/notifications/message';
import { Button, Col, Dropdown, Input, Menu, Row, Tooltip, Typography, Form } from 'antd'

const { TextArea } = Input;


function Chapter({
    imgs,
    chapters,
    chapterInfo,
    isLoading,
    addToFollowingManga,
    removeFollowingManga,
    isLoadingAddFollow,
    isFollowed,
    addReadingHistory,

    handleNextChapter,
    handlePrevChapter,

    addCmtChapter,
    isAddedCmt,
    setIsAddedCmt,
    isAdding,
    comments,
    getCmtsChapter,
    isEndCmts

}) {
    const userState = useSelector((state) => state.userState);
    const mangaState = useSelector(state => state.mangaState);
    const stuffsState = useSelector(state => state.stuffsState);
    const mangaId = mangaState[0];
    const [chapterName, setChapterName] = useState("");
    const [cmtContent, setCmtContent] = useState("");
   


    useEffect(() => {
        smoothscroll.polyfill();
        window.scroll({
            top: 0,
            behavior: "smooth"
        });

    }, [imgs])



    useEffect(() => {
        if (isAddedCmt === true) {
            setCmtContent("");
            setIsAddedCmt(false)
        }
    }, [isAddedCmt])

    const dropDownItems = (
        <Menu>
            {
                chapters
                    ? chapters.map((chapter, i) => (
                        <Menu.Item key={i} className="dropdown-item-chapter-page">
                            <NavLink
                                title={chapter.chapter_name}
                                className="dropdown-item-title" to={`/chapter/${mangaId}/${chapter.chapter_id}`}
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
                        <NavLink to={`/manga/${mangaId}`}>
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

            {/* css in  <CommentForm/> */}
            <Col span={22} xxl={14} className="comments-form">
                <Form className="form-input">
                    <Form.Item>
                        <TextArea
                            className="input"
                            type="text"
                            placeholder="Write a comment..."
                            value={cmtContent}
                            onChange={(e) => setCmtContent(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button className="btn-submit" type="primary" loading={isAdding} onClick={() => addCmtChapter(cmtContent)}>
                            Add Comment
                    </Button>
                    </Form.Item>
                </Form>

                <CommentItems
                    comments={comments}
                    getCmtsChapter={() => getCmtsChapter()}
                    isEndCmts={isEndCmts}
                />
            </Col>

        </Row >
    )
}

export default Chapter;