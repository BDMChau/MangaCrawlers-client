import React, { memo, useEffect, useState } from 'react'
import "../Chapter.css"

import { Col, Image, Skeleton } from 'antd';
import LazyLoad from 'react-lazyload';
import chapterApi from 'api/apis/MainServer/chapterApi';
import smoothscroll from 'smoothscroll-polyfill';


function ImgsChapter({ mangaId, chapterId, chapterName }) {
    const [isLoading, setIsLoading] = useState(false)
    const [imgs, setImgs] = useState([])


    useEffect(() => {
        smoothscroll.polyfill();
        window.scroll({
            top: 0,
            behavior: "smooth"
        });
    }, [imgs])


    useEffect(() => {
        if (chapterId && mangaId) {
            getImgsChapter(mangaId, chapterId);
        }
    }, [chapterId, mangaId])


    const getImgsChapter = async (mangaId, chapterId) => {
        setIsLoading(true);
        const data = {
            manga_id: mangaId.toString(),
            chapter_id: chapterId.toString()
        }

        try {
            const response = await chapterApi.getChapterImgs(data)
            if (response.content.err) {
                setImgs([]);
                setChapters([]);


                message_warning("No chapter to present!", 3)
                setIsLoading(false)
                return;
            }
            const chapterInfo = response.content.chapterInfo;
            const imgs = response.content.listImg;

            setImgs(imgs)
            setIsLoading(false)
            return;
        } catch (err) {
            console.log(err)
        }
    }


    const Loading = () => (
        <div className="spinner-lazyloading" style={{ height: "100" }}>
        </div>
    );

    const renderSkeleton = () => (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Skeleton
                active
                className="skeleton-img"
                paragraph={{ rows: 0 }}
            />
            <Skeleton
                active
                className="skeleton-img"
                paragraph={{ rows: 0 }}
            />
            <Skeleton
                active
                className="skeleton-img"
                paragraph={{ rows: 0 }}
            />
            <Skeleton
                active
                className="skeleton-img"
                paragraph={{ rows: 0 }}
            />
            <Skeleton
                active
                className="skeleton-img"
                paragraph={{ rows: 0 }}
            />
        </div>
    )

    return (
        <>
            {isLoading
                ? renderSkeleton()
                : imgs.map((img, i) => (
                    <LazyLoad
                        key={i}
                        placeholder={<Loading />}
                        height={500}
                    >
                        <div className="page" id={`page_${img.img_id}`}>
                            <Image preview={false} className="img" id={img.img_id} src={img.img_url} alt="" />
                        </div>
                    </LazyLoad>
                ))
            }
        </>
    )
}

export default memo(ImgsChapter);
