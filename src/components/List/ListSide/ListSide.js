import React, { useEffect, useState } from 'react';
import "./ListSide.css";
import { Skeleton } from "antd";
import { NavLink, useHistory } from 'react-router-dom';
import LoadingCircle from '../../Loading/LoadingCircle/LoadingCircle';
import SkeletonCustom from '../../SkeletonCustom/SkeletonCustom';
import { round } from 'lodash';

export default function ListSide({ listData, height }) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
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
        <ul className="list-side list-with-img" style={{ height: isLoading ? "415px" : height }}>
            {isLoading
                ? <div style={{ marginTop: "20px" }}>
                    <SkeletonCustom paragraphRows={1} avatarShape={"square"} />
                    <SkeletonCustom paragraphRows={1} avatarShape={"square"} />
                    <SkeletonCustom paragraphRows={1} avatarShape={"square"} />
                    <SkeletonCustom paragraphRows={1} avatarShape={"square"} />
                   
                </div>
                : listData.map((val, i) => (
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
