import React, { useEffect, useState } from "react";
import App from './App'
import { SET_SCROLL_FIXED_DROPDOWN_CHAPTER_PAGE } from "../store/features/stuffs/StuffsSlice";
import { useDispatch } from 'react-redux';

export default function AppService() {
    const [isVisibleScrollTopBtn, setIsVisibleScrollTopBtn] = useState(Boolean)
    const dispatch = useDispatch();


    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleScroll = () => {
        let currentPos = window.scrollY;
        let temp = true;

        if (currentPos <= 100) {
            temp = false;
        }

        setTimeout(() => {
            setIsVisibleScrollTopBtn(temp);
            dispatch(SET_SCROLL_FIXED_DROPDOWN_CHAPTER_PAGE(true));

            temp = true;
        }, 200);
    }


    return (
        <App
            isVisibleScrollTopBtn={isVisibleScrollTopBtn}
        />
    )
}
