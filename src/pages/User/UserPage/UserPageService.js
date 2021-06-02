import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import UserPage from './UserPage'
import Cookies from 'universal-cookie';
import mangaApi from '../../../api/apis/mangaApi';
import dayjs from 'dayjs';

export default function UserPageService() {
    const query = new URLSearchParams(useLocation().search);
    const value = query.get("v");
    const [historyMangas, setHistoryMangas] = useState([])
    const [followingMangas, setFollowingMangas] = useState([])
    const cookies = new Cookies();
    const token = cookies.get("token")


    useEffect(() => {
        getUserMangas();
    }, [])

    const getUserMangas = async () => {
        try {
            if (value === "history" || value === null) {
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

            } else if (value === "following") {
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
                query={value}
                historyMangas={historyMangas}
                followingMangas={followingMangas}
            />
        </div>
    )
}
