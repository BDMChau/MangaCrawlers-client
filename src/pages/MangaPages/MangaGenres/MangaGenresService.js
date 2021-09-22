import React, { useEffect, useState } from 'react'
import MangaGenres from './MangaGenres'
import { useLocation } from 'react-router'
import mangaApi from '../../../api/apis/MainServer/mangaApi';
import { message_error } from '../../../components/notifications/message';
import { useSelector } from 'react-redux';


export default function MangaGenresService() {
    const mangaState = useSelector((state) => state.mangaState)
    const [mangas, setMangas] = useState([]);
    const [genres, setGenres] = useState([]);
    const query = new URLSearchParams(useLocation().search);

    useEffect(() => {
        // if dont have data from search page >> user can enter url directly to visit this page, so we will call api when user do that
        if (!mangaState[1]) {
            handleGetMangas();
        } else {
            const mangas = mangaState[1][0];
            const genres = mangaState[1][1];

            setMangas(mangas)
            setGenres(genres)
        }
        return;
    }, [])


    const handleGetMangas = async () => {
        const genresId = JSON.parse("[" + query.get("v") + "]");

        const data = {
            genres_id: genresId
        }

        try {
            const response = await mangaApi.searchMangasByGenres(data);
            console.log("mangasGenres: ", response)

            if (response.content.msg === "Manga not found!last") {
                message_error("No manga with these genres :(", 4)
                return;
            }

            setMangas(response.content.mangas)
            setGenres(response.content.genres)
        } catch (ex) {
            console.log(ex)
        }
    }




    return (
        <MangaGenres
            mangas={mangas}
            genres={genres}
        />
    )
}
