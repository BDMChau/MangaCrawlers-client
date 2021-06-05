import React from 'react'
import "./LoadingCircle.css"
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function LoadingCircle({ width, height, fontSizeIcon, fontSizeText }) {

    return (
        <div className="loading-circle" style={{ width: width, height: height }}>
            <Spin
                className="circle"
                style={{ fontSize: fontSizeText }}
                indicator={<LoadingOutlined style={{ fontSize: fontSizeIcon, color: "#52606fc7" }} />}
                tip="Loading..."
            />
        </div>
    )
}