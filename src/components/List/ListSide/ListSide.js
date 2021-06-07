import React, { memo, useEffect, useState } from 'react';
import "./ListSide.css";
import SkeletonCustom from '../../SkeletonCustom/SkeletonCustom';
import { Typography } from 'antd';
import { NavLink } from 'react-router-dom';

function ListSide({ mangas, height }) {
    const [data, setData] = useState([]);
    const [isLoading] = useState(false)

    useEffect(() => {
        if (mangas) {
            setData(mangas)
        }
    }, [mangas || height])





    return (
        <ul className="list-side list-with-img"
            style={
                { height: isLoading ? "415px" : height }} > {
                data.length === 0 ?
                    <div key="1" style={{ marginTop: "20px" }}>
                        <SkeletonCustom paragraphRows={1}
                            avatarShape={"square"}
                        />
                        <SkeletonCustom paragraphRows={1}
                            avatarShape={"square"}
                        />
                        <SkeletonCustom paragraphRows={1}
                            avatarShape={"square"}
                        />
                        <SkeletonCustom paragraphRows={1}
                            avatarShape={"square"}
                        />
                        <SkeletonCustom paragraphRows={1}
                            avatarShape={"square"}
                        />
                    </div>
                    :
                    data.map((manga, i) => (
                            <NavLink
                                key={i}
                                title={manga.manga_name}
                                to={`/manga/${manga.manga_id}`}
                                className="list-side-item"
                            >
                                <div className="item-img" >
                                    <div className="img"
                                        style={{ backgroundImage: `url(${manga.thumbnail})` }} > </div> </div>
                                <div className="item-title" >
                                    <Typography.Text > {manga.manga_name} </Typography.Text>
                                    <Typography.Text > {manga.views ? manga.views : 0} views </Typography.Text>
                                </div>
                            </NavLink>
                    ))

            } </ul >
    )
}

export default memo(ListSide)