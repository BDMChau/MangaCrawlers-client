import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import userApi from '../../api/apis/userApi';
import TransGroup from './TransGroup'
import Cookies from 'universal-cookie';
import genreApi from '../../api/apis/genreApi';
import dayjs from 'dayjs';

export default function TransGroupService() {
    const [transGrInfo, setTransGrInfo] = useState({})
    const [mangas, setMangas] = useState([])
    const [genres, setGenres] = useState([]);


    const location = useLocation();
    const cookies = new Cookies();
    const token = cookies.get("token");

    useEffect(() => {
        getTransGroupInfo();
        getAllGenres();
    }, [])

    const getTransGroupInfo = async () => {
        console.log(location.state.transGrId)
        const data = {
            transgroup_id: location.state.transGrId
        }

        try {
            const response = await userApi.getTransGroupInfo(token, data);
            console.log(response)

            if (response.content.err) {
                return;
            }

            const mangas = response.content.list_manga;
            mangas.forEach(manga => {
                manga.isProject = true;
                manga.createdAt = dayjs(manga.createdAt).format("HH:MM DD-MM-YYYY"); //createdAt is milisecond;
            })


            console.log(response.content.msg)
            setTransGrInfo(response.content.trans_group)
            setMangas(response.content.list_manga)
            return;
        } catch (ex) {
            console.log(ex)
        }
    }

    const getAllGenres = async () => {
        try {
            const response = await genreApi.getAll();
            if (response.content.err) {
                return;
            }
            const genres = response.content.genres;

            setGenres(genres);
            return;
        } catch (error) {
            console.log(error);
        }

    }

    const handleCreateNewProject = async (fieldsData, img) => {
       

        const data = {
            ...fieldsData
        }

        try {
            const response = await userApi.AddNewProjectFields(token, data);

            if(response){
                let formData = new FormData();
                formData.append("file", img)
                formData.append("manga_id", response.content.manga_id);
                const response02 = await userApi.AddNewProjectThumbnail(token, formData);
                console.log(response02)
            }
            console.log(response)
        } catch (ex) {
            console.log(ex)
        }
    }


    return (
        <TransGroup
            transGrInfo={transGrInfo}
            mangas={mangas}
            genres={genres}

            handleCreateNewProject={(fieldsData, img) => handleCreateNewProject(fieldsData, img)}
        />
    )
}
