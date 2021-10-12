import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Manga from './Manga'
import mangaApi from "../../../api/apis/MainServer/mangaApi"
import initial from 'lodash/initial';
import smoothscroll from 'smoothscroll-polyfill';
import Cookies from 'universal-cookie';

import { message_error, message_success } from '../../../components/alerts/message';
import { useSelector } from 'react-redux';
import { regex } from 'helpers/regex';
import adminApi from 'api/apis/MainServer/adminApi';
import { notification_success } from 'components/alerts/notification';
import { format } from 'helpers/format';

function MangaService() {
    const userState = useSelector((state) => state.userState);

    const [manga, setManga] = useState({});
    const [genres, setGenres] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [weeklyMangas, setWeeklyMangas] = useState([]);
    const [suggestionList, setSuggestionList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [isFollowed, setIsFollowed] = useState(false);
    const [isLoadingFollow, setIsLoadingFollow] = useState(false);
    const [mangaStars, setMangaStars] = useState(0);


    // edit data
    const [mangaId, setMangaId] = useState("");
    const [mangaName, setMangaName] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [authorName, setAuthorName] = useState("");

    // comments
    const [fromRow, setFromRow] = useState(0);
    const [isEndCmts, setIsEndCmts] = useState(false);
    const [comments, setComments] = useState([])

    const cookies = new Cookies();
    const token = cookies.get("token");

    const { name_id } = useParams()
    const [id, setId] = useState("ascac"); // mangaId when init
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
        // smoothscroll.polyfill();
        // window.scroll({
        //     top: 0,
        //     behavior: "smooth"
        // });

        getMangaData();
        getSuggestionList();
    }, [id])



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
            const mangaObj = response.content.manga;

            if (mangaObj.manga_name.replaceAll(regex.special_char, "") !== mangaNameParam) {
                return;
            }

            chapters.forEach(chapter => {
                chapter.created_at = format.formatDate01(chapter.created_at);
            });

            if (userState[0]) {
                const followingMangas = await getFollowingMangas();
                for (let i = 0; i < followingMangas.length; i++) {
                    if (followingMangas[i].manga_id === mangaObj.manga_id) {
                        setIsFollowed(true);
                        break;
                    }
                }
            }

            setManga(mangaObj)
            setTimeout(() => {
                setMangaStars(mangaObj.stars)
                setGenres(response.content.genres)
            }, 200)
            setTimeout(() => {
                setChapters(response.content.chapters)
            }, 400)

            return;
        } catch (error) {
            console.log(error);
        }
    }

    const getWeeklyTopMangas = async () => {
        setIsLoading(true);

        try {
            const response = await mangaApi.getWeekly();
            if (response.content.err) {
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
            const response = await mangaApi.getSuggestionList();
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

            if (JSON.parse(localStorage.getItem("code_400"))) {
                setIsLoading(false);
                localStorage.removeItem("code_400")
                return;
            } else if (response.content.err) {
                setIsLoading(false);
                localStorage.removeItem("code_400")
                return;
            }

            message_success("Added to your library", 4)
            setIsFollowed(true);
            setIsLoadingFollow(false);
            return;
        } catch (error) {
            console.log(error);
        }
    }

    const getFollowingMangas = async () => {
        let followingMangas = [];
        try {
            const responseFollowing = await mangaApi.getFollowingManga(token)

            if (responseFollowing) {
                console.log(responseFollowing)
                followingMangas = responseFollowing.content.mangas;
            }

        } catch (ex) {
            console.log(ex)
        }
        return followingMangas;
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
            message_error("You have to login first!")
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


    // get comments
    useEffect(() => {
        setIsEndCmts(false);
        setComments([]);
        setFromRow(0);

        // if fromRow is 0, run getCmts() below
        if (fromRow === 0) {
            getCmts();
        }
    }, [id])


    // useEffect(() => {
    //     // if fromRow is 0, this effect won't be invoked
    //     if (fromRow) getCmts()
    // }, [fromRow])


    const getCmts = async () => {
        if (id) {
            const data = {
                manga_id: id ? id : null,
                chapter_id: null,
                from: fromRow,
                amount: 100
            }

            try {
                const response = await mangaApi.getCommentsManga(data);

                if (JSON.parse(localStorage.getItem("code_400"))) {
                    // message_error("No manga to present!")
                    localStorage.removeItem("code_400")
                    return;
                }
                else if (response.content.msg === "No comments found!") {
                    setIsEndCmts(true);
                    return;
                }

                const comments = response.content.comments;

                setComments(comments)
                setFromRow(fromRow + 11)
                return;
            } catch (ex) {
                console.log(ex)
            }
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
                removeChapter={(chapterId) => removeChapter(chapterId)}

                commentsProp={comments}
                isEndCmts={isEndCmts}
            />
        </div>
    )
}

export default MangaService
