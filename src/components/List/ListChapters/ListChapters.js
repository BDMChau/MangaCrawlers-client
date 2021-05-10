import React, { useEffect } from 'react';
import "./ListChapters.css";
import { NavLink } from 'react-router-dom';

export default function ListChapters({ listData, height }) {

    return (
        <ul className="list-chapter" style={{ height: height }}>
            {listData.map((val, i) => (
                <li className="list-chapter-item" id={i}>
                        {val}
                </li>
            ))}
        </ul>
    )
}
