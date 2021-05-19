import React, { memo, useEffect, useState } from 'react';
import "./ListChapters.css";
import LoadingCircle from '../../Loading/LoadingCircle/LoadingCircle';
import { Typography } from 'antd';

function ListChapters({ chapters, height }) {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <ul
            className="list-chapter"
            style={{ height: height }}

        >
            {isLoading
                ? <LoadingCircle />
                : chapters.map((chapter, i) => (
                    <li className="list-chapter-item" id={i}>
                        <Typography.Text>{chapter.chapter_name}</Typography.Text>
                        <Typography.Text>{chapter.createdAt}</Typography.Text>
                    </li>
                ))
            }
        </ul>
    )
}

export default memo(ListChapters)