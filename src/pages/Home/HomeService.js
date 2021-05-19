import React, { useEffect, useState } from 'react'
import mangaApi from "../../api/apis/mangaApi"
import Home from './Home'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'

function HomeService() {
    const dispatch = useDispatch();
    const [latestMangas, setLatestMangas] = useState([])
    const [topMangas, setTopMangas] = useState([])
    const [weeklyMangas, setWeeklyMangas] = useState([])


    useEffect(() => {
        getLatestMangas();
        getTopFiveMangas();
        getWeeklyTopMangas();
    }, [])

    const getLatestMangas = async () => {
        try {
            const response = await mangaApi.getLatest();
            if (response.content.err) {
                return;
            }

            response.content.data.forEach(manga => {
                const chapterName = manga.chapter_name;
                const createdAtChapterFormated = dayjs(manga.createdAt).format("DD-MM-YYYY"); //createdAt is milisecond

                manga.createdAt = createdAtChapterFormated;
                manga.chapter_name = chapterName.split(":")[0];
            });


            setLatestMangas(response.content.data)

            return;
        } catch (error) {
            console.log(error);
        }
    }

    const getTopFiveMangas = async () => {
        try {
            const response = await mangaApi.getTop();
            if (response.content.err) {
                return;
            }

            setTopMangas(response.content.data)
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
            <Home 
            latestMangas={latestMangas}
            topMangas={topMangas}
            weeklyMangas={weeklyMangas}
             />
        </div>
    )
}


export default HomeService;

