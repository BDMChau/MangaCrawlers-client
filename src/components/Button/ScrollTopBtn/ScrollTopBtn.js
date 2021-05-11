import React, { useState, useEffect } from 'react'
import "./ScrollTop.css"
import { Button } from 'antd'
import { UpOutlined } from '@ant-design/icons';

export default function ScrollTopBtn({ currentScrollY }) {
    const [isScroll, setIsScroll] = useState(Boolean)

    useEffect(() => {
        if (currentScrollY === 0) {
            setIsScroll(false)
        } else {
            setIsScroll(true)
        }
    }, [currentScrollY])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <Button
            className="scroll-top-btn" style={{ opacity: isScroll ? 1 : 0, visibility: isScroll ? 'visible' : 'hidden' }}
            onClick={() => scrollToTop()}>
            <UpOutlined style={{ fontSize: "17px", fontWeight: "800" }} />
        </Button>
    )
}
