import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import genreApi from '../../../api/apis/genreApi';
import mangaApi from '../../../api/apis/mangaApi';
import { message_error } from '../../../components/notifications/message';
import SearchingPage from './SearchingPage';
import { SET_MANGA_SEARCHED_BY_GENRES } from "../../../store/slices/MangaSlice";

export default function SearchingPageService() {
    const dispatch = useDispatch()

    const [data, setData] = useState([]);
    const [dataName, setDataName] = useState([]);
    const [dataIds, setDataIds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();


    useEffect(() => {
        getAllGenres();
    }, [])


    const getAllGenres = async () => {
        try {
            const response = await genreApi.getAll();
            if (response.content.err) {
                return;
            }
            const genres = response.content.genres;
            genres.forEach(genre => {
                genre.isSelected = false;
            });
            // const shuffledGenres = arrayMethods.shuffle(genres);
            setData(genres);

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

    const handleGetMangasAndRedirectToResultPage = async () => {
        if (dataIds.length) {
            setIsLoading(true)
            const data = {
                genres_id: dataIds
            }

            try {
                const response = await mangaApi.searchMangasByGenres(data);
                console.log("mangasGenres: ", response)

                if (response.content.err === "Manga not found") {
                    message_error("No manga with these genres :(", 4)
                } else {
                    const arrData = [];
                    arrData.push(response.content.mangas)
                    arrData.push(response.content.genres)

                    dispatch(SET_MANGA_SEARCHED_BY_GENRES(arrData))
                    history.push(`/manga/genres/tag?v=${dataIds}`)
                }

                setIsLoading(false)
                return;
            } catch (ex) {
                console.log(ex)
            }
        } else {
            message_error("Nothing to search!", 3);
            setIsLoading(false)
        }
    }


    return (
        <div>
            <SearchingPage
                data={data}
                dataName={dataName}
                isLoading={isLoading}
                handleClickTag={(genre) => handleClickTag(genre)}
                handleGetMangasAndRedirectToResultPage={() => handleGetMangasAndRedirectToResultPage()}
            />
        </div>
    )
}