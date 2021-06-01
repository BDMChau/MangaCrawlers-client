import React, { useEffect, useState } from 'react'
import MangaGenres from './MangaGenres'
import { useLocation } from 'react-router'
import mangaApi from '../../api/apis/mangaApi';
import { message_error } from '../../components/notifications/message';


export default function MangaGenresService() {
    const [mangas, setMangas] = useState([]);
    const [genres, setGenres] = useState([]);
    const query = new URLSearchParams(useLocation().search);

    useEffect(() => {
        console.log(query.get("v"))
        handleGetMangas();
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
