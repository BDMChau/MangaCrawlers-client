import React, { useEffect } from 'react'
import { useLocation } from 'react-router';
import MangaGenre from './MangaGenre'

export default function MangaGenreService() {

    const query = new URLSearchParams(useLocation().search);


    useEffect(() => {
        console.log(query.get("v"))
    }, [])

    return (
        <div>
            <MangaGenre/>
        </div>
    )
}
