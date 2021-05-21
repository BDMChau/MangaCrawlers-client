import React from 'react'
import "./SkeletonCustom.css"
import { Skeleton } from 'antd';

export default function SkeletonCustom({ paragraphRows, avatar, avatarShape }) {
    return (
        <Skeleton
            active
            avatar={avatar ? { shape: avatarShape } : false}
            title
            paragraph={{ rows: paragraphRows }}
        />
    )
}
