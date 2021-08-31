import React, { memo, useState } from 'react';
import "./ListChapters.css";
import LoadingCircle from '../../Loading/LoadingCircle/LoadingCircle';
import { Empty, Typography } from 'antd';
import { useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { regex } from 'config/regex';
import redirectURI from 'helpers/redirectURI';

function ListChapters({ chapters, mangaId, mangaName, height }) {
    const [isLoading] = useState(false)




    return (
        <ul
            className="list-chapter"
            style={{ height: height }}
        >
            {isLoading
                ? <LoadingCircle />
                : chapters.length
                    ? chapters.map((chapter, i) => (
                        <NavLink
                            key={i}
                            title={chapter.chapter_name}
                            className="list-chapter-item" id={chapter.chapter_id}
                            to={redirectURI.chapterPage_uri(mangaId, mangaName, chapter.chapter_id, chapter.chapter_name)}
                             >
                            <Typography.Text>{chapter.chapter_name}</Typography.Text>
                            <Typography.Text>{chapter.createdAt}</Typography.Text>
                        </NavLink>
                    ))
                    : <Empty
                        style={{ margin: "0 auto" ,marginTop: "120px", color: "#8a8d92" }}
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="No Chapters :("
                    />
            }
        </ul>
    )
}

export default memo(ListChapters)