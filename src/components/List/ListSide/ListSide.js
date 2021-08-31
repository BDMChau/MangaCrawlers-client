import React, { memo, useEffect, useState } from 'react';
import "./ListSide.css";
import SkeletonCustom from '../../SkeletonCustom/SkeletonCustom';
import { Typography } from 'antd';
import { NavLink } from 'react-router-dom';
import redirectURI from 'helpers/redirectURI';

function ListSide({ mangas, height, isLoading }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (mangas) {
            setData(mangas)
        }
    }, [mangas || height])



    return (
        <ul className="list-side list-with-img"
            style={
                { height: isLoading ? "415px" : height }} > {
                isLoading ?
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
                            to={redirectURI.mangaPage_uri(manga.manga_id, manga.manga_name)}
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