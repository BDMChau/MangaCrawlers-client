import React, { memo, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import TopNav from './TopNav'
import Cookies from 'universal-cookie';
import { LOGOUT } from "../../store/slices/UserSlice";
import genreApi from '../../api/apis/genreApi';
import { message_success } from '../notifications/message';

function NavbarService() {
    const dispatch = useDispatch();
    const [genres, setGenres] = useState([])
    const cookies = new Cookies()

    useEffect(() => {
        getAllGenres();
    }, [])

    const handleLogOut = () => {
        cookies.remove("user", { path: '/' });
        cookies.remove("token", { path: '/' });
        setTimeout(() => {
            dispatch(LOGOUT())
            message_success("Logged Out!", 3)
        }, 300)
        return;
    }

    const getAllGenres = async () => {
        try {
            const response = await genreApi.getAll();
            if (response.content.err) {
                return;
            }

            setGenres(response.content.genres);
            return;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TopNav
            handleLogOut={handleLogOut}
            genres={genres}
        />
    )
}

export default memo(NavbarService)