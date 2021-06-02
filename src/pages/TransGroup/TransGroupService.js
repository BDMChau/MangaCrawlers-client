import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import userApi from '../../api/apis/userApi';
import TransGroup from './TransGroup'
import Cookies from 'universal-cookie';
import genreApi from '../../api/apis/genreApi';

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

            console.log(response.content.msg)
            setTransGrInfo(response.content.trans_group)
            setMangas([])
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

    const handleCreateNewProject = async (fieldsData) => {
        const data = {
            fields: fieldsData
        }

        try {
            const response = await userApi.AddNewProject(token, data);

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

            handleCreateNewProject={(fieldsData) => handleCreateNewProject(fieldsData)}
        />
    )
}
