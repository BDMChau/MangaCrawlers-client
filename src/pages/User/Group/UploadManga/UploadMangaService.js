import React, { useEffect, useState } from 'react'
import UploadManga from './UploadManga'
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { message_success, message_warning } from '../../../../components/toast/message';
import userApi from '../../../../api/apis/MainServer/userApi';
import Cookies from 'universal-cookie';
import { format } from 'helpers/format';
import { notification_error, notification_success } from 'components/toast/notification';


export default function UploadMangaService() {
    const userState = useSelector((state) => state.userState);
    const [manga, setManga] = useState({})
    const [chapters, setChapters] = useState({})
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();
    const query = new URLSearchParams(useLocation().search);

    const cookies = new Cookies();
    const token = cookies.get("token")

    useEffect(() => {
        if (!userState[0]) {
            history.push("/");
            message_warning("Please login first!")
            return;
        }

        getMangaInfo();
    }, [])

    const handleUploadImgs = async (listFile, chapterName) => {
        setIsLoading(true);
        console.log(listFile)
        console.log("chapterName: " + chapterName);

        let formData = new FormData();
        formData.append("manga_id", query.get("v"));
        formData.append("chapter_name", chapterName);
        formData.append("is_create", true);
        listFile.forEach(file =>  formData.append("files", file.originFileObj))

        try {
            const response = await userApi.uploadImagesChapter(token, formData);
            
            if(response.content.msg) message_success("Upload successfully!")
            setIsLoading(false);
        } catch (ex) {
            console.log(ex);
            setIsLoading(false);
        }
    }

    const getMangaInfo = async () => {
        const data = {
            manga_id: query.get("v")
        }

        try{
            const response = await userApi.getMangaInfo(token, data);

            if(response.content.msg){
                setManga({...response.content.manga, manga_authorName: response.content.author_name})


                const chapters = response.content.chapters;
                chapters.forEach(chapter => {
                    chapter.createdAt = format.formatDate01(chapter.createdAt);
                })

                setChapters(chapters)
            }

        }catch(ex){
            console.log(ex)
        }
    }


    const editMangaInfo = async (mangaInfo) => {
        const data = {
            manga_id: mangaInfo.manga_id.toString(),
            manga_name: mangaInfo.manga_name,
            description: mangaInfo.description,
            thumbnail: mangaInfo.thumbnail,
            author: mangaInfo.author,
            manga_authorName: mangaInfo.manga_authorName,
            status: mangaInfo.status,
            transgroup: mangaInfo.transgroup
        };

        try {
            const res = await userApi.updateMangaInfo(token, data);
            if(res.content.msg) notification_success("Success!");
        } catch (err) {
            console.log(err)
            notification_error("Failed!")
        }
    }


    return (
        <UploadManga
            handleUploadImgs={(listFile, chapterName) => handleUploadImgs(listFile, chapterName)}
            isLoading={isLoading}
            manga={manga}
            setManga={setManga}
            chapters={chapters}

            editMangaInfo={editMangaInfo}
        />
    )
}
