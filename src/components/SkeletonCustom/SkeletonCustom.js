import React from 'react'
import { Skeleton } from 'antd';

export default function SkeletonCustom({ paragraphRows }) {
    return (
        <Skeleton
            active
            avatar
            title
            paragraph={{ rows: paragraphRows }}
        />
    )
}
