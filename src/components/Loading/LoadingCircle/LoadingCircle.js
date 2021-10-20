import React from 'react'
import "./LoadingCircle.css"
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function LoadingCircle({ width, height, fontSizeIcon, fontSizeText }) {

    return (
        <div className="loading-circle" style={{ width: width, height: height }}>
            <div className="loading">

            </div>
        </div>
    )
}