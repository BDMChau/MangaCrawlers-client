import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import genreApi from '../../api/apis/genreApi';
import mangaApi from '../../api/apis/mangaApi';
import { message_error } from '../../components/notifications/message';
import SearchingPage from './SearchingPage';

export default function SearchingPageService() {
    const [data, setData] = useState([]);
    const [dataName, setDataName] = useState([]);
    const [dataIds, setDataIds] = useState([]);
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
        if (dataIds) {
            const data = {
                genres_id: dataIds
            }

            try {
                const response = await mangaApi.searchMangasByGenres(data);
                console.log("mangasGenres: ", response)

                if (response.content.msg === "Manga not found!last") {
                    message_error("No manga with these genres :(", 4)
                } else {
                    history.push(`/manga/genres/tag?v=${dataIds}`)
                }

                return;
            } catch (ex) {
                console.log(ex)
            }
        }
    }


    return (
        <div>
            <SearchingPage data={data}
                dataName={dataName}
                handleClickTag={(genre) => handleClickTag(genre)}
                handleGetMangasAndRedirectToResultPage={() => handleGetMangasAndRedirectToResultPage()}
            />
        </div>
    )
}