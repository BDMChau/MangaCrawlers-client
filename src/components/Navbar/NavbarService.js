import React, { memo, useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TopNav from './TopNav'
import { LOGOUT } from "../../store/features/user/UserSlice";
import { message_success } from '../alerts/message';
import { GET_ALL_GENRES } from '../../store/features/manga/MangaSlice';
import Cookies from 'universal-cookie';


function NavbarService() {
    const dispatch = useDispatch();
    const genresState = useSelector(state => state.mangaState[2]);
    const [genres, setGenres] = useState([])

    const cookies = new Cookies();

   
    useEffect(() => {
        dispatch(GET_ALL_GENRES());
    }, [])




    useEffect(() => {
        if (genresState) {
            setGenres(genresState);
        }
    }, [genresState])



    const handleLogOut = () => {
        cookies.remove("user", { path: '/' });
        cookies.remove("token", { path: '/' });
        setTimeout(() => {
            dispatch(LOGOUT())
            message_success("Logged Out!", 3)
        }, 300)
        return;
    }



    return (
        <TopNav
            handleLogOut={handleLogOut}
            genres={genres}      
        />
    )
}

export default memo(NavbarService)