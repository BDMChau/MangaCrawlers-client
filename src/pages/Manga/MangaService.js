import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Manga from './Manga'
import mangaApi from "../../api/apis/mangaApi"
import dayjs from 'dayjs';
import smoothscroll from 'smoothscroll-polyfill';
import Cookies from 'universal-cookie';
import { message_success } from '../../components/notifications/message';

function MangaService() {
    const [manga, setManga] = useState({});
    const [genres, setGenres] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [weeklyMangas, setWeeklyMangas] = useState([]);
    const [isFollowed, setIsFollowed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams()
    const cookies = new Cookies();
    const token = cookies.get("token")


    useEffect(() => {
        getWeeklyTopMangas()
        getMangaData();

        smoothscroll.polyfill();
        window.scroll({
            top: 0,
            behavior: "smooth"
        });
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
            chapters.forEach(chapter => {
                chapter.createdAt = dayjs(chapter.createdAt).format("DD-MM-YYYY");
            });

            const mangaObj = response.content.manga;

            const followingMangas = await getFollowingMangas();
            followingMangas.forEach(folllowingManga => {
                if (folllowingManga.manga_id === mangaObj.manga_id) {
                    setIsFollowed(true);
                }
            })

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

            setWeeklyMangas(response.content.data)
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
                followingMangas = responseFollowing.content.mangas;
            }

        } catch (ex) {
            console.log(ex)
        }
        return followingMangas;
    }

    const addReadingHistory = async (mangaId, chapterId) => {
        console.log("okkookokkoko")
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
            <Manga
                weeklyMangas={weeklyMangas}
                manga={manga}
                genres={genres}
                chapters={chapters}
                addToFollowingManga={(mangaId) => addToFollowingManga(mangaId)}
                isLoading={isLoading}
                isFollowed={isFollowed}
                addReadingHistory={(managId, chapterId) => addReadingHistory(managId, chapterId)}
            />
        </div>
    )
}

export default MangaService
