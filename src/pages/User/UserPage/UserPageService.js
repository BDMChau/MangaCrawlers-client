import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import UserPage from './UserPage'
import Cookies from 'universal-cookie';
import mangaApi from '../../../api/apis/mangaApi';

export default function UserPageService() {
    const query = new URLSearchParams(useLocation().search);
    const value = query.get("v");
    const [historyMangas, setHistoryMangas] = useState([])
    const [followingMangas, setFollowingMangas] = useState([])

    useEffect(() => {
        getUserMangas();
    }, [])

    const getUserMangas = async () => {
        const cookies = new Cookies();
        const token = cookies.get("token")

        try {
            if (value === "history" || value === null) {
                const responseHistory = await mangaApi.getHistoryManga(token)
                if (responseHistory) {
                    setHistoryMangas(responseHistory.content.mangas)
                }

                const responseFollowing = await mangaApi.getFollowingManga(token)
                if (responseFollowing) {
                    setFollowingMangas(responseFollowing.content.mangas)
                }

            } else if (value === "following") {
                const responseFollowing = await mangaApi.getFollowingManga(token)
                if (responseFollowing) {
                    setFollowingMangas(responseFollowing.content.mangas)
                }

                const responseHistory = await mangaApi.getHistoryManga(token)
                if (responseHistory) {
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
