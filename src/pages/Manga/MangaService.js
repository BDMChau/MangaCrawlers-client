import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Manga from './Manga'
import mangaApi from "../../api/apis/mangaApi"
import dayjs from 'dayjs';
import smoothscroll from 'smoothscroll-polyfill';
import Cookies from 'universal-cookie';
import { message_error, message_success } from '../../components/notifications/message';
import { useSelector } from 'react-redux';

function MangaService() {
    const userState = useSelector((state) => state.userState);
    const [manga, setManga] = useState({});
    const [genres, setGenres] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [weeklyMangas, setWeeklyMangas] = useState([]);
    const [suggestionList, setSuggestionList] = useState([]);
    
    const [isFollowed, setIsFollowed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [mangaStars, setMangaStars] = useState(0);

    const [comments, setComments] = useState([]);
    const [fromRow, setFromRow] = useState(null);
    const [amountRows] = useState(10);
    const [isEndCmts, setIsEndCmts] = useState(false);

    const { id } = useParams()
    const cookies = new Cookies();
    const token = cookies.get("token")


    useEffect(() => {
        getWeeklyTopMangas();
    }, [])


    useEffect(() => {
        getMangaData();
        getSuggestionList();

        smoothscroll.polyfill();
        window.scroll({
            top: 0,
            behavior: "smooth"
        });
    }, [id])

    // get comments
    useEffect(() => {
        setIsEndCmts(false);
        setComments([]);
        setFromRow(0);
        
        // if fromRow is 0, run getCmtsManga() below
        if(fromRow === 0){
            getCmtsManga();
        }
    }, [id])

    useEffect(() => {
        // if fromRow is 0, this effect won't be invoked
        getCmtsManga()
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
            chapters.forEach(chapter => {
                chapter.createdAt = dayjs(chapter.createdAt).format("DD-MM-YYYY");
            });

            const mangaObj = response.content.manga;

            if (userState[0]) {
                const followingMangas = await getFollowingMangas();
                followingMangas.forEach(folllowingManga => {
                    if (folllowingManga.manga_id === mangaObj.manga_id) {
                        setIsFollowed(true);
                    }
                })

            }

            setMangaStars(mangaObj.stars)
            setManga(mangaObj)
            setGenres(response.content.genres)
            setChapters(response.content.chapters)
            return;
        } catch (error) {
            console.log(error);
        }
    }

    const getWeeklyTopMangas = async () => {
        try {
            const response = await mangaApi.getWeekly();
            if (response.content.err) {
                return;
            }

            setWeeklyMangas(response.content.list_weekly)
            return;
        } catch (error) {
            console.log(error);
        }
    }

    const getSuggestionList = async () => {
        try {
            const response = await mangaApi.getSuggestionList();
            if (response.content.err) {
                return;
            }

            setSuggestionList(response.content.suggestion_list)
            console.log(response.content.suggestion_list)
            return;
        } catch (error) {
            console.log(error);
        }
    }

    const addToFollowingManga = async (mangaId) => {
        setIsLoading(true)
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
            setIsLoading(false);
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

    // const addReadingHistory = async (mangaId, chapterId) => {
    //     const data = {
    //         manga_id: mangaId,
    //         chapter_id: chapterId
    //     }
    //     try {
    //         console.log("update history")
    //         const response = await mangaApi.updateReadingHistory(data, token)

    //         console.log("History:", response)
    //     } catch (ex) {
    //         console.log(ex)
    //     }
    // }

    const removeFollowingManga = async (mangaId) => {
        setIsLoading(true)
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
            setIsLoading(false);
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
                console.log(newRating)
                setMangaStars(newRating)

            } catch (ex) {
                console.log(ex)
            }
        } else {
            message_error("You have to login first!")
        }

    }

    const getCmtsManga = async () => {
        const data = {
            manga_id: id,
            from: fromRow,
            amount: amountRows
        }

        try {
            const response = await mangaApi.getComments(data);
            console.log("cmts manga: ", response)

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
                comments.forEach(comment => {
                    comment.chaptercmt_time = dayjs(comment.chaptercmt_time).format("DD-MM-YYYY HH:mm:ss");
                });
                setComments(comments)
                setFromRow(fromRow + 11)
            }

            return;
        } catch (ex) {
            console.log(ex)
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
                // addReadingHistory={(managId, chapterId) => addReadingHistory(managId, chapterId)}
                handleRatingManga={(value) => handleRatingManga(value)}
                mangaStars={mangaStars}
                comments={comments}
                isEndCmts={isEndCmts}
            />
        </div>
    )
}

export default MangaService
