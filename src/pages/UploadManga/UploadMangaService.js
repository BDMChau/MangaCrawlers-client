import React, {useEffect} from 'react'
import UploadManga from './UploadManga'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { message_warning } from '../../components/notifications/message';


export default function UploadMangaService() {
    const userState = useSelector((state) => state.userState);
    const history = useHistory();





    useEffect(() => {
        if(!userState[0]){
            history.push("/");
            message_warning("Please login first!")
            return;
        } else{
           
        }
    }, [])



    return (
        <UploadManga />
    )
}
