import React, { useEffect } from 'react'
import UploadManga from './UploadManga'
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { message_warning } from '../../components/notifications/message';
import userApi from '../../api/apis/userApi';
import Cookies from 'universal-cookie';


export default function UploadMangaService() {
    const userState = useSelector((state) => state.userState);
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
    }, [])

    const handleUploadImgs = async (listFile) => {
        console.log(listFile)
        let formData = new FormData();
        formData.append("manga_id", query.get("v"));
        listFile.forEach(file => {
            formData.append("files", file.originFileObj)
        })

        try {
            const response = await userApi.uploadImagesChapter(token, formData);
            console.log(response)
        } catch (ex) {
            console.log(ex)
        }
    }


    return (
        <UploadManga
            handleUploadImgs={(listFile) => handleUploadImgs(listFile)}
        />
    )
}
