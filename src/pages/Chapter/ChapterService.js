import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Chapter from './Chapter'
import chapterApi from "../../api/apis/chapterApi"
import dayjs from 'dayjs';
import { SET_MANGA_ID } from "../../store/slices/MangaSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'universal-cookie';
import { message_error, message_success, message_warning } from '../../components/notifications/message';
import mangaApi from '../../api/apis/mangaApi';


export default function ChapterService() {
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.userState);
    const { mangaid, chapterid } = useParams();
    const [imgs, setImgs] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [chapterInfo, setChapterInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingAddFollow, setIsLoadingAddFollow] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);

    const cookies = new Cookies();
    const token = cookies.get("token")


    useEffect(() => {
        localStorage.setItem("mangaid", JSON.stringify(mangaid));
        dispatch(SET_MANGA_ID(mangaid))
    }, [])

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

        getDataChapter();
        addReadingHistory(mangaid, chapterid);
    }, [chapterid || mangaid])

    const getDataChapter = async () => {
        setIsLoading(true);
        const data = {
            manga_id: mangaid,
            chapter_id: chapterid,
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
            chapters.forEach(chapter => {
                chapter.createdAt = dayjs(chapter.createdAt).format("DD-MM-YYYY");
            })

            setChapters(chapters)
            setImgs(imgs)

            if (userState[0]) {
                const followingMangas = await getFollowingMangas();
                followingMangas.forEach(folllowingManga => {
                    if (folllowingManga.manga_id === chapterInfo.manga.manga_id) {
                        console.log('??')
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


    return (
        <div>
            <Chapter
                imgs={imgs}
                chapters={chapters}
                chapterInfo={chapterInfo}
                isLoading={isLoading}
                addToFollowingManga={(mangaId) => addToFollowingManga(mangaId)}
                removeFollowingManga={(mangaId) => removeFollowingManga(mangaId)}
                isLoadingAddFollow={isLoadingAddFollow}
                isFollowed={isFollowed}
                addReadingHistory={(mangaId, chapterId) => addReadingHistory(mangaId, chapterId)}
            />
        </div>
    )
}
