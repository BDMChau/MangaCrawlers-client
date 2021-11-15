import React, { useEffect } from "react";
import App from './App'
import { SET_SCROLL_TOP, SET_SCROLL_BOTTOM } from "../store/features/stuffs/StuffsSlice";
import { useDispatch } from 'react-redux';

export default function AppService() {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(SET_SCROLL_BOTTOM(false));
        dispatch(SET_SCROLL_TOP(false));

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleScroll = () => {
        const body = document.body;
        const html = document.documentElement;

        const currentPos = window.scrollY;
        const windowHeight = "innerHeight" in window ? window.innerHeight : html.offsetHeight;

        const documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.scrollY;

        
        // scroll at bottom
        let tempBottom = false;
        if (windowBottom >= (documentHeight - 50)) tempBottom = true;

        setTimeout(() => {
            dispatch(SET_SCROLL_BOTTOM(tempBottom));
            tempBottom = false;
        }, 100);


        let tempTop = true;
        if (currentPos <= 100) tempTop = false;

        setTimeout(() => {
            dispatch(SET_SCROLL_TOP(tempTop));
            tempTop = true;
        }, 100);
    }


    return (
        <App
        />
    )
}
