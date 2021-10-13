import React, { memo, useState } from 'react';
import "./ListChapters.css";
import LoadingCircle from '../../Loading/LoadingCircle/LoadingCircle';
import { Empty, List } from 'antd';
import { NavLink } from 'react-router-dom';
import redirectURI from 'helpers/redirectURI';
import Item from './Item';

function ListChapters({ chapters, mangaId, mangaName, height, editChapter, removeChapter }) {
    const [isLoading] = useState(false)
    const [isRemoving, setIsRemoving] = useState(false); // not just delete status, use this to control NavLink to="..."

    const [chapterId, setChapterId] = useState(0);
    const [chapterName, setChapterName] = useState("");

    const [allowToModify, setAllowToModify] = useState(true);

    const [pageNumber, setPageNumber] = useState(1)



    return (
        <div className="list-chapter">
            {isLoading
                ? <LoadingCircle />
                : chapters.length
                    ? <List
                        itemLayout="vertical"
                        size="large"
                        pagination={
                            {
                                onChange: (pageNumber) => {
                                    setPageNumber(pageNumber);
                                },
                                pageSize: 12,
                                defaultCurrent: 1,
                                current: pageNumber,
                                total: chapters.length,
                                showQuickJumper: true
                            }
                        }
                        dataSource={chapters}
                        footer={false}
                        renderItem={
                            (chapter, i) => (
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

                            )
                        }
                    />



                    // chapters.map((chapter, i) => (

                    // ))
                    : <Empty
                        style={{ margin: "0 auto", marginTop: "120px", color: "#8a8d92" }}
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="No Chapters :("
                    />
            }
        </div >
    )
}

export default memo(ListChapters)