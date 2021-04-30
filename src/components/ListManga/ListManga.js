import React, { useEffect } from 'react';
import "./ListManga.css";
import { NavLink } from 'react-router-dom';

export default function ListManga({ listData, height }) {

    return (
        <ul className="list list-with-img" style={{ height: height }}>
            {listData.map((val, i) => (
                <li className="list-item" id={i}>
                        <img className="img" src="https://d2skuhm0vrry40.cloudfront.net/2017/articles/1/8/8/6/9/8/2/nier-automata-review-1488239185358.jpg/EG11/thumbnail/750x422/format/jpg/quality/60" alt="" />
                        <NavLink to="/manga/id" className="link">
                            {val}
                        </NavLink>
                </li>
            ))
            }
        </ul >
    )
}
