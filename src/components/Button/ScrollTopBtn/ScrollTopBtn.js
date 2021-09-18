import React from 'react';
import "./ScrollTop.css";
import { Button } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import smoothscroll from 'smoothscroll-polyfill';
import { useSelector } from 'react-redux';

export default function ScrollTopBtn() {
    const stuffsState = useSelector(state => state.stuffsState);

    
    const scrollToTop = () => {
        smoothscroll.polyfill();
        window.scroll({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <Button
            title="Scroll to Top"
            className="scroll-top-btn" style={{ opacity: stuffsState[0] ? 1 : 0, visibility: stuffsState[0] ? 'visible' : 'hidden' }}
            onClick={() => scrollToTop()}
        >
            <UpOutlined style={{ fontSize: "17px", fontWeight: "800" }} />
        </Button>
    );
}
