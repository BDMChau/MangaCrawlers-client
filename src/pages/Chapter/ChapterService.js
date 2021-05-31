import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import Chapter from './Chapter'
import chapterApi from "../../api/apis/chapterApi"
import dayjs from 'dayjs';
import { SET_MANGA_ID } from "../../store/slices/MangaSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'universal-cookie';
import { message_error, message_success, message_warning } from '../../components/notifications/message';
import mangaApi from '../../api/apis/mangaApi';
import userApi from '../../api/apis/userApi';


export default function ChapterService() {
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.userState);
    const history = useHistory();
    const { mangaid, chapterid } = useParams();
    const [imgs, setImgs] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [chapterInfo, setChapterInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingAddFollow, setIsLoadingAddFollow] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);
    const [curChapter, setCurChapter] = useState(0);

    const [isAddedCmt, setIsAddedCmt] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [comments, setComments] = useState([]);
    const [fromRow, setFromRow] = useState(0);
    const [amountRows] = useState(10);
    const [isEndCmts, setIsEndCmts] = useState(false);
    const [isErrorCmt, setIsErrorCmt] = useState(false);
    const [timeWhenAddedCmt, setTimeWhenAddedCmt] = useState();


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

        setFromRow(0);
        setComments([]);
        getCmtsChapter();
    }, [chapterid || mangaid])

    useEffect(() => {
      console.log()
    })


    useEffect(() => {
        chapters.forEach((chapter, i) => {
            if (curChapter === i) {
                history.push(`/chapter/${mangaid}/${chapter.chapter_id}`)
            }
        })
    }, [curChapter])


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
            chapters.forEach((chapter, i) => {
                chapter.createdAt = dayjs(chapter.createdAt).format("DD-MM-YYYY");

                if (chapter.chapter_id == chapterid) {
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

    const addCmtChapter = async (cmtContent) => {
        if (userState[0]) {
            if (cmtContent) {
                setIsAdding(true);

                const newObjComment = {
                    "chapter_id": chapterid,
                    "chaptercmt_content": cmtContent,
                    "chaptercmt_time": dayjs(Date.now()).format("DD-MM-YYYY HH:mm:ss"),
                    "chapter_id": chapterid,
                    "chapter_name": chapterInfo.chapter_name,
                    "user_avatar": userState[0].user_avatar,
                    "user_email": userState[0].user_email,
                    "user_id": userState[0].user_id,
                    "user_name": userState[0].user_name,
                    "is_error": false
                }

                setTimeWhenAddedCmt(dayjs(Date.now()).format("DD-MM-YYYY HH:mm:ss"));
                setComments(prevCmts => [newObjComment, ...prevCmts])
                setIsAdding(false);
                setIsAddedCmt(true)


                const data = {
                    chapter_id: chapterid,
                    chaptercmt_content: cmtContent.trim()
                }

                try {
                    const response = await userApi.addCmtChapter(token, data);
                    if (response.content.comment_info) {
                        // added
                        return;
                    } else {
                        setIsErrorCmt(true);
                        return;
                    }
                } catch (ex) {
                    console.log(ex)
                }
            }
        } else {
            message_error("You have to login first!");
            return;
        }
    }

    const getCmtsChapter = async () => {
        console.log(fromRow)
        const data = {
            manga_id: mangaid,
            chapter_id: chapterid,
            from: fromRow,
            amount: amountRows
        }

        try {
            const response = await chapterApi.getComments(data);

            if (response.content.msg === "No comments found!") {
                setIsEndCmts(true);
                return;
            }

            if (response.content.comments) {
                const comments = response.content.comments;
                comments.forEach(comment => {
                    comment.chaptercmt_time = dayjs(comment.chaptercmt_time).format("DD-MM-YYYY HH:mm:ss");
                });

                setComments(prevCmts => [...prevCmts, ...comments])
                setFromRow(fromRow + 11)
                return
            }

            return;
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

                handleNextChapter={() => handleNextChapter()}
                handlePrevChapter={() => handlePrevChapter()}

                addCmtChapter={(cmtContent) => addCmtChapter(cmtContent)}
                isAddedCmt={isAddedCmt}
                setIsAddedCmt={setIsAddedCmt}
                isAdding={isAdding}
                comments={comments}
                getCmtsChapter={() => getCmtsChapter()}
                isEndCmts={isEndCmts}

            />
        </div>
    )
}
