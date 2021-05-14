import React,{useEffect} from 'react'
import { useLocation } from 'react-router'
import SearchingPage from './SearchingPage';

export default function SearchingPageService() {
    const query = new URLSearchParams(useLocation().search);


    useEffect(() => {
        console.log(query.get("v"))
    }, [])


    return (
        <div>
            <SearchingPage/>
        </div>
    )
}
