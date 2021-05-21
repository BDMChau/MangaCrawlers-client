import React, { useRef, useEffect, useState } from 'react'
import mangaApi from "../../api/apis/mangaApi"
import Home from './Home'
import dayjs from 'dayjs'
import { debounce, throttle } from 'lodash'

function HomeService() {
    const [isLoadingSearch, setIsLoadingSearch] = useState(false)
    const [latestMangas, setLatestMangas] = useState([])
    const [topMangas, setTopMangas] = useState([])
    const [weeklyMangas, setWeeklyMangas] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const typingRef = useRef(null);


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

    const debouceCallApiToSearch = debounce(async (val) => {
        try {
            setIsLoadingSearch(true);
            const data = {
                "manga_name": val
            }
            const response = await mangaApi.search(data);

            if (response) {
                if (response.content.err) {
                    setSearchResults([])
                    setIsLoadingSearch(false);
                    return;
                }

                const mangas = response.content.data;
                setSearchResults(mangas)
                setIsLoadingSearch(false);
                return;
            }
        } catch (err) {
            console.log(err)
        }
    }, 200)

    const onSearch = (val) => {
        if (val) {
            typingRef.current = debouceCallApiToSearch(val);
        }
    }


    return (
        <div>
            <Home
                latestMangas={latestMangas}
                topMangas={topMangas}
                weeklyMangas={weeklyMangas}
                searchResults={searchResults}
                onSearch={(val) => onSearch(val)}
                isLoadingSearch={isLoadingSearch}
            />
        </div>
    )
}


export default HomeService;

