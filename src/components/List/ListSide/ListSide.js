import React, { memo, useEffect, useState } from 'react';
import "./ListSide.css";
import SkeletonCustom from '../../SkeletonCustom/SkeletonCustom';
import arrayMethods from '../../../helpers/arrayMethods';
import { useHistory } from 'react-router';
import { Typography } from 'antd';
import { NavLink } from 'react-router-dom';

function ListSide({ mangas, height }) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory();

    useEffect(() => {
        console.log(mangas)
        if (mangas) {
            const shuffledList = arrayMethods.shuffle(mangas);
            if (shuffledList.length > 5) {
                shuffledList.length = 5
            }

            setData(shuffledList)
        }
    }, [mangas || height])





    return (
        <ul className="list-side list-with-img"
            style={
                { height: isLoading ? "415px" : height }} > {
                data.length === 0 ?
                    < div key="1"
                        style={
                            { marginTop: "20px" }} >
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
                            to={`/manga/${manga.manga_id}`}
                            className="list-side-item"
                            id={i}
                        >
                            <div className="item-img" >
                                <div className="img"
                                    style={
                                        { backgroundImage: `url(${manga.thumbnail})` }} > </div> </div>
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