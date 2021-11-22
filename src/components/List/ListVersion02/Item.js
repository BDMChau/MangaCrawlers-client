import React, { useState, useEffect } from 'react'
import { Button, Col, Empty, Image, List, Popconfirm, Typography } from 'antd'

import "./ListVersion02.css"
import Rating from "../../Rating/Rating"
import { NavLink } from 'react-router-dom'
import { DeleteOutlined } from "@ant-design/icons"
import redirectURI from 'helpers/redirectURI'
import TransitionAnimate from 'components/Animation/transition'
import { format } from 'helpers/format'


export default function Item({ item, handleDeleteManga, IsLoadingDelete, disableActions, type }) {
    const [manga, setManga] = useState({})


    useEffect(() => setManga(item), [item])


    const handleRemoveItem = async (id) => {
        const res = await handleDeleteManga(id);
        if (res === true) setManga({});
    }


    return (
        Object.keys(manga).length
            ? <TransitionAnimate
                transitionTime={0.1}
                renderPart={
                    <div className="item">
                        <NavLink to={manga.isProject ? redirectURI.projectMangaPage_uri(manga.manga_id) : redirectURI.mangaPage_uri(manga.manga_id, manga.manga_name)} className="item-img">
                            <Image
                                className="img"
                                src={manga.thumbnail}
                                alt=""
                                preview={false}
                            />
                        </NavLink>
                        <div className="item-title">
                            <div className="item-manga">
                                <Typography.Title className="manga-name" level={5} title={manga.manga_name} >{manga.manga_name}</Typography.Title>
                                <Typography.Text className="author-name" title={manga.author}>{manga.author}</Typography.Text>
                                <Typography.Text title="views">{manga.views ? manga.views : 0} view(s)</Typography.Text>
                                <Typography.Text title="status" style={{ color: manga.status === "Completed" ? "#52c41a" : "#189cfc" }}>
                                    {manga.status ? manga.status : ""}
                                </Typography.Text>
                                <div style={{ pointerEvents: "none" }} >
                                    <Rating stars={manga.stars} hideText={true} />
                                </div>

                            </div>

                            <div className="item-chapter">
                                <Typography.Text className="chapter-name" title={manga.chapter_name}> {manga.chapter_name ? manga.chapter_name : ""}</Typography.Text>

                                <Typography.Text
                                    style={{ fontStyle: "italic" }}
                                    className="created-at"
                                    title={type === 1 ? format.formatDate02(manga.manga_created_at) : format.formatDate02(manga.reading_History_time)}
                                >
                                    {type === 1 ? format.relativeTime(manga.manga_created_at) : format.relativeTime(manga.reading_History_time)}
                                </Typography.Text>


                                {disableActions
                                    ? ""
                                    : <div className="item-action">
                                        <Popconfirm
                                            title="Are you sure to remove this manga?"
                                            onConfirm={() => handleRemoveItem(manga.manga_id)}
                                            onCancel={"cancel"}
                                            okText="Remove"
                                            cancelText="Cancle"
                                        >
                                            <Button
                                                type="text"
                                                icon={<DeleteOutlined />}
                                                style={{ borderRadius: "50%" }} />
                                        </Popconfirm>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }
            />
            : ""
    )
}
