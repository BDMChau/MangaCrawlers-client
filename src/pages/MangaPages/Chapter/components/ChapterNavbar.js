import React, { useState, useEffect } from 'react'
import "../Chapter.css"
import { Button, Col, Dropdown, Menu, Tooltip, Typography } from 'antd';
import { LeftOutlined, RightOutlined, HomeOutlined, AppstoreAddOutlined, MinusSquareOutlined } from "@ant-design/icons";
import Cookies from 'universal-cookie';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import redirectURI from 'helpers/redirectURI';
import chapterApi from 'api/apis/MainServer/chapterApi';
import { format } from 'helpers/format';
import { message_error } from 'components/toast/message';
import mangaApi from 'api/apis/MainServer/mangaApi';



export default function ChapterNavbar({
    chapterName,

    mangaId,
    chapterId,

    isLoadingAddFollow,
    isFollowedProp,

    addReadingHistory,
    addToFollowingManga,
    removeFollowingManga,
}) {
    const userState = useSelector((state) => state.userState);
    const stuffsState = useSelector(state => state.stuffsState); // stuffsState[0] is status to sticky menu chapters

    const history = useHistory();

    const [chapters, setChapters] = useState([]);
    const [mangaInfo, setMangaInfo] = useState({});

    const [curChapter, setCurChapter] = useState(0);
    const [totalChapters, setTotalChapters] = useState(0);

    const [isFollowed, setIsFollowed] = useState(false);

    const cookies = new Cookies();
    const token = cookies.get("token");


    useEffect(() => {
        if (mangaId) getTotalChaptersOfManga(mangaId);
    }, [mangaId])


    useEffect(() => {
        setIsFollowed(isFollowedProp);
    }, [isFollowedProp])



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
        if (curChapter < 0 || curChapter > totalChapters) return;

        for (const [i, chapter] of chapters.entries()) {
            if (curChapter === i) {
                history.push(redirectURI.chapterPage_uri(mangaInfo.manga_id, mangaInfo.manga_name, chapter.chapter_id, chapter.chapter_name))
                break;
            }
        }
    }, [curChapter])


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


    // include mangaInfo, listChapter
    const getTotalChaptersOfManga = async (mangaId) => {
        const data = { manga_id: mangaId };

        try {
            const res = await chapterApi.getTotalChapters(data);
            if (res.content.err) return;

            const total = res.content.total;
            const manga = res.content.manga;
            const chapters = res.content.chapters;

            setTotalChapters(total);
            setChapters(chapters);
            setMangaInfo(manga);

            if (userState[0]) {
                const followingMangas = await getFollowingMangas();
                followingMangas.forEach(folllowingManga => {
                    if (folllowingManga.manga_id === manga.manga_id) {
                        setIsFollowed(true);
                    }
                })
            }
        } catch (err) {
            console.log(err)
        }
    }



    const getFollowingMangas = async () => {
        let followingMangas = [];

        try {
            const res = await mangaApi.getFollowingManga(token)

            if (res.content.msg) followingMangas = res.content.mangas;
        } catch (ex) {
            console.log(ex)
        }

        return followingMangas;
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
        <>
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
                    <NavLink to={redirectURI.mangaPage_uri(mangaInfo.manga_id, mangaInfo.manga_name)}>
                        <Button className="btn-home" icon={<HomeOutlined style={{ fontSize: stuffsState[0] === true ? "22px" : "22px", transition: "0.5s" }} />} />
                    </NavLink>
                </Tooltip>

                <Tooltip title="Previous Chap">
                    <Button
                        className="btn-prev"
                        onClick={() => handlePrevChapter()}
                        icon={<LeftOutlined style={{ fontSize: stuffsState[0] === true ? "22px" : "22px", transition: "0.5s" }} />}
                    />
                </Tooltip>

                <Tooltip title={chapterName ? chapterName : chapterName}>
                    <Dropdown className="dropdown-items" overlay={dropDownItems} trigger={['click']} >
                        <Typography.Text title="" onClick={e => e.preventDefault()} style={{ fontSize: stuffsState[0] === true ? "22px" : "22px", transition: "0.5s" }}>
                            {chapterName ? chapterName : chapterName}
                        </Typography.Text>
                    </Dropdown>
                </Tooltip>

                <Tooltip title="Next Chap">
                    <Button
                        className="btn-next"
                        onClick={() => handleNextChapter()}
                        icon={<RightOutlined style={{ fontSize: stuffsState[0] === true ? "22px" : "22px", transition: "0.5s" }} />}
                    />

                </Tooltip>

                <Tooltip title={isFollowed ? "Remove from Library" : "Add to Library"}>
                    <Button
                        loading={isLoadingAddFollow}
                        className="btn-add-favor"
                        onClick={() =>
                            userState[0]
                                ? isFollowed
                                    ? removeFollowingManga(mangaInfo.manga_id)
                                    : addToFollowingManga(mangaInfo.manga_id)
                                : message_error("You have to logged in to do this action")
                        }

                        icon={isFollowed
                            ? <MinusSquareOutlined style={{ fontSize: stuffsState[0] === true ? "20px" : "20px", transition: "0.5s", marginTop: "3px" }} />
                            : <AppstoreAddOutlined style={{ fontSize: stuffsState[0] === true ? "18px" : "18px", transition: "0.5s" }} />
                        }
                    />
                </Tooltip>

            </Col>
        </>
    )
}