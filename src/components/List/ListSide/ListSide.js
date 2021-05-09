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
                    <img className="img" src="https://d2skuhm0vrry40.cloudfront.net/2017/articles/1/8/8/6/9/8/2/nier-automata-review-1488239185358.jpg/EG11/thumbnail/750x422/format/jpg/quality/60" alt="" />
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
