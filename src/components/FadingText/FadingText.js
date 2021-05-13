import React, { useState } from 'react'
import "./FadingText.css"
import { RightOutlined } from "@ant-design/icons"
import { Button } from 'antd'
import { NavLink } from 'react-router-dom'

export default function FadingText({ content }) {
    const [isExpand, setIsExpand] = useState(false)

    return (
        <section className="fading-text">
            <div className={isExpand ? "text expanded" : "text"}>
                <q>{content}</q>
            </div>
            <NavLink to="#" className="btn" onClick={() => setIsExpand(!isExpand)}>
                More <RightOutlined style={{ fontSize: "14px" }} />
            </NavLink>
        </section>
    )
}
