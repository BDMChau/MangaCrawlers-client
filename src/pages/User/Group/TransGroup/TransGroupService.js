import React, { useEffect, useState } from 'react'
import userApi from '../../../../api/apis/MainServer/userApi';
import TransGroup from './TransGroup'
import Cookies from 'universal-cookie';
import genreApi from '../../../../api/apis/MainServer/genreApi';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { message_error, message_success, message_warning } from '../../../../components/notifications/message';

export default function TransGroupService() {
    const userState = useSelector((state) => state.userState);
    const [transGrInfo, setTransGrInfo] = useState({})
    const [mangas, setMangas] = useState([])
    const [users, setUsers] = useState([])
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [IsLoadingDelete, setIsLoadingDelete] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const history = useHistory();


    const cookies = new Cookies();
    const token = cookies.get("token");

    // if (transGrInfo.transgroup_email === userState[0].user_email) {
    //     message_error("You cannot delete yourself ~.~");
    //     return;
    // }

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
            setUsers(response.content.list_user)
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

                if(response02.content.msg){
                    const newManga = response02.content.manga;
                    newManga.createdAt =  dayjs(newManga.createdAt).format("DD-MM-YYYY");
                    setMangas([...mangas, newManga]);
                    
                    message_success("Upload new manga successfully!")
                }

            } else {
                message_error("Login again before visit this page, thank you ^^!");
            }

            setIsLoading(false);
            return;
        } catch (ex) {
            console.log(ex)
        }
    }

    const handleDeleteManga = async (mangaId) => {
        if (transGrInfo) {
            setIsLoadingDelete(true);
            const data = {
                manga_id: mangaId,
                transgroup_id: transGrInfo.transgroup_id
            }

            try {
                const response = await userApi.removeManga(token, data);

                if(response.content.msg){
                    const mangaIdRemoved = response.content.manga_id

                    setMangas(mangas.filter(manga => manga.manga_id !== mangaIdRemoved));
                    message_success("Removed this manga!");
                }

                setIsLoadingDelete(false);
            } catch (ex) {
                console.log(ex)
            }

        }
    }


    return (
        <TransGroup
            transGrInfo={transGrInfo}
            mangas={mangas}
            users={users}
            genres={genres}

            handleCreateNewProject={(fieldsData, img) => handleCreateNewProject(fieldsData, img)}
            isLoading={isLoading}
            isLogin={isLogin}

            handleDeleteManga={(mangaId) => handleDeleteManga(mangaId)}
            IsLoadingDelete={IsLoadingDelete}
        />
    )
}
