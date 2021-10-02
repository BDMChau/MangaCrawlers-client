import React, { memo, useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TopNav from './TopNav'
import Cookies from 'universal-cookie';
import { LOGOUT } from "../../store/features/user/UserSlice";
import { message_success } from '../alerts/message';
import { GET_ALL_GENRES } from '../../store/features/manga/MangaSlice';
import { socket } from 'socket/socketClient';
import EVENTS_NAME from 'socket/features/eventsName';
import userApi from 'api/apis/MainServer/userApi';
import { format } from 'helpers/format';

function NavbarService() {
    const dispatch = useDispatch();
    const genresState = useSelector(state => state.mangaState[2]);
    const userState = useSelector(state => state.userState);

    const [genres, setGenres] = useState([])

    const [fromRow, setFromRow] = useState(0)
    const [notifications, setNotifications] = useState([])
    const [isEnd, setIsEnd] = useState(false)


    const cookies = new Cookies();
    const token = cookies.get("token")


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
        if (userState[0]) getListNotifications();
    }, [userState[0]])


    useEffect(() => {
        if (genresState) {
            setGenres(genresState);
        }
    }, [genresState])



    const getListNotifications = async () => {
        const data = {
            from: fromRow
        }

        try {
            const response = await userApi.getNotifications(token, data);
            if (response.content.msg) {
                const notificationsList = response.content.notifications_list;
                if(notificationsList.length === 0 || notificationsList < 5){
                    setIsEnd(true);
                    return;
                }

                notificationsList.forEach(item => {
                    item.created_at = format.formatDate02(item.created_at);
                });

                setNotifications(prev => [...prev, ...notificationsList])
                setFromRow(response.content.fromRow)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const updateStatusNotifications = async () => {
        try{
           notifications.forEach(item =>{
                
           })
        
        } catch(err){
            console.log(err)
        }
    }



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

            notifications={notifications}
            getListNotifications={getListNotifications}
            isEnd={isEnd}
        />
    )
}

export default memo(NavbarService)