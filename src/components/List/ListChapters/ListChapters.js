import React, { memo, useState } from 'react';
import "./ListChapters.css";
import LoadingCircle from '../../Loading/LoadingCircle/LoadingCircle';
import { Empty, Input, Typography, Button, Popconfirm, Menu, Dropdown } from 'antd';
import { NavLink } from 'react-router-dom';
import redirectURI from 'helpers/redirectURI';
import { CloseOutlined, DownOutlined } from '@ant-design/icons';
import Item from './Item';

function ListChapters({ chapters, mangaId, mangaName, height, editChapter, removeChapter }) {
    const [isLoading] = useState(false)
    const [isRemoving, setIsRemoving] = useState(false)


    const [isModifyChapter, setIsModifyChapter] = useState(false);

    const [chapterId, setChapterId] = useState(0);
    const [chapterName, setChapterName] = useState("");


    const menuDropDown = (
        <Menu>
            <Menu.Item style={{ color: "#1890FF" }} onClick={() => setIsModifyChapter(true)}>
                Modify
            </Menu.Item>

            <Menu.Item style={{ color: "#FF4D4F" }} onClick={() => setIsRemoving(true)} >
                <Popconfirm
                    title="Are you sure to delete this chapter?"
                    onConfirm={() => { removeChapter(chapterId); setIsRemoving(false); }}
                    okText="Confirm"
                    cancelText="Cancle"
                >
                    Delete
                </Popconfirm>
            </Menu.Item>
        </Menu>
    );


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
                            to={isRemoving || isModifyChapter ? "#" : redirectURI.chapterPage_uri(mangaId, mangaName, chapter.chapter_id, chapter.chapter_name)}
                        >

                            <Item
                                chapter={chapter}

                                chapterId={chapterId}
                                setChapterId={setChapterId}
                                chapterName={chapterName}
                                setChapterName={setChapterName}

                                menuDropDown={menuDropDown}
                                isModifyChapter={isModifyChapter}
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