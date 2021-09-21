import React, { useState } from 'react'
import "./ListChapters.css"

import { Dropdown, Input, Popconfirm, Typography, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons'
import redirectURI from 'helpers/redirectURI';

export default function RenderChapters({ chapters, mangaId, mangaName, editChapter }) {
    const [isModifyChapter, setIsModifyChapter] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false)

    const [chapterId, setChapterId] = useState(0);
    const [chapterName, setChapterName] = useState("");


    const menuDropDown = (
        <Menu>
            <Menu.Item style={{ color: "#1890FF" }} onClick={() => {}}>
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
        chapters.map((chapter, i) => (
            <NavLink
                key={i}
                title={chapter.chapter_name}
                className="list-chapter-item" id={chapter.chapter_id}
                to={isRemoving || isModifyChapter ? "#" : redirectURI.chapterPage_uri(mangaId, mangaName, chapter.chapter_id, chapter.chapter_name)}
            >
                {isModifyChapter
                    ? <>
                        <Input
                            className="input-modify"
                            defaultValue={chapter.chapter_name}
                            onClick={() => { setChapterId(chapter.chapter_id); setChapterName(chapter.chapter_name) }}
                            onChange={(e) => setChapterName(e.target.value)}
                            onKeyUp={(e) => e.key === "Enter" ? editChapter(chapterId, chapterName) : ""}
                        />
                    </>
                    : <>
                        <Typography.Text style={{ width: "65%", overflow: "hidden", textOverflow: "ellipsis" }}>{chapter.chapter_name}</Typography.Text>

                        <div>
                            <Typography.Text>{chapter.createdAt}</Typography.Text>

                            <Dropdown trigger={['click']} overlay={menuDropDown}>
                                <DownOutlined style={{ fontSize: "15px", padding: "5px", color: "#1890FF" }} onClick={() => setChapterId(chapter.chapter_id)} />
                            </Dropdown>
                        </div>
                    </>

                }
            </NavLink>

        ))
    )
}
