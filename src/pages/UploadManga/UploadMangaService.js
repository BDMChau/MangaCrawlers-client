import React, { useEffect, useState } from 'react'
import UploadManga from './UploadManga'
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { message_success, message_warning } from '../../components/notifications/message';
import userApi from '../../api/apis/userApi';
import Cookies from 'universal-cookie';


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
        listFile.forEach(file => {
            formData.append("files", file.originFileObj)
        })

        try {
            const response = await userApi.uploadImagesChapter(token, formData);
            console.log(response)
            
            if(response.content.msg){
                message_success("Upload successfully!")
            }     

            setIsLoading(false);
        } catch (ex) {
            console.log(ex)
        }
    }

    const getMangaInfo = async () => {
        const data = {
            manga_id: query.get("v")
        }

        try{
            const response = await userApi.getMangaInfo(token, data);
            console.log(response)

            if(response.content.msg){
                setManga({...response.content.manga, manga_authorName: response.content.author_name})
                setChapters(response.content.chapters)
            }

        }catch(ex){
            console.log(ex)
        }
    }

    return (
        <UploadManga
            handleUploadImgs={(listFile, chapterName) => handleUploadImgs(listFile, chapterName)}
            isLoading={isLoading}
            manga={manga}
            chapters={chapters}
        />
    )
}
