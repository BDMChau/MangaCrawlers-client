import React, { useEffect, useState } from 'react';
import "./ListSide.css";
import { NavLink } from 'react-router-dom';

export default function ListSide({ listData, height }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (listData) {
            listData.length = 5;
            setData(listData)
        }
    }, [listData || height])


    return (
        <ul className="list-side list-with-img" style={{ height: height }}>
            {listData.map((val, i) => (
                <li className="list-side-item" id={i}>
                    <div className="item-img">
                        <div className="img" style={{ backgroundImage: `url(https://images.hdqwalls.com/download/anime-scenery-field-4k-9j-1920x1080.jpg)` }} ></div>
                    </div>
                    <div className="item-title">
                        <NavLink to="/manga/id" className="link">
                            {val}
                        </NavLink>
                        <p>400000 views</p>
                    </div>
                </li>
            ))
            }
        </ul >
    )
}
