import React, { memo, useState } from 'react';
import "./ListChapters.css";
import LoadingCircle from '../../Loading/LoadingCircle/LoadingCircle';
import { Empty, Input, Typography, Button, Popconfirm, Menu, Dropdown } from 'antd';
import { NavLink } from 'react-router-dom';
import redirectURI from 'helpers/redirectURI';
import Item from './Item';

function ListChapters({ chapters, mangaId, mangaName, height, editChapter, removeChapter }) {
    const [isLoading] = useState(false)
    const [isRemoving, setIsRemoving] = useState(false); // not just delete status, use this to control NavLink to="..."

    const [chapterId, setChapterId] = useState(0);
    const [chapterName, setChapterName] = useState("");

    const [allowToModify, setAllowToModify] = useState(true);





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
                            to={isRemoving ? "#" : redirectURI.chapterPage_uri(mangaId, mangaName, chapter.chapter_id, chapter.chapter_name)}
                        >
                            <Item
                                chapter={chapter}

                                setIsRemoving={setIsRemoving}

                                removeChapter={removeChapter}

                                setChapterId={setChapterId}
                                chapterId={chapterId}
                                setChapterName={setChapterName}
                                chapterName={chapterName}

                                allowToModify={allowToModify}
                                setAllowToModify={setAllowToModify}
                                editChapter={editChapter}
                            />
                        </NavLink>

                    ))
                    : <Empty
                        style={{ margin: "0 auto", marginTop: "120px", color: "#8a8d92" }}
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="No Chapters :("
                    />
            }
        </ul >
    )
}

export default memo(ListChapters)