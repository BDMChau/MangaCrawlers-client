import React, { useEffect } from 'react';
import "./ListManga.css";
import { NavLink } from 'react-router-dom';

export default function ListChapters({ listData, height }) {

    return (
        <ul className="list" style={{ height: height }}>
            {listData.map((val, i) => (
                <li className="list-item" id={i}>
                    <NavLink to="/manga/id" className="link">
                        {val}
                    </NavLink>
                </li>
            ))}
        </ul>
    )
}
