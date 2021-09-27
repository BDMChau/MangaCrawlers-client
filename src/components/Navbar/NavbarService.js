import React, { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TopNav from './TopNav'
import Cookies from 'universal-cookie';
import { LOGOUT } from "../../store/features/user/UserSlice";
import { message_success } from '../notifications/message';
import { GET_ALL_GENRES } from '../../store/features/manga/MangaSlice';
import { socket } from 'socket/socketClient';
import EVENTS_NAME from 'socket/features/eventsName';

function NavbarService() {
    const dispatch = useDispatch();
    const genresState = useSelector(state => state.mangaState[2])

    const [genres, setGenres] = useState([])
    const cookies = new Cookies();


    // socket
    useEffect(() => {
        socket.on(EVENTS_NAME.FROM_SERVER_TO_SPECIFIC_USERS, (result) => {
            console.log(result)
        });
    }, []);


    useEffect(() => {
        dispatch(GET_ALL_GENRES());
    }, [])


    useEffect(() => {
        if(genresState){
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