import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import genreApi from '../../api/apis/genreApi';
import SearchingPage from './SearchingPage';
import arrayMethod from "../../helpers/arrayMethods";

export default function SearchingPageService() {
    const query = new URLSearchParams(useLocation().search);
    const [data, setData] = useState([]);
    const [dataName, setDataName] = useState([]);
    const [dataIds, setDataIds] = useState([]);


    useEffect(() => {
        getAllGenres();
        console.log(query.get("v"))
    }, [])


    const getAllGenres = async() => {
        try {
            const response = await genreApi.getAll();
            if (response.content.err) {
                return;
            }
            const genres = response.content.genres;
            genres.forEach(genre => {
                genre.isSelected = false;
            });
            const shuffledGenres = arrayMethod.shuffle(genres);
            setData(shuffledGenres);

            return;
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickTag = (genre) => {
        if (genre.isSelected === false) {
            genre.isSelected = true

            setData(data)
            setDataName((prevData) => [...prevData, genre.genre_name])
            setDataIds((prevData) => [...prevData, genre.genre_id])
            return;

        } else {
            genre.isSelected = false

            setData(data)
            setDataName(dataName.filter(name => name !== genre.genre_name))
            setDataIds(dataIds.filter(id => id !== genre.genre_id))
            return;
        }
    }

    return ( <
        div >
        <
        SearchingPage data = { data }
        dataName = { dataName }
        handleClickTag = {
            (genre) => handleClickTag(genre)
        }
        /> < /
        div >
    )
}