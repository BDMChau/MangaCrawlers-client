import React from 'react'
import { Skeleton } from 'antd'
import "./SkeletonComp.css"

export default function SkeletonParagragh({ state }) {
    return (
        <Skeleton
            title={false}
            paragraph={{ rows: 4, width: "100%" }}
            className="skeleton-input"
            active
            loading={state}
        />
    )
}
