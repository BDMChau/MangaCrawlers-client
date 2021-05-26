import { Button, Col, Dropdown, Image, Input, Menu, Row, Tooltip, Typography } from 'antd'
import React, { useState, useEffect } from 'react'
import "./Chapter.css"
import CommentForm from '../../components/CommentForm/CommentForm';
import { LeftOutlined, RightOutlined, HomeOutlined, AppstoreAddOutlined, MinusSquareOutlined } from "@ant-design/icons";
import { useSelector } from 'react-redux';
import smoothscroll from 'smoothscroll-polyfill';
import { NavLink } from 'react-router-dom';
import ImgsChapter from './ImgsChapter';


export default function Chapter({
    imgs,
    chapters,
    chapterInfo,
    isLoading,
    addToFollowingManga,
    isLoadingAddFollow,
    isFollowed
}) {
    const mangaState = useSelector(state => state.mangaState);
    const stuffsState = useSelector(state => state.stuffsState);
    const mangaId = mangaState[0];
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
                    ? chapters.map((chapter, id) => (
                        <Menu.Item key={id} className="dropdown-item-chapter-page">
                            <NavLink title={chapter.chapter_name} className="dropdown-item-title" to={`/chapter/${mangaId}/${chapter.chapter_id}`} onChange={() => setChapterName(chapter.chapter_name)}>
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
            <Typography.Title level={2} className="title">{chapterInfo.manga ? chapterInfo.manga.manga_name : ""}</Typography.Title>
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
                    <Button className="btn-next">
                        <LeftOutlined style={{ fontSize: stuffsState[0] === "true" ? "22px" : "22px", transition: "0.5s" }} />
                    </Button>
                </Tooltip>

                <Tooltip title={chapterName ? chapterName : chapterInfo.chapter_name}>
                    <Dropdown className="dropdown-items" overlay={dropDownItems} trigger={['click']} >
                        <a title="" onClick={e => e.preventDefault()} style={{ fontSize: stuffsState[0] === "true" ? "22px" : "22px", transition: "0.5s" }}>
                            {chapterName ? chapterName : chapterInfo.chapter_name}
                        </a>
                    </Dropdown>
                </Tooltip>

                <Tooltip title="Next Chap">
                    <Button className="btn-prev">
                        <RightOutlined style={{ fontSize: stuffsState[0] === "true" ? "18px" : "18px", transition: "0.5s" }} />
                    </Button>
                </Tooltip>

                <Tooltip title={isFollowed ? "Remove from Library" : "Add to Library"}>
                    <Button
                        loading={isLoadingAddFollow}
                        className="btn-add-favor"
                        onClick={() => addToFollowingManga()}>
                        {isFollowed
                            ? <MinusSquareOutlined style={{ fontSize: stuffsState[0] === "true" ? "20px" : "20px", transition: "0.5s", marginTop: "3px" }} />
                            : <AppstoreAddOutlined style={{ fontSize: stuffsState[0] === "true" ? "18px" : "18px", transition: "0.5s" }} />}
                    </Button>
                </Tooltip>

            </Col>

            <ImgsChapter imgs={imgs} isFixedMenu={stuffsState[0]} isLoading={isLoading} />


            <Col span={23} xxl={14} className="chapter-comment">
                <CommentForm />
            </Col>
            {/* <Col span={23} xxl={14} className="chapter-footer">
                <FooterContainter/>
            </Col> */}
        </Row >
    )
}
