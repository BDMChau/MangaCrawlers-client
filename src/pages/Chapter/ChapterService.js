import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Chapter from './Chapter'
import chapterApi from "../../api/apis/chapterApi"
import dayjs from 'dayjs';
import { SET_MANGA_ID } from "../../store/slices/MangaSlice";
import { useDispatch } from "react-redux";

export default function ChapterService() {
    const dispatch = useDispatch();
    const { mangaid, chapterid } = useParams();
    const [imgs, setImgs] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [chapterInfo, setChapterInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getDataChapter();
        localStorage.setItem("mangaid", JSON.stringify(mangaid));
        dispatch(SET_MANGA_ID(mangaid))
    }, [])

    useEffect(() => {
        setImgs([]);
        setChapters([]);
        setChapterInfo({
            chapter_id: "",
            chapter_number: "",
            chapter_name: "",
            views: "",
            createdAt: ""
        })

        getDataChapter();
    }, [chapterid])

    const getDataChapter = async () => {
        setIsLoading(true);
        const data = {
            manga_id: mangaid,
            chapter_id: chapterid,
        }

        try {
            const response = await chapterApi.getChapterImgs(data)
            console.log(response)
            if (!response.content.chapterInfo) {
                setImgs([]);
                setChapters([]);
                setChapterInfo({
                    chapter_id: "",
                    chapter_number: "",
                    chapter_name: "",
                    views: "",
                    createdAt: ""
                })
                setIsLoading(false)
                return;
            }

            if (response.content.err) {
                return;
            }

            const chapters = response.content.listChapter;
            chapters.forEach(chapter => {
                chapter.chapter_createdAT = dayjs(chapter.chapter_createdAT).format("DD-MM-YYYY");
            })

            setChapters(chapters)
            setImgs(response.content.listImg)
            setChapterInfo(response.content.chapterInfo)
            setIsLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Chapter
                imgs={imgs}
                chapters={chapters}
                chapterInfo={chapterInfo}
                isLoading={isLoading}
            />
        </div>
    )
}
