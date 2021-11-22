import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Manga from './Manga'
import mangaApi from "../../../api/apis/MainServer/mangaApi"
import initial from 'lodash/initial';
import smoothscroll from 'smoothscroll-polyfill';
import Cookies from 'universal-cookie';

import { message_error, message_success } from '../../../components/toast/message';
import { useSelector } from 'react-redux';
import { regex } from 'helpers/regex';
import adminApi from 'api/apis/MainServer/adminApi';
import { notification_success } from 'components/toast/notification';
import { format } from 'helpers/format';
import userApi from 'api/apis/MainServer/userApi';

function MangaService() {
    const userState = useSelector((state) => state.userState);

    const [manga, setManga] = useState({});
    const [genres, setGenres] = useState([]);
    const [weeklyMangas, setWeeklyMangas] = useState([]);
    const [suggestionList, setSuggestionList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [chapters, setChapters] = useState([]);

    const [isFollowed, setIsFollowed] = useState(false);
    const [isLoadingFollow, setIsLoadingFollow] = useState(false);
    const [mangaStars, setMangaStars] = useState(0);


    // edit data
    const [mangaId, setMangaId] = useState("");
    const [mangaName, setMangaName] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [isLoadingEditting, setIsLoadingEditting] = useState(false);

    // comments
    // const [fromRow, setFromRow] = useState(0);
    // const [isEndCmts, setIsEndCmts] = useState(false);
    // const [comments, setComments] = useState([])

    const cookies = new Cookies();
    const token = cookies.get("token");

    const { name_id } = useParams()
    const [id, setId] = useState(""); // mangaId when init
    const [mangaNameParam, setMangaNameParam] = useState("");



    useEffect(() => {
        getWeeklyTopMangas();
    }, [])


    useEffect(() => {
        const splittedParams = name_id.split("-");
        setId(splittedParams[splittedParams.length - 1]);
        setMangaNameParam(initial(splittedParams).toString().replaceAll(",", ""));
    }, [name_id])


    useEffect(() => {
        smoothscroll.polyfill();
        window.scroll({
            top: 0,
            behavior: "smooth"
        });

        if (id) {
            getMangaData();
            getSuggestionList();
        }
    }, [id])

    useEffect(() => {
        if (id && userState[0]) checkIsFollowing();
    }, [id, userState])



    const getMangaData = async () => {
        try {
            const params = {
                manga_id: id,
            }

            const response = await mangaApi.getManga(params);
            if (response.content.err) {
                return;
            }
            const chapters = response.content.chapters;
            const genres = response.content.genres;
            const mangaObj = response.content.manga;

            if (mangaObj.manga_name.replaceAll(regex.special_char, "") !== mangaNameParam) return;

            setManga(mangaObj)
            setTimeout(() => {
                setMangaStars(mangaObj.stars)
                setGenres(genres)
            }, 100)
            setTimeout(() => {
                setChapters(chapters)
            }, 300)

        } catch (error) {
            console.log(error);
        }
    }

    const getWeeklyTopMangas = async () => {
        setIsLoading(true);

        try {
            let response = await mangaApi.getWeekly();
            if (response.content.err) {
                response = await mangaApi.getSuggestionList(5)
                setWeeklyMangas(response.content.suggestion_list)
                setIsLoading(false);
                return;
            }

            setWeeklyMangas(response.content.list_weekly)
            setIsLoading(false);
            return;
        } catch (error) {
            console.log(error);
        }
    }

    const getSuggestionList = async () => {
        setIsLoading(true);

        try {
            const response = await mangaApi.getSuggestionList(5);
            if (response.content.err) {
                return;
            }

            setSuggestionList(response.content.suggestion_list)
            setIsLoading(false);
            return;
        } catch (error) {
            console.log(error);
        }
    }

    const addToFollowingManga = async (mangaId) => {
        setIsLoadingFollow(true)
        const data = {
            manga_id: mangaId
        }
        try {
            const response = await mangaApi.addToFollowing(data, token);

            if (response.content.err) {
                message_error("Failed!", 4);
                setIsLoadingFollow(false);
                return;
            }

            message_success("Added to your library", 4)
            setIsFollowed(true);
            setIsLoadingFollow(false);
            return;
        } catch (error) {
            setIsLoadingFollow(false);
            console.log(error);
        }
    }

    const removeFollowingManga = async (mangaId) => {
        setIsLoadingFollow(true)
        const data = {
            manga_id: mangaId,
        }
        try {
            const response = await mangaApi.removeFollowing(data, token)
            if (response.content.err) {
                setIsLoading(false);
                message_error("Something wrong, try again!")
                return
            }

            message_success("Removed from your library!", 3)
            setIsFollowed(false);
            setIsLoadingFollow(false);
            return;
        } catch (ex) {
            console.log(ex)
        }
    }

    const handleRatingManga = async (value) => {
        if (userState[0]) {
            message_success("Thank you for rating ^^", 3);
            const data = {
                manga_id: id,
                value: value
            }
            try {
                const response = await mangaApi.ratingManga(data, token);

                const newRating = response.content.manga.stars
                setMangaStars(newRating)

            } catch (ex) {
                console.log(ex)
            }
        } else {
            message_error("You have to logged in to do this action")
        }

    }

    const checkIsFollowing = async () => {
        const data = { manga_id: id.toString() };

        try {
            const res = await userApi.checkIsFollowingManga(token, data);

            if (res.content.is_following === true) setIsFollowed(true);
            else setIsFollowed(false);

        } catch (err) {
            console.log(err);
        }
    }


    /////////// admin actions ///////////
    const editChapter = async (chapterId, chapterName) => {
        const data = {
            chapter_id: chapterId ? chapterId : 0,
            chapter_name: chapterName,
        };

        try {
            const response = await adminApi.editChapter(token, data);
            if (response) {
                const chapterModified = response.content.chapter;
                const chaptersCopied = [...chapters];

                for (let i = 0; i < chaptersCopied.length; i++) {
                    if (chaptersCopied[i].chapter_id === chapterModified.chapter_id) {
                        chaptersCopied[i].chapter_name = chapterModified.chapter_name;
                        break;
                    }
                }

                setChapters(chaptersCopied);
                notification_success("Updated!");
            }
        } catch (err) {
            console.log(err)
        }
    }



    const editManga = async () => {
        setIsLoadingEditting(true);

        const data = {
            manga_id: mangaId ? mangaId : 0,
            manga_name: mangaName,
            author_id: authorId,
            author_name: authorName,
        };

        try {
            const response = await adminApi.editManga(token, data);
            if (response) {
                setManga(response.content.manga);
                notification_success("Updated!");
            }

            setIsLoadingEditting(false);
        } catch (err) {
            console.log(err)
        }
    }


    const removeChapter = async (chapterId) => {
        const data = {
            chapter_id: chapterId
        };

        try {
            const response = await adminApi.removeChapter(token, data);
            if (response) {
                const chapterIdRemoved = response.content.chapter.chapter_id;
                const chaptersAfterRemoved = chapters.filter(chapter => chapter.chapter_id !== chapterIdRemoved)

                setChapters(chaptersAfterRemoved);
                notification_success("Removed!");
            }

            setChapterId({});
        } catch (err) {
            console.log(err)
        }
    }





    return (
        <div>
            <Manga
                weeklyMangas={weeklyMangas}
                manga={manga}
                genres={genres}
                chapters={chapters}
                suggestionList={suggestionList}

                addToFollowingManga={(mangaId) => addToFollowingManga(mangaId)}
                removeFollowingManga={(managId) => removeFollowingManga(managId)}
                isLoading={isLoading}

                isFollowed={isFollowed}
                isLoadingFollow={isLoadingFollow}

                handleRatingManga={(value) => handleRatingManga(value)}
                mangaStars={mangaStars}

                setMangaId={setMangaId}
                setMangaName={setMangaName}
                setAuthorId={setAuthorId}
                setAuthorName={setAuthorName}

                editChapter={(chapterId, chapterName) => editChapter(chapterId, chapterName)}
                editManga={() => editManga()}
                isLoadingEditting={isLoadingEditting}
                removeChapter={(chapterId) => removeChapter(chapterId)}

            // commentsProp={comments}
            // isEndCmts={isEndCmts}
            />
        </div>
    )
}

export default MangaService
