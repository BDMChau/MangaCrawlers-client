import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import UserPage from './UserPage'
import Cookies from 'universal-cookie';
import mangaApi from '../../../api/apis/MainServer/mangaApi';
import { useHistory } from 'react-router-dom';
import userApi from 'api/apis/MainServer/userApi';

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
                if (responseHistory) {

                    setHistoryMangas(responseHistory.content.mangas)
                }

                const responseFollowing = await mangaApi.getFollowingManga(token)
                if (responseFollowing) {


                    setFollowingMangas(responseFollowing.content.mangas)
                }

            } else if (tabSelected === "following") {
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


    // remove history
    const handleDeleteManga = async (id) => {
        console.log(id)
        if (!token) return;
        const data = { manga_id: id.toString() };

        try {
            const res = await userApi.removeHistoryManga(token, data);
            if (res.content.err) return false;

            return true;
        } catch (err) {
            console.log(err);
            return false;
        }

    }

    return (
        <div>
            <UserPage
                tabSelected={tabSelected}

                historyMangas={historyMangas}
                followingMangas={followingMangas}

                handleDeleteManga={handleDeleteManga}
            />
        </div>
    )
}
