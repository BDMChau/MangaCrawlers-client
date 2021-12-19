import React, { useEffect, useState } from 'react'
import { arrayMoveImmutable } from 'array-move';

import "./EditChapter.css"
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Button, Col, Input, Row, Typography } from 'antd';
import { ToolOutlined, SearchOutlined, ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons"


export default function EditChapter({ imgs, setImgs, chapterInfo, setChapterInfo, manga, handleEdit }) {
    const [width, setWidth] = useState(200);


    const handleSubmitChange = () => {
        handleEdit(chapterInfo, imgs);
    }

    useEffect(() => {
        if (width <= 100) setWidth(100);
        else if (width >= 600) setWidth(600);
    }, [width])



    ////////////////////// render //////////////////////
    const SortableItem = SortableElement(({ img }) => (
        <>
            <img className="item-img" src={img.img_url} style={{ width: width }} />
        </>
    ));

    const SortableList = SortableContainer(({ imgs }) => (
        <div className='list-imgs'>
            {imgs.map((img, i) => (
                <SortableItem key={img.img_id} index={i} img={img} />
            ))}
        </div>

    ));

    const onSortEnd = ({ newIndex, oldIndex }) => {
        setImgs(arrayMoveImmutable(imgs, oldIndex, newIndex));
    }

    return (
        <Row justify="center" className="editchapter-cont">
            <Col md={20} xl={20} xs={23} className='manga-info'>
                <img src={manga.thumbnail} style={{ width: "180px" }} />

                <div style={{ display: "flex", flexDirection: "column", marginLeft: "10px" }}>
                    <Typography.Title level={3} >{manga.manga_name}</Typography.Title>
                    <Typography.Title level={5}>Author: {manga.manga_authorName}</Typography.Title>
                    <Typography.Title level={5}>{manga.status}</Typography.Title>
                </div>
            </Col>

            <Col md={20} xl={20} xs={23} className='chapter-info' style={{ margin: "50px 0 0 0" }}>
                <Input
                    addonBefore={"Chapter Name"}
                    title="Chapter Name"
                    value={chapterInfo ? chapterInfo.chapter_name : ""}
                    onChange={(e) => setChapterInfo({ ...chapterInfo, chapter_name: e.target.value })}
                />

                <Input
                    addonBefore={"Chapter Number"}
                    title="Chapter Number"
                    value={chapterInfo ? chapterInfo.chapter_number : ""}
                    onChange={(e) => setChapterInfo({ ...chapterInfo, chapter_number: e.target.value })}
                />

            </Col>

            <Col md={20} xl={20} xs={23} style={{ margin: "10px 0 0 0" }}>
                <SortableList imgs={imgs} onSortEnd={onSortEnd} axis="xy" />
            </Col>

            <Col md={20} xl={20} xs={23} style={{ margin: "20px 0 0 0" }} >
                <Button type='primary' icon={<ToolOutlined />} onClick={handleSubmitChange} >Submit Change</Button>
            </Col>

            <div className='btn-zoom'>
                <Button
                    className="btn-zoom-in"
                    icon={<ZoomInOutlined style={{ fontSize: "22px", marginTop: "3px" }} />}
                    onClick={() => setWidth(width + 100)}
                />

                <Button
                    className="btn-zoom-out"
                    icon={<ZoomOutOutlined style={{ fontSize: "22px", marginTop: "3px" }} />}
                    onClick={() => setWidth(width - 100)}
                />
            </div>
        </Row >
    )
}
