import React, { memo, useState } from 'react';
import "./ListChapters.css";
import LoadingCircle from '../../Loading/LoadingCircle/LoadingCircle';
import { Empty, Input, Typography, Button, Tooltip } from 'antd';
import { NavLink } from 'react-router-dom';
import redirectURI from 'helpers/redirectURI';
import { DeleteOutlined } from '@ant-design/icons';

function ListChapters({ chapters, mangaId, mangaName, height, isModify }) {
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
                            to={isModify ? "#" : redirectURI.chapterPage_uri(mangaId, mangaName, chapter.chapter_id, chapter.chapter_name)}
                        >
                            {isModify
                                ? <>
                                    <Input className="input-modify" defaultValue={chapter.chapter_name} />

                                    <Tooltip title="Delete Chapter">
                                        <Button
                                            style={{ borderRadius: "3px", height: "50px", width: "50px" }}
                                            type="danger"
                                            icon={<DeleteOutlined style={{ fontSize: "20px" }} />}
                                        >
                                        </Button>
                                    </Tooltip>
                                </>
                                : <>
                                    <Typography.Text>{chapter.chapter_name}</Typography.Text>
                                    <Typography.Text>{chapter.createdAt}</Typography.Text>
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