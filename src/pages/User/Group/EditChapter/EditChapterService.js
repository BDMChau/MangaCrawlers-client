import React, { useEffect, useState } from 'react'
import EditChapter from './EditChapter'
import { useParams, useHistory, } from 'react-router';
import chapterApi from 'api/apis/MainServer/chapterApi';
import Cookies from 'universal-cookie';
import userApi from 'api/apis/MainServer/userApi';
import { useSelector } from 'react-redux';
import { message_error } from 'components/toast/message';
import { notification_success } from 'components/toast/notification';


export default function EditChapterService() {
    const userState = useSelector((state) => state.userState);

    const params = useParams();
    const { mangaid_param, chapterid_param } = params;

    const [isLoading, setIsLoading] = useState(false);
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [manga, setManga] = useState({});
    const [chapterInfo, setChapterInfo] = useState({});
    const [imgs, setImgs] = useState([]);

    const history = useHistory();

    const cookies = new Cookies();
    const token = cookies.get("token");


    useEffect(() => {
        if (!userState[0]) {
            message_error("Please login!")
            history.push("/");
        }
    }, [userState])


    useEffect(() => {
        if (mangaid_param && chapterid_param) getImgsChapter(mangaid_param, chapterid_param);
    }, [mangaid_param, chapterid_param])

    useEffect(() => {
        if (mangaid_param) getMangaInfo(mangaid_param);
    }, [mangaid_param])


    const getMangaInfo = async (mangaId) => {
        const data = {
            manga_id: mangaId
        }

        try {
            const response = await userApi.getMangaInfo(token, data);

            if (response.content.msg) setManga({ ...response.content.manga, manga_authorName: response.content.author_name })
        } catch (ex) {
            console.log(ex)
        }
    }


    const getImgsChapter = async (mangaId, chapterId) => {
        setIsLoading(true);
        const data = {
            manga_id: mangaId.toString(),
            chapter_id: chapterId.toString()
        }

        try {
            const response = await chapterApi.getChapterImgs(data)
            if (response.content.err) {
                setImgs([]);
                message_warning("No chapter to present!", 3)
                setIsLoading(false)
                return;
            }
            const chapterInfo = response.content.chapterInfo;
            const imgs = response.content.listImg;

            setImgs(imgs)
            setChapterInfo(chapterInfo)
            setIsLoading(false)
            return;
        } catch (err) {
            setImgs([]);
            setIsLoading(false)
            console.log(err)
        }
    }


    const handleEdit = async (chapter, manga, listImg) => {
        setLoadingEdit(true);
        const data = {
            chapter: {
                chapter_id: chapter.chapter_id.toString(),
                chapter_name: chapter.chapter_name
            },
            manga_id: manga.manga_id.toString(),
            list_img: listImg
        };

        try {
            const res = await userApi.updateChapter(token, data);

            const imgs = res.content.list_img;
            setImgs(imgs);
            notification_success("Success!");
            setLoadingEdit(false);
        } catch (err) {
            console.log(err);
            notification_success("Error!")
            setLoadingEdit(false);
        }
    }


    const handleRemoveImg = async (id) => {
        try {
            console.log("ascacac")

            setImgs(imgs.filter(img => img.img_id !== id));
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <EditChapter
            isLoading={isLoading}
            
            imgs={imgs}
            setImgs={setImgs}

            chapterInfo={chapterInfo}
            setChapterInfo={setChapterInfo}

            manga={manga}

            handleEdit={handleEdit}
            loadingEdit={loadingEdit}

            handleRemoveImg={handleRemoveImg}
        />
    )
}
