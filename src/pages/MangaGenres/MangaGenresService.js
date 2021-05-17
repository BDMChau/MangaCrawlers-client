import React, { useEffect } from 'react'
import MangaGenres from './MangaGenres'
import { useLocation } from 'react-router'


export default function MangaGenresService() {
    const query = new URLSearchParams(useLocation().search);


    useEffect(() => {
        console.log(query.get("v"))
    }, [])

    return (
        <div>
            <MangaGenres />
        </div>
    )
}
