import React, { memo, useEffect, useState } from 'react';
import "./ListChapters.css";
import LoadingCircle from '../../Loading/LoadingCircle/LoadingCircle';
import { Empty, Typography } from 'antd';
import { useHistory } from 'react-router';
import { SET_MANGA_ID } from "../../../store/slices/MangaSlice";
import { useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';

function ListChapters({ chapters, mangaId, height }) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    const goToChapterPage = (chapterId) => {
        localStorage.setItem("mangaid", JSON.stringify(mangaId))
        dispatch(SET_MANGA_ID(mangaId))
    }



    return (
        <ul
            className="list-chapter"
            style={{ height: height }}
        >
            {isLoading
                ? <LoadingCircle />
                : chapters.length
                    ? chapters.map((chapter, i) => (
                        <NavLink className="list-chapter-item" id={chapter.chapter_id} to={`/chapter/${mangaId}/${chapter.chapter_id}`} onClick={() => goToChapterPage(chapter.chapter_id)} >
                            <Typography.Text>{chapter.chapter_name}</Typography.Text>
                            <Typography.Text>{chapter.createdAt}</Typography.Text>
                        </NavLink>
                    ))
                    : <Empty 
                    style={{ marginTop: "120px", color: "#8a8d92" }}
                    image={Empty.PRESENTED_IMAGE_SIMPLE} 
                    description="No Chapters :(" 
                    />
            }
        </ul>
    )
}

export default memo(ListChapters)