import React, { useEffect, useState } from 'react'
import mangaApi from "../../api/apis/mangaApi"
import { message_error } from '../../components/notifications/message'
import Home from './Home'

function HomeService(props) {
    const [allMangas, setAllMangas] = useState([])


    useEffect(() => {
        getAllManga();
    }, [])

    const getAllManga = async () => {
        try {
            const response = await mangaApi.getAll();
            console.log(response)
            if (response.content.err) {
                message_error(response.content.err);
                return;
            }
            setAllMangas(response.content.data)

            return;
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <Home allMangas={allMangas} />
        </div>
    )
}


export default HomeService;

