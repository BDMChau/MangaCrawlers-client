import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Manga from './Manga'
import mangaApi from "../../api/apis/mangaApi"

function MangaService() {
    const [manga, setManga] = useState({});
    const [weeklyMangas, setWeeklyMangas] = useState([]);

    useEffect(() => {
        getWeeklyTopMangas()
        getMangaData();
    }, [])

    const getMangaData = async () => {
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
            />
        </div>
    )
}

export default MangaService
