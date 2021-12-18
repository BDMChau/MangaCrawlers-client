import React, { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd';
import ImgDragging from './components/ImgDragging';
import "./EditChapter.css"

export default function EditChapter({ imgs, setImgs, chapterInfo, setImgsModified }) {
    const [imgsUrl, setImgsUrl] = useState([]);

    const [width, setWidth] = useState(200);



    useEffect(() => {
        if (imgs.length) {
            const urls = imgs.map((img, i) => img.img_url)
            setImgsUrl(urls)
        }
    }, [imgs])



    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (destination.draggableId === source.draggableId && destination.index === source.index) return;

        const copiedImgs = Array.from(imgs);
        const imgDragging = copiedImgs[source.index];

        copiedImgs.splice(source.index, 1);
        copiedImgs.splice(destination.index, 0, imgDragging); // insert new

console.log(copiedImgs)
        setImgs(copiedImgs);
    }


    return (
        <div className="editchapter-cont">
            <DragDropContext onDragEnd={onDragEnd}>
                <ImgDragging imgs={imgs} />
            </DragDropContext>
        </div >
    )
}
