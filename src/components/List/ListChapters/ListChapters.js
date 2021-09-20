import React, { memo, useState } from 'react';
import "./ListChapters.css";
import LoadingCircle from '../../Loading/LoadingCircle/LoadingCircle';
import { Empty, Input, Typography, Button, Tooltip, Popconfirm } from 'antd';
import { NavLink } from 'react-router-dom';
import redirectURI from 'helpers/redirectURI';
import { CloseOutlined } from '@ant-design/icons';

function ListChapters({ chapters, mangaId, mangaName, height, isModify, setChapterId, setChapterName, removeChapter }) {
    const [isLoading] = useState(false)
    const [isRemoving, setIsRemoving] = useState(false)


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
                            {isModify
                                ? <>
                                    <Input
                                        className="input-modify"
                                        defaultValue={chapter.chapter_name}
                                        onClick={() => { setChapterId(chapter.chapter_id); setChapterName(chapter.chapter_name) }}
                                        onChange={(e) => setChapterName(e.target.value)}
                                    />
                                </>
                                : <>
                                    <Typography.Text style={{ width: "65%", overflow: "hidden", textOverflow: "ellipsis" }}>{chapter.chapter_name}</Typography.Text>

                                    <div>
                                        <Typography.Text>{chapter.createdAt}</Typography.Text>

                                        <Popconfirm
                                            title="Are you sure to delete this chapter?"
                                            onConfirm={() => { removeChapter(chapter.chapter_id); setIsRemoving(false) }}
                                            okText="Confirm"
                                            cancelText="Cancle"
                                        >
                                            <Button
                                                title="Delete Chapter"
                                                style={{ borderRadius: "3px", height: "40px", width: "35px", marginLeft: "3px" }}
                                                type="danger"
                                                icon={<CloseOutlined style={{ fontSize: "16px" }} />}
                                                onClick={() => setIsRemoving(true)}
                                            >
                                            </Button>
                                        </Popconfirm>
                                    </div>
                                </>

                            }
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