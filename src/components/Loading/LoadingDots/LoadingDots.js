import React from 'react'
import "./LoadingDots.css"

export default function LoadingDots({ width, height }) {
    return (
        <div className="loading">
            <span className="loading__pill" style={{ width: width, height: height }} ></span>
            <span className="loading__pill" style={{ width: width, height: height }}></span>
            <span className="loading__pill" style={{ width: width, height: height }}></span>
        </div>
    )
}
