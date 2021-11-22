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

    
    useEffect(() => {
        const splittedManga = manga_name_id_param.split("-");
        const mangaId = splittedManga[splittedManga.length - 1];

        if(mangaId && userState[0]) checkIsFollowing(mangaId);
    }, [manga_name_id_param, userState])




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


            setIsFollowed(true);
            setIsLoadingAddFollow(false);

            message_success("Added to your library", 3)
            return;
        } catch (error) {
            message_error("Failed!");
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

            setIsFollowed(false);
            setIsLoadingAddFollow(false);

            message_success("Removed from your library!", 3)
            return;
        } catch (ex) {
            message_error("Failed!");
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

    const checkIsFollowing = async (id) => {
        const data = { manga_id: id.toString() };

        try {
            const res = await userApi.checkIsFollowingManga(token, data);

            if (res.content.is_following === true) setIsFollowed(true);
            else setIsFollowed(false);

        } catch (err) {
            console.log(err);
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
