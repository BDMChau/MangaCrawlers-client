import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import Chapter from './Chapter'

export default function ChapterService() {
    const { id } = useParams();

    useEffect(() => {
        console.log(id)
    }, [])

    return (
        <div>
            <Chapter />
        </div>
    )
}
