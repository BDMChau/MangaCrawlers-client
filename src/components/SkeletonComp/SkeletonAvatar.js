import React from 'react'
import { Skeleton } from 'antd'
import "./SkeletonComp.css"

export default function SkeletonAvatar({ state }) {
    return (
        <Skeleton
            avatar={{ active: "active", size: "large", shape: "circle" }}
            title={{ width: "70%" }}
            paragraph={{ rows: 5, width: "90%" }}
            className="skeleton-input"
            active
            loading={state}
        />
    )
}
