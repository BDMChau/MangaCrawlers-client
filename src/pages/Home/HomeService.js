import React, { useRef, useEffect, useState } from 'react'
import mangaApi from "../../api/apis/mangaApi"
import Home from './Home'
import dayjs from 'dayjs'
import { debounce } from 'lodash'
import authApi from '../../api/apis/authApi'
import Cookies from 'universal-cookie';
import { message_success } from '../../components/notifications/message'
import { SIGNIN } from '../../store/features/user/UserSlice';
import { useDispatch, useSelector } from 'react-redux'

function HomeService() {
    const userState = useSelector((state) => state.userState);
    const dispatch = useDispatch();

    const [isLoadingSearch, setIsLoadingSearch] = useState(false)
    const [latestMangas, setLatestMangas] = useState([])
    const [topMangas, setTopMangas] = useState([])
    const [weeklyMangas, setWeeklyMangas] = useState([])
    const [dailyMangas, setDailyMangas] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [searchResults, setSearchResults] = useState([])
    const typingRef = useRef(null);


    useEffect(() => {
        getLatestMangas();
        getTopFiveMangas();
        getWeeklyTopMangas();
        getTredingDailyManga();

        if(!userState[0]){
            getUserDataOAuthGoogle();
        }
    }, [])


    const getLatestMangas = async () => {
        try {
            const response = await mangaApi.getLatest();
            if (response.content.err) {
                return;
            }

            response.content.data.forEach(manga => {
                const chapterName = manga.chapter_name;
                const createdAtChapterFormated = dayjs(manga.createdAt).format("MMM DD, YYYY"); //createdAt is milisecond

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

            setWeeklyMangas(response.content.list_weekly)
            return;
        } catch (error) {
            console.log(error);
        }
    }

    const getTredingDailyManga = async () => {
        setIsLoading(true);
        try {
            const response = await mangaApi.getTredingDaily();
            if (response.content.err) {
                setIsLoading(false)
                return;
            }

            setDailyMangas(response.content.list_daily)
            setIsLoading(false)
            return;
        } catch (error) {
            console.log(error);
        }
    }

    
    const getUserDataOAuthGoogle = async () => {
        try{
            const response = await authApi.getAAA()
            console.log(response)

            const user = response.content.user;
            const token = response.content.token;

            const cookies = new Cookies();
            cookies.set("user", user, { path: '/' });
            cookies.set("token", token, { path: '/' })
            dispatch(SIGNIN(user));

            message_success("Signed in!");
            return;
        }catch(ex){
            console.log(ex)
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
        <Home
            latestMangas={latestMangas}
            topMangas={topMangas}
            weeklyMangas={weeklyMangas}
            dailyMangas={dailyMangas}
            isLoading={isLoading}
            
            searchResults={searchResults}
            onSearch={(val) => onSearch(val)}
            isLoadingSearch={isLoadingSearch}
        />
    )
}


export default HomeService;

