import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import mangaApi from '../../api/apis/mangaApi';
// import arrayMethods from '../../helpers/arrayMethods';
import MangaGenre from './MangaGenre'

export default function MangaGenreService() {
    const [id, setId] = useState({});
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

            // const shuffledManga = arrayMethods.shuffle(response.content.data);
            setMangas(response.content.data);

            return;
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <MangaGenre
                genre={genre}
                mangas={mangas}
            />
        </div>
    )
}
