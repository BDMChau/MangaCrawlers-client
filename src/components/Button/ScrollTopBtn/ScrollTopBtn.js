import React, { useState, useEffect } from 'react'
import "./ScrollTop.css"
import { Button } from 'antd'
import { UpOutlined } from '@ant-design/icons';

export default function ScrollTopBtn({ isVisibleProps }) {


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <Button
            className="scroll-top-btn" style={{ opacity: isVisibleProps ? 1 : 0, visibility: isVisibleProps ? 'visible' : 'hidden' }}
            onClick={() => scrollToTop()}>
            <UpOutlined style={{ fontSize: "17px", fontWeight: "800" }} />
        </Button>
    )
}
