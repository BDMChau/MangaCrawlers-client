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
    const [id, setId] = useState(chapterid);
    const [imgs, setImgs] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [chapterInfo, setChapterInfo] = useState({});

    useEffect(() => {
        getDataChapter();
        localStorage.setItem("mangaid", JSON.stringify(mangaid));
        dispatch(SET_MANGA_ID(mangaid))
    }, [])

    useEffect(() => {
        getDataChapter();
    }, [chapterid])

    const getDataChapter = async () => {
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
            />
        </div>
    )
}
