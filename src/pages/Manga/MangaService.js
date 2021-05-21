import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Manga from './Manga'
import mangaApi from "../../api/apis/mangaApi"
import dayjs from 'dayjs';

function MangaService() {
    const [manga, setManga] = useState({});
    const [genres, setGenres] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [weeklyMangas, setWeeklyMangas] = useState([]);
    const { id } = useParams()

    useEffect(() => {
        getWeeklyTopMangas()
        getMangaData();

    }, [])

    const getMangaData = async () => {
        try {
            const params = {
                manga_id: id,
            }
            const response = await mangaApi.getManga(params);
            console.log(response)
            if (response.content.err) {
                return;
            }
            const chapters = response.content.chapters;
            chapters.forEach(chapter => {
                chapter.createdAt = dayjs(chapter.createdAt).format("DD-MM-YYYY");
            });

            console.log(response.content)
            setManga(response.content.manga)
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

    return (
        <div>
            <Manga
                weeklyMangas={weeklyMangas}
                manga={manga}
                genres={genres}
                chapters={chapters}
            />
        </div>
    )
}

export default MangaService
