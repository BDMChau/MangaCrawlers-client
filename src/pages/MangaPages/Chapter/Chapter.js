import React from 'react'
import "./Chapter.css"
import ImgsChapter from './components/ImgsChapter';
import { Col, Row } from 'antd'

import ChapterNavbar from './components/ChapterNavbar';



function Chapter({
    chapterId,
    chapterName,

    mangaId,

    addToFollowingManga,
    removeFollowingManga,
    isLoadingAddFollow,
    isFollowed,
    addReadingHistory,
}) {

    return (
        <Row justify={"center"} className="chapter">
            <ChapterNavbar
                chapterName={chapterName}

                mangaId={mangaId}
                chapterId={chapterId}

                isLoadingAddFollow={isLoadingAddFollow}
                isFollowedProp={isFollowed}

                addReadingHistory={addReadingHistory}
                addToFollowingManga={addToFollowingManga}
                removeFollowingManga={removeFollowingManga}
            />

            <Col className="chapter-pages" style={{ margin: "20px" }}>
                <ImgsChapter
                    mangaId={mangaId}
                    chapterId={chapterId}
                />
            </Col >

        </Row >
    )
}

export default Chapter;