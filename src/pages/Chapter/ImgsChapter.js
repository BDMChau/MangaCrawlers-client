import React, { memo } from 'react'
import "./Chapter.css"
import LazyLoad from 'react-lazyload';
import { Col, Image, Skeleton } from 'antd';

function ImgsChapter({ imgs, isFixedMenu, isLoading }) {

    const Spinner = () => (
        <div className="spinner-lazyloading">
            <svg
                width="80"
                height="80"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
            >
                <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    stroke="none"
                    strokeWidth="0"
                    r="35"
                    strokeDasharray="164.93361431346415 56.97787143782138"
                    transform="rotate(275.845 50 50)"
                >
                    <animateTransform
                        attributeName="transform"
                        type=""
                        calcMode="linear"
                        values="0 50 50;360 50 50"
                        keyTimes="0;1"
                        dur="1s"
                        begin="0s"
                        repeatCount="indefinite"
                    />
                </circle>
            </svg>
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
        <Col span={23} xxl={15} className="chapter-pages" style={{ margin: isFixedMenu === "true" ? "170px 0" : "70px 0" }}>
            { isLoading
                ? renderSkeleton()
                : imgs.map((img) => (
                    // <LazyLoad
                    //     key={img.img_id}
                    //     placeholder={<Spinner />}
                    //     height={500}
                    // >
                    <div className="page" id={`page_${img.img_id}`}>
                        <Image className="img" id={img.img_id} src={img.img_url} alt="" />
                    </div>

                    // </LazyLoad>
                ))
            }
        </Col >

    )
}

export default memo(ImgsChapter);
