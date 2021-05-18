import React, { useEffect, useState } from 'react'
import mangaApi from "../../api/apis/mangaApi"
import { message_error } from '../../components/notifications/message'
import Home from './Home'
import dayjs from 'dayjs'

function HomeService() {
    const [latestMangas, setLatestMangas] = useState([])
    const [topMangas, setTopMangas] = useState([])


    useEffect(() => {
        getLatestMangas();
        getTopFiveMangas()
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


    return (
        <div>
            <Home 
            latestMangas={latestMangas}
            topMangas={topMangas}
             />
        </div>
    )
}


export default HomeService;

