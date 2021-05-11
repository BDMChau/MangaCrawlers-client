import React, { useEffect, useState } from 'react';
import "./ListSide.css";
import { NavLink, useHistory } from 'react-router-dom';

export default function ListSide({ listData, height }) {
    const [data, setData] = useState([]);
    const history = useHistory();

    useEffect(() => {
        if (listData) {
            listData.length = 5;
            setData(listData)
        }
    }, [listData || height])


    const handleClick = () => {
        history.push("/manga/1")
    }


    return (
        <ul className="list-side list-with-img" style={{ height: height }}>
            {listData.map((val, i) => (
                <li className="list-side-item" id={i} onClick={() => handleClick()}>
                    <div className="item-img">
                        <div className="img" style={{ backgroundImage: `url(https://images.hdqwalls.com/download/anime-scenery-field-4k-9j-1920x1080.jpg)` }} ></div>
                    </div>
                    <div className="item-title">
                        <a className="link">
                            {val}
                        </a>
                        <p>400000 views</p>
                    </div>
                </li>
            ))
            }
        </ul >
    )
}
