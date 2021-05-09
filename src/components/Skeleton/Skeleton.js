import React from 'react'
import { Skeleton } from 'antd';

export default function AAA({ stateStatus }) {
    return (
        <div className="skeleton">
            <Skeleton
                active
                avatar
                loading={stateStatus}
            />
        </div>
    )
}
