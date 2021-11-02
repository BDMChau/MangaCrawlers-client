import React, { memo, useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TopNav from './TopNav'
import { LOGOUT } from "../../store/features/user/UserSlice";
import { message_success } from '../toast/message';
import { GET_ALL_GENRES } from '../../store/features/manga/MangaSlice';
import { GET_ALL_CATEGORIES } from '../../store/features/forum/ForumSlice';
import Cookies from 'universal-cookie';
import { socketActions } from 'socket/socketClient';


function NavbarService() {
    const userState = useSelector((state) => state.userState);
    const genresState = useSelector(state => state.mangaState[2]);
    const dispatch = useDispatch();

    const [genres, setGenres] = useState([])

    const cookies = new Cookies();


    useEffect(() => {
        dispatch(GET_ALL_GENRES());
        dispatch(GET_ALL_CATEGORIES());
    }, [])

    useEffect(() => {
        if (genresState) setGenres(genresState);
    }, [genresState])


    useEffect(() => {
        window.addEventListener("beforeunload", (e) => {
            if (userState[0]) socketActions.updateSocketId(userState[0].user_id, true);
            return;
        });
    }, [])

    const handleLogOut = () => {
        cookies.remove("user", { path: '/' });
        cookies.remove("token", { path: '/' });
        socketActions.updateSocketId(userState[0].user_id, true);

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