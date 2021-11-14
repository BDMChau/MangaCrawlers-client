import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import Chapter from './Chapter'
import initial from 'lodash/initial';

import { useDispatch, useSelector } from "react-redux";
import Cookies from 'universal-cookie';
import { message_error, message_success, message_warning } from '../../../components/toast/message';

import mangaApi from '../../../api/apis/MainServer/mangaApi';
import userApi from '../../../api/apis/MainServer/userApi';
import chapterApi from "../../../api/apis/MainServer/chapterApi"
import { regex } from 'helpers/regex';
import { format } from 'helpers/format';


export default function ChapterService() {
    const userState = useSelector((state) => state.userState);
    const history = useHistory();
    const [imgs, setImgs] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [chapterInfo, setChapterInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingAddFollow, setIsLoadingAddFollow] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);

    const [isAddedCmt, setIsAddedCmt] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [comments, setComments] = useState([]);
    const [fromRow, setFromRow] = useState(0);
    const [amountRows] = useState(10);
    const [isEndCmts, setIsEndCmts] = useState(false);
    const [isErrorCmt, setIsErrorCmt] = useState(false);
    const [timeWhenAddedCmt, setTimeWhenAddedCmt] = useState();
    const [curChapter, setCurChapter] = useState(0);

    const cookies = new Cookies();
    const token = cookies.get("token");

    const { manga_name_id_param, chapter_name_param } = useParams();
    const [mangaId, setMangaId] = useState("");
    const [mangaName, setMangaName] = useState("");
    const [chapterId, setChapterId] = useState("");
    const [chapterNumber, setChapterNumber] = useState("");


    useEffect(() => {
        setImgs([]);
        setChapters([]);
        setChapterInfo({
            chapter_id: "",
            chapter_number: "",
            chapter_name: "",
            views: "",
            createdAt: ""
        })

        let mangaId;
        let chapterId;
        const splittedManga = manga_name_id_param.split("-");
        const splittedChapter = chapter_name_param.split("_");

        mangaId = splittedManga[splittedManga.length - 1];
        chapterId = splittedChapter[1];

        setMangaId(mangaId);
        setMangaName(initial(splittedManga).toString().replaceAll(",", "-"));
        setChapterNumber(splittedChapter[0]);
        setChapterId(chapterId);

        getDataChapter(mangaId, chapterId);
        addReadingHistory(mangaId, chapterId);

        setFromRow(0);
        setComments([]);
        setIsEndCmts(false);

        updateView(mangaId, chapterId);
    }, [manga_name_id_param, chapter_name_param])


    const updateView = async (mangaId, chapterId) => {
        const data = {
            manga_id: mangaId,
            chapter_id: chapterId
        };

        try {
            const res = await mangaApi.updateViewManga(data);
        } catch (err) {
            console.log(err)
        }

    }



    const getDataChapter = async (mangaId, chapterId) => {
        setIsLoading(true);
        const data = {
            manga_id: mangaId,
            chapter_id: chapterId
        }

        try {
            const response = await chapterApi.getChapterImgs(data)

            if (!response.content.chapterInfo || response.content.err) {
                setImgs([]);
                setChapters([]);
                setChapterInfo({
                    chapter_id: "",
                    chapter_number: "",
                    chapter_name: "",
                    views: "",
                    createdAt: ""
                })

                message_warning("No chapter to present!", 5)
                setIsLoading(false)
                return;
            }

            if (response.content.err) {
                return;
            }
            const chapterInfo = response.content.chapterInfo;
            const imgs = response.content.listImg;

            const chapters = response.content.listChapter;
            chapters.forEach((chapter, i) => {
                console.log(chapter)
                chapter.created_at = format.relativeTime(chapter.created_at);

                if (chapter.chapter_id == chapterId) {
                    setCurChapter(i)
                }
            })

            setChapters(chapters)
            setImgs(imgs)

            if (userState[0]) {
                const followingMangas = await getFollowingMangas();
                followingMangas.forEach(folllowingManga => {
                    if (folllowingManga.manga_id === chapterInfo.manga.manga_id) {
                        setIsFollowed(true);
                    }
                })
            }

            setChapterInfo(chapterInfo)
            setIsLoading(false)
            return;
        } catch (err) {
            console.log(err)
        }
    }


    //////// next, prev chapter
    useEffect(() => {
        if(curChapter < 0) return;
        for (const [i, chapter] of chapters.entries()) {
            if (curChapter === i) {
                history.push(`/chapter/${mangaName}-${mangaId}/${chapterNumber.trim().replaceAll(regex.special_char, "-")}_${chapter.chapter_id}`)
                break;
            }
        }
    }, [curChapter])

    const handleNextChapter = () => {
        setCurChapter(curChapter + 1);
    }

    const handlePrevChapter = () => {
        setCurChapter(curChapter - 1);
    }



    const addToFollowingManga = async (mangaId) => {
        setIsLoadingAddFollow(true)
        const data = {
            manga_id: mangaId
        }
        try {
            const response = await mangaApi.addToFollowing(data, token);

            if (JSON.parse(localStorage.getItem("code_400"))) {
                setIsLoadingAddFollow(false);
                localStorage.removeItem("code_400")
                return;
            } else if (response.content.err) {
                setIsLoadingAddFollow(false);
                localStorage.removeItem("code_400")
                return;
            }

            message_success("Added to your library", 4)
            setIsFollowed(true);
            setIsLoadingAddFollow(false);
            return;
        } catch (error) {
            console.log(error);
        }
    }

    const removeFollowingManga = async (mangaId) => {
        setIsLoadingAddFollow(true)
        const data = {
            manga_id: mangaId,
        }
        try {
            const response = await mangaApi.removeFollowing(data, token)
            if (response.content.err) {
                setIsLoadingAddFollow(false);
                message_error("Something wrong, try again!")
                return
            }

            message_success("Removed from your library!", 3)
            setIsFollowed(false);
            setIsLoadingAddFollow(false);
            return;
        } catch (ex) {
            console.log(ex)
        }
    }

    const getFollowingMangas = async () => {
        let followingMangas = [];
        try {
            const responseFollowing = await mangaApi.getFollowingManga(token)

            if (responseFollowing) {
                followingMangas = responseFollowing.content.mangas;
            }

        } catch (ex) {
            console.log(ex)
        }
        return followingMangas;
    }

    const addReadingHistory = async (mangaId, chapterId) => {
        if (userState[0]) {
            const data = {
                manga_id: mangaId,
                chapter_id: chapterId
            }
            try {
                const response = await mangaApi.updateReadingHistory(data, token)

                console.log("History:", response)
            } catch (ex) {
                console.log(ex)
            }
        }
    }


    // Check error when add a cmt
    useEffect(() => {
        if (isErrorCmt === true) {
            for (const comment of comments) {
                if (comment.chaptercmt_time === timeWhenAddedCmt) {
                    comment.is_error = true;
                    break;
                }
            }

            setComments(comments);
        }
    }, [isErrorCmt])

 

    return (
        <div>
            <Chapter
                imgs={imgs}
                chapters={chapters}
                chapterInfo={chapterInfo}
                mangaName={mangaName}
                mangaId={mangaId}

                isLoading={isLoading}

                addToFollowingManga={(mangaId) => addToFollowingManga(mangaId)}
                removeFollowingManga={(mangaId) => removeFollowingManga(mangaId)}
                isLoadingAddFollow={isLoadingAddFollow}
                isFollowed={isFollowed}
                addReadingHistory={(mangaId, chapterId) => addReadingHistory(mangaId, chapterId)}

                handleNextChapter={() => handleNextChapter()}
                handlePrevChapter={() => handlePrevChapter()}
            />
        </div>
    )
}
