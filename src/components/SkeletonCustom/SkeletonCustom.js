import React from 'react'
import { Skeleton } from 'antd';

export default function SkeletonCustom({ paragraphRows }) {
    return (
        <Skeleton
            active
            avatar={{ shape: "square" }}
            title
            paragraph={{ rows: paragraphRows }}
        />
    )
}
