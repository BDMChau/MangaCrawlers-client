import React, { memo, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import TopNav from './TopNav'
import Cookies from 'universal-cookie';
import { LOGOUT } from "../../store/slices/UserSlice";
import genreApi from '../../api/apis/genreApi';
import { message_success } from '../notifications/message';
import { Header } from 'antd/lib/layout/layout';

const cookies = new Cookies()

function NavbarService() {
    const dispatch = useDispatch();
    const [genres, setGenres] = useState([])


    useEffect(() => {
        getAllGenres();
    }, [])

    const handleLogOut = () => {
        cookies.remove("user");
        cookies.remove("token");
        dispatch(LOGOUT())
        message_success("Logged Out!")
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