import React, { useEffect, useState } from 'react'
import userApi from '../../api/apis/userApi';
import TransGroup from './TransGroup'
import Cookies from 'universal-cookie';
import genreApi from '../../api/apis/genreApi';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { message_error, message_success, message_warning } from '../../components/notifications/message';

export default function TransGroupService() {
    const userState = useSelector((state) => state.userState);
    const [transGrInfo, setTransGrInfo] = useState({})
    const [mangas, setMangas] = useState([])
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const history = useHistory();


    const cookies = new Cookies();
    const token = cookies.get("token");

    useEffect(() => {
        if (!userState[0]) {
            history.push("/");
            message_warning("Please login first!")
            return;
        } else {
            getTransGroupInfo();
            getAllGenres();
        }
    }, [])

    const getTransGroupInfo = async () => {
        const data = {
            transgroup_id: userState[0].user_transgroup_id
        }

        try {
            const response = await userApi.getTransGroupInfo(token, data);
            console.log(response)

            if (response.content.err) {
                setIsLogin(true);
                return;
            }

            const mangas = response.content.list_manga;
            mangas.forEach(manga => {
                manga.isProject = true;

                if (manga.createdAt === null) {
                    manga.createdAt = "";
                } else {
                    manga.createdAt = dayjs(manga.createdAt).format("HH:MM DD-MM-YYYY"); //createdAt is milisecond;
                }
            })


            console.log(response.content.msg)
            setTransGrInfo(response.content.trans_group)
            setMangas(response.content.list_manga)
            setIsLogin(false);
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
        setIsLoading(true);
        const data = {
            ...fieldsData
        }

        try {
            const response = await userApi.addNewProjectFields(token, data);

            if (response.content.msg) {
                let formData = new FormData();
                formData.append("file", img)
                formData.append("manga_id", response.content.manga_id);
                const response02 = await userApi.addNewProjectThumbnail(token, formData);
                console.log(response02)
                message_success("Upload new manga successfully!")
            } else {
                message_error(response.content.err);
            }

            setIsLoading(false);
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
            isLoading={isLoading}
            isLogin={isLogin}
        />
    )
}
