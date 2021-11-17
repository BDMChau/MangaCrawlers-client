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
import redirectURI from 'helpers/redirectURI';


export default function ChapterService() {
    const userState = useSelector((state) => state.userState);
    const history = useHistory();
    const [imgs, setImgs] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [chapterInfo, setChapterInfo] = useState({});
    const [mangaInfo, setMangaInfo] = useState({});

    const [totalChapters, setTotalChapters] = useState(0);

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingAddFollow, setIsLoadingAddFollow] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);
 
    const [curChapter, setCurChapter] = useState(0);

    const cookies = new Cookies();
    const token = cookies.get("token");

    const { manga_name_id_param, chapter_name_param } = useParams();
    const [mangaId, setMangaId] = useState("");
    const [mangaName, setMangaName] = useState("");

    const [chapterId, setChapterId] = useState("");
    const [chapterName, setChapterName] = useState("");
    const [chapterNumber, setChapterNumber] = useState("");


    // useEffect(() => {
    //     const splittedManga = manga_name_id_param.split("-");
    //     const mangaId = splittedManga[splittedManga.length - 1];

    //     getTotalChaptersOfManga(mangaId);
    // }, [manga_name_id_param])



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
        setChapterId(chapterId);
        setChapterName(initial(splittedChapter).toString().replaceAll(regex.special_char, " "));

        addReadingHistory(mangaId, chapterId);

        getTotalChaptersOfManga(mangaId);
        updateView(mangaId, chapterId);
    }, [manga_name_id_param, chapter_name_param])




    const updateView = async (mangaId, chapterId) => {
        const data = {
            manga_id: mangaId,
            chapter_id: chapterId
        };

        try {
            await mangaApi.updateViewManga(data);
        } catch (err) {
            console.log(err)
        }
    }

    // included mangaInfo, listChapter
    const getTotalChaptersOfManga = async (mangaId) => {
        const data = { manga_id: mangaId };

        try {
            const res = await chapterApi.getTotalChapters(data);
            if(res.content.err) return;

            const total = res.content.total;
            const manga = res.content.manga;
            const chapters = res.content.chapters;
    
            setTotalChapters(total);
            setChapters(chapters);
            setMangaInfo(manga);

            if (userState[0]) {
                const followingMangas = await getFollowingMangas();
                followingMangas.forEach(folllowingManga => {
                    if (folllowingManga.manga_id === res.content.manga.manga.manga_id) {
                        setIsFollowed(true);
                    }
                })
            }
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
            const response = await mangaApi.getFollowingManga(token)

            if (response.content.msg) followingMangas = responseFollowing.content.mangas;v
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

            } catch (ex) {
                console.log(ex)
            }
        }
    }



    return (
        <div>
            <Chapter
                imgs={imgs}
                chapters={chapters}

                chapterId={chapterId}
                chapterName={chapterName}
                
                mangaInfo={mangaInfo}
                mangaId={mangaInfo}

                isLoading={isLoading}

                addToFollowingManga={(mangaId) => addToFollowingManga(mangaId)}
                removeFollowingManga={(mangaId) => removeFollowingManga(mangaId)}
                isLoadingAddFollow={isLoadingAddFollow}
                isFollowed={isFollowed}
                addReadingHistory={(mangaId, chapterId) => addReadingHistory(mangaId, chapterId)}

                totalChapters={totalChapters}
            />
        </div>
    )
}
