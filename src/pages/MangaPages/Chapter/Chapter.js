import React, { useState, useEffect } from 'react'
import "./Chapter.css"
import { LeftOutlined, RightOutlined, HomeOutlined, AppstoreAddOutlined, MinusSquareOutlined } from "@ant-design/icons";
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import ImgsChapter from './components/ImgsChapter';
import { message_error } from '../../../components/toast/message';
import { Button, Col, Dropdown, Empty, Menu, Row, Tooltip, Typography } from 'antd'
import redirectURI from 'helpers/redirectURI';
import { format } from 'helpers/format';



function Chapter({
    chapters,
    chapterId,
    chapterNameProp,

    mangaInfo,

    isLoading,

    addToFollowingManga,
    removeFollowingManga,
    isLoadingAddFollow,
    isFollowed,
    addReadingHistory,

    totalChapters

}) {
    const history = useHistory();

    const userState = useSelector((state) => state.userState);
    const stuffsState = useSelector(state => state.stuffsState); // stuffsState[0] is status to sticky menu chapters
    const [chapterName, setChapterName] = useState("");
    const [curChapter, setCurChapter] = useState(0);


    useEffect(() => {
        setChapterName(chapterNameProp);
    }, [chapterNameProp])



    //////// next, prev chapter
    useEffect(() => {
        if (chapters.length && chapterId) {
            for (let i = 0; i < chapters.length; i++) {
                if (chapters[i].chapter_id == chapterId) { // use == not  ===
                    setCurChapter(i);
                    break;
                }
            }
        }
    }, [chapters, chapterId])


    useEffect(() => {
        console.log(curChapter)
        if (curChapter < 0 || curChapter > totalChapters) return;

        for (const [i, chapter] of chapters.entries()) {
            if (curChapter === i) {
                history.push(redirectURI.chapterPage_uri(mangaInfo.manga_id, mangaInfo.manga_name, chapter.chapter_id, chapter.chapter_name))
                break;
            }
        }
    }, [curChapter, chapters, totalChapters])

    const handleNextChapter = () => {
        if (curChapter >= totalChapters - 1) {
            setCurChapter(totalChapters - 1);
            return;
        }

        setCurChapter(curChapter + 1);
    }

    const handlePrevChapter = () => {
        if (curChapter <= 0) {
            setCurChapter(0);
            return;
        }

        setCurChapter(curChapter - 1);
    }


    const dropDownItems = (
        <Menu>
            {
                chapters
                    ? chapters.map((chapter, i) => (
                        <Menu.Item key={i} className="dropdown-item-chapter-page">
                            <NavLink
                                title={chapter.chapter_name}
                                className="dropdown-item-title"
                                to={redirectURI.chapterPage_uri(mangaInfo.manga_id, mangaInfo.manga_name, chapter.chapter_id, chapter.chapter_name)}
                                onClick={() => addReadingHistory(mangaInfo.manga_id, chapter.chapter_id)}
                            >
                                <Typography.Text className="title-name">{chapter.chapter_name}</Typography.Text>

                                <Typography.Text className="title-time" title={format.formatDate02(chapter.created_at)} >
                                    {format.relativeTime(chapter.created_at)}
                                </Typography.Text>
                            </NavLink>
                        </Menu.Item>
                    ))
                    : ""
            }
        </Menu>
    );


    return (
        <Row justify={"center"} className="chapter">
            {Object.keys(mangaInfo).length
                ? <Typography.Title level={2} className="title">{mangaInfo.manga_name}</Typography.Title>
                : <Typography.Title level={2} className="title" style={{ color: "transparent" }}>.</Typography.Title>

            }

            {stuffsState[0] === true
                ? <Col span={23} sm={13} md={20} xxl={10} style={{ height: "44px", marginTop: "10px" }}></Col>
                : ""
            }

            <Col span={23} sm={18} md={17} xl={14} xxl={12} className={stuffsState[0] === true ? "dropdown-chapter sticky" : "dropdown-chapter"}>
                <Tooltip title="Go back to manga page">
                    <Button className="btn-home">
                        <NavLink to={redirectURI.mangaPage_uri(mangaInfo.manga_id, mangaInfo.manga_name)}>
                            <HomeOutlined style={{ fontSize: stuffsState[0] === true ? "22px" : "22px", transition: "0.5s" }} />
                        </NavLink>
                    </Button>
                </Tooltip>

                <Tooltip title="Previous Chap">
                    <Button className="btn-prev" onClick={() => handlePrevChapter()}>
                        <LeftOutlined style={{ fontSize: stuffsState[0] === true ? "22px" : "22px", transition: "0.5s" }} />
                    </Button>
                </Tooltip>

                <Tooltip title={chapterName ? chapterName : chapterName}>
                    <Dropdown className="dropdown-items" overlay={dropDownItems} trigger={['click']} >
                        <Typography.Text title="" onClick={e => e.preventDefault()} style={{ fontSize: stuffsState[0] === true ? "22px" : "22px", transition: "0.5s" }}>
                            {chapterName ? chapterName : chapterName}
                        </Typography.Text>
                    </Dropdown>
                </Tooltip>

                <Tooltip title="Next Chap">
                    <Button className="btn-next" onClick={() => handleNextChapter()}>
                        <RightOutlined style={{ fontSize: stuffsState[0] === true ? "22px" : "22px", transition: "0.5s" }} />
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
                                : message_error("You have to logged in to do this action")
                        }
                    >
                        {isFollowed
                            ? <MinusSquareOutlined style={{ fontSize: stuffsState[0] === true ? "20px" : "20px", transition: "0.5s", marginTop: "3px" }} />
                            : <AppstoreAddOutlined style={{ fontSize: stuffsState[0] === true ? "18px" : "18px", transition: "0.5s" }} />}
                    </Button>
                </Tooltip>

            </Col>

            <Col span={23} xxl={15} className="chapter-pages" style={{ margin: "20px" }}>
                <ImgsChapter
                    mangaId={mangaInfo.manga_id}
                    chapterId={chapterId}
                    chapterName={chapterName}

                    isFixedMenu={stuffsState[0]}
                />
            </Col >

        </Row >
    )
}

export default Chapter;