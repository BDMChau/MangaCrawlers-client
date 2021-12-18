import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Button, Image } from 'antd';


export default function ImgDragging({ imgs }) {
    return (
        <Droppable droppableId={"1"} direction="horizontal" >
            {(provided) => (
                <div
                    className="list-imgs"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {imgs.map((img, i) => (
                        <Draggable key={img.img_id} draggableId={img.img_id.toString()} index={i} >
                            {(provided) => (
                                <div className="item-img"
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                >
                                    <Image src={img.img_url} alt="" />
                                </div>
                            )}
                        </Draggable>
                    ))}

                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}
