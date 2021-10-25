import React, { memo } from 'react'
import "./Chapter.css"
// import LazyLoad from 'react-lazyload';
import { Col, Image, Skeleton } from 'antd';
import LazyLoad from 'react-lazyload';

function ImgsChapter({ imgs, isFixedMenu, isLoading }) {

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
            <Skeleton
                active
                className="skeleton-img"
                paragraph={{ rows: 0 }}
            />
        </div>
    )

    return (
        <Col span={23} xxl={15} className="chapter-pages" style={{ margin: "20px" }}>
            {isLoading
                ? renderSkeleton()
                : imgs.map((img) => (
                    // <LazyLoad
                    //     key={img.img_id}
                    //     placeholder={<Loading />}
                    //     height={500}
                    // >
                        <div className="page" id={`page_${img.img_id}`}>
                            <Image preview={false} className="img" id={img.img_id} src={img.img_url} alt="" />
                        </div>

                    // </LazyLoad>
                ))
            }
        </Col >

    )
}

export default memo(ImgsChapter);
