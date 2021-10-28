import React, { memo, useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TopNav from './TopNav'
import { LOGOUT } from "../../store/features/user/UserSlice";
import { message_success } from '../alerts/message';
import { GET_ALL_GENRES } from '../../store/features/manga/MangaSlice';
import Cookies from 'universal-cookie';
import { socketActions } from 'socket/socketClient';
import userApi from 'api/apis/MainServer/userApi';
import { format } from 'helpers/format';


function NavbarService() {
    const userState = useSelector((state) => state.userState);
    const genresState = useSelector(state => state.mangaState[2]);
    const dispatch = useDispatch();

    const [genres, setGenres] = useState([])

    const [notifications, setNotifications] = useState([])
    const [fromRow, setFromRow] = useState(0);
    const [isEnd, setIsEnd] = useState(false);

    const cookies = new Cookies();
    const token = cookies.get("token")


    useEffect(() => {
        dispatch(GET_ALL_GENRES());
    }, [])


    useEffect(() => {
        if (userState[0]) {
            getListNotifications();
        }
    }, [userState])

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


    const getListNotifications = async () => {
        if (!isEnd) {
            const data = {
                from: fromRow
            }

            try {
                const response = await userApi.getNotifications(token, data);

                if (response.content.msg) {
                    const notificationsList = response.content.notifications_list;
                    notificationsList.forEach(item => {
                        item.created_at = format.formatDate02(item.created_at);
                    });

                    if (notificationsList.length === 0 || notificationsList.length < 5) {
                        setIsEnd(true);
                        setNotifications(prev => [...prev, ...notificationsList]);
                        return;
                    }

                    setFromRow(response.content.fromRow);
                    setNotifications(prev => [...prev, ...notificationsList]);
                }
            } catch (err) {
                console.log(err)
            }
        }
    }


    return (
        <TopNav
            handleLogOut={handleLogOut}
            genres={genres}

            getListNotifications={getListNotifications}
            notifications={notifications}
            setNotifications={setNotifications}
            fromRow={fromRow}
            isEnd={isEnd}
        />
    )
}

export default memo(NavbarService)