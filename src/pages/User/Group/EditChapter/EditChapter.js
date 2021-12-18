import React, { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd';
import ImgDragging from './components/ImgDragging';
import { arrayMoveImmutable } from 'array-move';

import "./EditChapter.css"
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Col, Image, Row } from 'antd';


export default function EditChapter({ imgs, setImgs, chapterInfo, setImgsModified }) {

    const [width, setWidth] = useState(200);




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
            <Col md={20} xl={20} xs={23} className='chapter-info'>
             
            </Col>

            <Col md={20} xl={20} xs={23} >
                <SortableList imgs={imgs} onSortEnd={onSortEnd} axis="xy" />
            </Col>
        </Row >
    )
}
