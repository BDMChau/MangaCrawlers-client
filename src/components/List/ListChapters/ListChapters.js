import React, { useEffect, useState } from 'react';
import "./ListChapters.css";
import LoadingCircle from '../../Loading/LoadingCircle/LoadingCircle';

export default function ListChapters({ listData, height }) {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <ul
            className="list-chapter"
            style={{ height: height }}

        >
            {isLoading
                ? <LoadingCircle />
                : listData.map((val, i) => (
                    <li className="list-chapter-item" id={i}>
                        {val}
                    </li>
                ))
            }
        </ul>
    )
}
