import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Manga from './Manga'
import mangaApi from "../../../api/apis/MainServer/mangaApi"
import initial from 'lodash/initial';
import smoothscroll from 'smoothscroll-polyfill';
import Cookies from 'universal-cookie';

import { message_error, message_success } from '../../../components/notifications/message';
import { useSelector } from 'react-redux';
import { regex } from 'helpers/regex';
import adminApi from 'api/apis/MainServer/adminApi';
import { notification_success } from 'components/notifications/notification';
import { format } from 'helpers/format';
import userApi from 'api/apis/MainServer/userApi';

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

    const [isAddedCmt, setIsAddedCmt] = useState(false);
    const [comments, setComments] = useState([]);
    const [fromRow, setFromRow] = useState(0);
    const [amountRows] = useState(10);
    const [isEndCmts, setIsEndCmts] = useState(false);
    const [isErrorCmt, setIsErrorCmt] = useState(false);
    const [timeWhenAddedCmt, setTimeWhenAddedCmt] = useState();

    // edit data
    const [mangaId, setMangaId] = useState("");
    const [mangaName, setMangaName] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [authorName, setAuthorName] = useState("");

    const cookies = new Cookies();
    const token = cookies.get("token")

    const { name_id } = useParams()
    const [id, setId] = useState("");
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

    // get comments
    useEffect(() => {
        setIsEndCmts(false);
        setComments([]);
        setFromRow(0);

        // if fromRow is 0, run getCmtsManga() below
        if (fromRow === 0) {
            getCmtsManga();
        }
    }, [id])

    useEffect(() => {
        // if fromRow is 0, this effect won't be invoked
        if (fromRow) getCmtsManga()
    }, [fromRow])



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
                chapter.createdAt = format.formatDate01(chapter.createdAt);
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


    // check error when add cmt
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


    const addCmt = async (cmtContent) => {
        console.log(cmtContent)
        if (userState[0]) {
            const newObjComment = {
                // "chapter_id": chapterid,
                // "chaptercmt_content": cmtContent,
                // "chaptercmt_time": format.formatDate02(Date.now()),
                // "chapter_name": chapterInfo.chapter_name,
                "manga_id": mangaId,
                "chapter_id": null,
                "manga_comment_content": cmtContent ? cmtContent.trim() : "",
                "image_url": null,
                "level": 0,
                "parent_id": null,
                "user_avatar": userState[0].user_avatar,
                "user_email": userState[0].user_email,
                "user_id": userState[0].user_id,
                "user_name": userState[0].user_name,
                "is_error": false
            }

            setTimeWhenAddedCmt(format.formatDate02(Date.now()));
            setComments(prevCmts => [newObjComment, ...prevCmts])
            setIsAddedCmt(true)


            const data = {
                manga_id: mangaId.toString(),
                chapter_id: "",
                manga_comment_content: cmtContent ? cmtContent.trim() : "",
                image: img ? img : "",
                level: 0,
                parent_id: ""
            }

            try {
                const response = await userApi.addCmt(token, data);
                if (response.content.comment_info) {
                    // added
                } else {
                    setIsErrorCmt(true);
                }
            } catch (ex) {
                console.log(ex);
            }
            return;

        } else {
            message_error("You have to login first!");
            return;
        }
    }


    const getCmtsManga = async () => {
        const data = {
            manga_id: id,
            from: fromRow,
            amount: amountRows
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


            if (response.content.comments.length) {
                const comments = response.content.comments;
               
                setComments(comments)
                setFromRow(fromRow + 11)
            }

            return;
        } catch (ex) {
            console.log(ex)
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

                addCmt={(cmtContent) => addCmt(cmtContent)}
                isAddedCmt={isAddedCmt}
                setIsAddedCmt={setIsAddedCmt}
                comments={comments}
                getCmtsManga={() => getCmtsManga()}
                isEndCmts={isEndCmts}

                setMangaId={setMangaId}
                setMangaName={setMangaName}
                setAuthorId={setAuthorId}
                setAuthorName={setAuthorName}

                editChapter={(chapterId, chapterName) => editChapter(chapterId, chapterName)}
                editManga={() => editManga()}
                removeChapter={(chapterId) => removeChapter(chapterId)}
            />
        </div>
    )
}

export default MangaService
