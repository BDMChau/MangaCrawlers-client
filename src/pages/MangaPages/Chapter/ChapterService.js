import React, { useEffect, useState } from 'react'

import Chapter from './Chapter'
import initial from 'lodash/initial';
import { useParams } from 'react-router'

import { useSelector } from "react-redux";
import Cookies from 'universal-cookie';
import { message_error, message_success } from '../../../components/toast/message';

import mangaApi from '../../../api/apis/MainServer/mangaApi';
import { regex } from 'helpers/regex';



export default function ChapterService() {
    const userState = useSelector((state) => state.userState);

    const [isLoadingAddFollow, setIsLoadingAddFollow] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);


    const cookies = new Cookies();
    const token = cookies.get("token");

    const { manga_name_id_param, chapter_name_param } = useParams();
    const [mangaId, setMangaId] = useState("");
    const [mangaName, setMangaName] = useState("");

    const [chapterId, setChapterId] = useState("");
    const [chapterName, setChapterName] = useState("");



    useEffect(() => {
        let mangaId;
        let chapterId;
        const splittedManga = manga_name_id_param.split("-");
        const splittedChapter = chapter_name_param.split("_");

        mangaId = splittedManga[splittedManga.length - 1];
        chapterId = splittedChapter[1];

        setMangaId(mangaId);
        // setMangaName(initial(splittedManga).toString().replaceAll(",", "-"));
        setChapterId(chapterId);
        setChapterName(initial(splittedChapter).toString().replaceAll(regex.special_char, " "));


        addReadingHistory(mangaId, chapterId);
        updateView(mangaId, chapterId);
    }, [manga_name_id_param, chapter_name_param])




    const updateView = async (mangaId, chapterId) => {
        const data = {
            manga_id: mangaId,
            chapter_id: chapterId
        };

        try {
            await mangaApi.updateViewManga(data);
        } catch (err) {
            console.log(err)
        }
    }






    const addToFollowingManga = async (mangaId) => {
        setIsLoadingAddFollow(true)
        const data = {
            manga_id: mangaId
        }
        try {
            const response = await mangaApi.addToFollowing(data, token);

            if (JSON.parse(localStorage.getItem("code_400"))) {
                setIsLoadingAddFollow(false);
                localStorage.removeItem("code_400")
                return;
            } else if (response.content.err) {
                setIsLoadingAddFollow(false);
                localStorage.removeItem("code_400")
                return;
            }

            message_success("Added to your library", 4)
            setIsFollowed(true);
            setIsLoadingAddFollow(false);
            return;
        } catch (error) {
            console.log(error);
        }
    }

    const removeFollowingManga = async (mangaId) => {
        setIsLoadingAddFollow(true)
        const data = {
            manga_id: mangaId,
        }
        try {
            const response = await mangaApi.removeFollowing(data, token)
            if (response.content.err) {
                setIsLoadingAddFollow(false);
                message_error("Something wrong, try again!")
                return
            }

            message_success("Removed from your library!", 3)
            setIsFollowed(false);
            setIsLoadingAddFollow(false);
            return;
        } catch (ex) {
            console.log(ex)
        }
    }


    const addReadingHistory = async (mangaId, chapterId) => {
        if (userState[0]) {
            const data = {
                manga_id: mangaId,
                chapter_id: chapterId
            }
            try {
                const response = await mangaApi.updateReadingHistory(data, token)

            } catch (ex) {
                console.log(ex)
            }
        }
    }



    return (
        <div>
            <Chapter
                chapterId={chapterId}
                chapterName={chapterName}

                mangaId={mangaId}

                addToFollowingManga={addToFollowingManga}
                removeFollowingManga={removeFollowingManga}
                isLoadingAddFollow={isLoadingAddFollow}
                isFollowed={isFollowed}
                addReadingHistory={addReadingHistory}
            />
        </div>
    )
}
