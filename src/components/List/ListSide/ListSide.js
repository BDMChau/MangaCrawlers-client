import React, { memo, useEffect, useState } from 'react';
import "./ListSide.css";
import SkeletonCustom from '../../SkeletonCustom/SkeletonCustom';
import arrayMethods from '../../../helpers/arrayMethods';
import { useHistory } from 'react-router';
import { Typography } from 'antd';

function ListSide({ mangas, height }) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory();

    useEffect(() => {
        if (mangas) {
            const shuffledList = arrayMethods.shuffle(mangas);
            setData(shuffledList)
        }
    }, [mangas || height])


    const handleClick = (id) => {
        history.push(`/manga/${id}`)
    }


    return (
        <ul className="list-side list-with-img" style={{ height: isLoading ? "415px" : height }}>
            {data.length === 0
                ? <div key="1" style={{ marginTop: "20px"}}>
                    <SkeletonCustom paragraphRows={1} avatarShape={"square"} />
                    <SkeletonCustom paragraphRows={1} avatarShape={"square"} />
                    <SkeletonCustom paragraphRows={1} avatarShape={"square"} />
                    <SkeletonCustom paragraphRows={1} avatarShape={"square"} />
                    <SkeletonCustom paragraphRows={1} avatarShape={"square"} />
                </div>

                : data.map((manga, i) => (
                    <li className="list-side-item" id={i} onClick={() => handleClick(manga.manga_id)} >
                        <div className="item-img">
                            <div className="img" style={{ backgroundImage: `url(${manga.thumbnail})` }} ></div>
                        </div>
                        <div className="item-title">
                            <Typography.Text>{manga.manga_name}</Typography.Text>
                            <Typography.Text>{manga.views} views</Typography.Text>
                        </div>
                    </li>
                ))

            }
        </ul >
    )
}

export default memo(ListSide)