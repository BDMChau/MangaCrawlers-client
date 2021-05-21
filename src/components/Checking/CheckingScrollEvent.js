import React, { useEffect } from 'react'
import { SET_SCROLL_FIXED_DROPDOWN_CHAPTER_PAGE } from "../../store/slices/StuffsSlice";
import { useDispatch } from 'react-redux';



export default function CheckingScrollEvent({ scrollYPosition }) {
    const dispatch = useDispatch()

    useEffect(() => {
        if (scrollYPosition) {
            dispatch(SET_SCROLL_FIXED_DROPDOWN_CHAPTER_PAGE("true"));
        } else {
            dispatch(SET_SCROLL_FIXED_DROPDOWN_CHAPTER_PAGE("false"));
        }
    }, [scrollYPosition])


    return (
        <div>

        </div>
    )
}
