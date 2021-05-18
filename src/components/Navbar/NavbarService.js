import React, { memo } from 'react'
import { useDispatch } from 'react-redux';
import TopNav from './TopNav'
import Cookies from 'universal-cookie';
import { LOGOUT } from "../../store/slices/UserSlice";

const cookies = new Cookies()

function NavbarService() {
    const dispatch = useDispatch();

    const handleLogOut = () => {
        cookies.remove("user");
        dispatch(LOGOUT())
    }


    return (
        <div>
            <TopNav handleLogOut={handleLogOut} />
        </div>
    )
}

export default memo(NavbarService)