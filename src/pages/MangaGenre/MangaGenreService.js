import React, { useEffect } from 'react'
import MangaGenre from './MangaGenre'
import { useLocation } from 'react-router'


export default function MangaGenreService() {
    const query = new URLSearchParams(useLocation().search);


    useEffect(() => {
        console.log(query.get("v"))
    }, [])

    return (
        <div>
            <MangaGenre />
        </div>
    )
}
