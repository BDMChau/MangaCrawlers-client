import React, { useEffect, useState } from 'react'
import EditChapter from './EditChapter'
import { useParams } from 'react-router';
import chapterApi from 'api/apis/MainServer/chapterApi';


export default function EditChapterService() {
    const params = useParams();
    const { mangaid_param, chapterid_param } = params;

    const [isLoading, setIsLoading] = useState(false);
    const [chapterInfo, setChapterInfo] = useState({});
    const [imgs, setImgs] = useState([]);
    const [imgsModified, setImgsModified] = useState([]);


    useEffect(() => {
        if (mangaid_param && chapterid_param) getImgsChapter(mangaid_param, chapterid_param);
    }, [mangaid_param, chapterid_param])



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
            console.log(err)
        }
    }


    return (
        <EditChapter
            imgs={imgs}
            setImgs={setImgs}
            chapterInfo={chapterInfo}

            setImgsModified={setImgsModified}
        />
    )
}
