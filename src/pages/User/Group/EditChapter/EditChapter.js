import React, { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd';
import ImgDragging from './components/ImgDragging';
import { arrayMoveImmutable } from 'array-move';

import "./EditChapter.css"
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Button, Col, Image, Row } from 'antd';
import { ToolOutlined } from "@ant-design/icons"

export default function EditChapter({ imgs, setImgs, chapterInfo, manga, handleEdit }) {

    const [width, setWidth] = useState(200);



    const handleSubmitChange = () => {
        handleEdit(chapterInfo, imgs);
    }


    ////////////////////// render //////////////////////
    const SortableItem = SortableElement(({ img }) => (
        <>
            <img className="item-img" src={img.img_url} />
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

            </Col>

            <Col md={20} xl={20} xs={23} className='chapter-info'>

            </Col>

            <Col md={20} xl={20} xs={23} >
                <SortableList imgs={imgs} onSortEnd={onSortEnd} axis="xy" />
            </Col>

            <Button icon={<ToolOutlined />} onClick={handleSubmitChange} >Submit Change</Button>
        </Row >
    )
}
