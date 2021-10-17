import React from 'react'
import "./LoadingCircle.css"
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function LoadingCircle({ width, height, fontSizeIcon, fontSizeText }) {

    return (
        <div className="loading-circle" style={{ width: width, height: height }}>
            <svg viewBox="25 25 50 50">
                <circle cx="50" cy="50" r="20"></circle>
            </svg>
        </div>
    )
}