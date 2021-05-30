import React, { useEffect, useState } from "react";
import App from './App'

export default function AppService() {
    const [isVisibleScrollTopBtn, setIsVisibleScrollTopBtn] = useState(Boolean)
    const [scrollYPosition, setScrollYPosition] = useState(0)

    useEffect(() => {
        window.addEventListener("scroll", (e) => handleScroll(e));
        return () => window.removeEventListener("scroll", (e) => handleScroll(e))
    }, [])

    const handleScroll = () => {
        if (window.scrollY === 0) {
            setIsVisibleScrollTopBtn(false);
        } else {
            setIsVisibleScrollTopBtn(true);
        }

        if (window.scrollY <= 100) {
            setScrollYPosition(false);
        } else {
            setScrollYPosition(true)
        }
    }


    return (
        <App
            isVisibleScrollTopBtn={isVisibleScrollTopBtn}
            scrollYPosition={scrollYPosition}
        />
    )
}
