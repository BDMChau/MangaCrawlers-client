import React, { useEffect, useState } from 'react'
import EditChapter from './EditChapter'
import { useParams, useHistory, } from 'react-router';
import chapterApi from 'api/apis/MainServer/chapterApi';
import Cookies from 'universal-cookie';
import userApi from 'api/apis/MainServer/userApi';
import { useSelector } from 'react-redux';
import { message_error } from 'components/toast/message';


export default function EditChapterService() {
    const userState = useSelector((state) => state.userState);

    const params = useParams();
    const { mangaid_param, chapterid_param } = params;

    const [isLoading, setIsLoading] = useState(false);
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


    const handleEdit = (chapter, listImg) => {
        const data = {
            chapter: chapter,
            list_img: listImg
        };

        console.log(data)
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
        />
    )
}
