import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import mangaApi from '../../../api/apis/MainServer/mangaApi';
import { message_error } from '../../../components/notifications/message';
import SearchingPage from './SearchingPage';
import { SET_MANGA_SEARCHED_BY_GENRES } from "../../../store/features/manga/MangaSlice";

export default function SearchingPageService() {
    const dispatch = useDispatch()
    const genres = useSelector(state => state.mangaState[2])

    const [data, setData] = useState([]);
    const [dataName, setDataName] = useState([]);
    const [dataIds, setDataIds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();


    useEffect(() => {
        if (genres) {
            setData(genres);
        }
    }, [genres])


    const handleClickTag = (genre) => {
        if (genre.isSelected === false) {
            const dataCopies = data.map(item => ({ ...item }))
            for (let i = 0; i < dataCopies.length; i++) {
                if (dataCopies[i].genre_id === genre.genre_id) {
                    dataCopies[i].isSelected = true;
                    break;
                }
            }

            setData(dataCopies)
            setDataName((prevData) => [...prevData, genre.genre_name])
            setDataIds((prevData) => [...prevData, genre.genre_id])
            return;

        } else {
            const dataCopies = data.map(item => ({ ...item }))
            for (let i = 0; i < dataCopies.length; i++) {
                if (dataCopies[i].genre_id === genre.genre_id) {
                    dataCopies[i].isSelected = false;
                    break;
                }
            }

            setData(dataCopies)
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

                    dispatch(SET_MANGA_SEARCHED_BY_GENRES(arrData));
                    history.push(`/manga/genres/tag?v=${dataIds}`);
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