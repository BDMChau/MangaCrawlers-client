import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import UserPage from './UserPage'
import Cookies from 'universal-cookie';
import mangaApi from '../../../api/apis/MainServer/mangaApi';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';

export default function UserPageService() {
    const query = new URLSearchParams(useLocation().search);

    const [tabSelected, setTabSelected] = useState(null)
    const [historyMangas, setHistoryMangas] = useState([])
    const [followingMangas, setFollowingMangas] = useState([])

    const cookies = new Cookies();
    const token = cookies.get("token")
    const history = useHistory();

    useEffect(() => {
        getUserMangas();
    }, [])

    useEffect(() => {
        if (!query.get("v")) {
            history.push(`/user?v=following`)
        } else {
            setTabSelected(query.get("v"))
        }
    }, [query.get("v")])

    const getUserMangas = async () => {
        try {
            if (tabSelected === "history" || tabSelected === null) {
                const responseHistory = await mangaApi.getHistoryManga(token)
                console.log(responseHistory)
                if (responseHistory) {
                    responseHistory.content.mangas.forEach(manga => {
                        manga.createdAt = dayjs(manga.createdAt).format("DD-MM-YYYY"); //createdAt is milisecond;
                    })

                    setHistoryMangas(responseHistory.content.mangas)
                }

                const responseFollowing = await mangaApi.getFollowingManga(token)
                if (responseFollowing) {
                    responseFollowing.content.mangas.forEach(manga => {
                        manga.createdAt = dayjs(manga.createdAt).format("DD-MM-YYYY"); //createdAt is milisecond;
                    })

                    setFollowingMangas(responseFollowing.content.mangas)
                }

            } else if (tabSelected === "following") {
                const responseFollowing = await mangaApi.getFollowingManga(token)
                if (responseFollowing) {
                    responseFollowing.content.mangas.forEach(manga => {
                        manga.createdAt = dayjs(manga.createdAt).format("DD-MM-YYYY"); //createdAt is milisecond;
                    })

                    setFollowingMangas(responseFollowing.content.mangas)
                }

                const responseHistory = await mangaApi.getHistoryManga(token)
                if (responseHistory) {
                    responseHistory.content.mangas.forEach(manga => {
                        manga.createdAt = dayjs(manga.createdAt).format("DD-MM-YYYY"); //createdAt is milisecond;
                    })

                    setHistoryMangas(responseHistory.content.mangas)
                }
            }

        } catch (ex) {
            console.log(ex)
        }
    }

    return (
        <div>
            <UserPage
                tabSelected={tabSelected}

                historyMangas={historyMangas}
                followingMangas={followingMangas}
            />
        </div>
    )
}
