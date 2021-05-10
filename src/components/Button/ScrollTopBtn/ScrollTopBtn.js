import React from 'react'
import "./ScrollTop.css"
import { Button } from 'antd'
import { UpOutlined } from '@ant-design/icons';

export default function ScrollTopBtn() {


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <Button
            className="scroll-top-btn"
            onClick={() => scrollToTop()}>
            <UpOutlined style={{ fontSize: "17px", fontWeight: "800" }} />
        </Button>
    )
}
