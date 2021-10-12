import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import mangaApi from '../../../api/apis/MainServer/mangaApi';
import MangaGenre from './MangaGenre'
import arraysMethods from "../../../helpers/arrayMethods"
import { format } from 'helpers/format';

export default function MangaGenreService() {
    const [genre, setGenre] = useState({});
    const [mangas, setMangas] = useState([]);
    const query = new URLSearchParams(useLocation().search);


    useEffect(() => {
    }, [])


    useEffect(() => {
        getMangasWithGenre(query.get("v"));
    }, [query.get("v")])


    const getMangasWithGenre = async (id) => {
        try {
            const data = {
                genre_id: id
            }
            const response = await mangaApi.getMangasFromGenre(data);
            if (!response) {
                setMangas([]);
                setGenre({});
            }

            if (response.content.err) {
                return;
            }

            const manga = response.content.data[0];
            const genre = {
                genre_id: manga.genre_id,
                genre_name: manga.genre_name,
                genre_color: manga.genre_color,
                genre_desc: manga.description
            }
            setGenre(genre)

            const shuffledManga = arraysMethods.shuffle(response.content.data);
            shuffledManga.forEach(manga => {
                manga.created_at = format.formatDate01(manga.created_at)
            })
            setMangas(shuffledManga);

            return;
        } catch (error) {
            console.log(error);
        }
    }


    return (
            <MangaGenre
                genre={genre}
                mangas={mangas}
            />
    )
}
