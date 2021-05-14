import React from 'react'
import "./SkeletonCustom.css"
import { Skeleton } from 'antd';

export default function SkeletonCustom({ paragraphRows, avatarShape }) {
    return (
        <Skeleton
            active
            avatar={{ shape: avatarShape }}
            title
            paragraph={{ rows: paragraphRows }}
        />
    )
}
