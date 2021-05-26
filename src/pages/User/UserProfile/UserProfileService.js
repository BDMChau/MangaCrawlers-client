import React from 'react'
import UserProfile from './UserProfile'
import Cookies from 'universal-cookie';
import userApi from '../../../api/apis/userApi';
import { message_error, message_success } from '../../../components/notifications/message';
import { useDispatch } from 'react-redux';
import { UPDATE_AVATAR } from "../../../store/slices/UserSlice";


export default function UserProfileService({ visible, closeProfileDrawer }) {
    const dispatch = useDispatch()
    const cookies = new Cookies();
    const token = cookies.get("token");


    const removeAvatar = async () => {
        try {
            const response = await userApi.removeAvatar(token);
            console.log(response)
            if (response.content.err) {
                console.warn("removeAvatar error or Avatar has already default")
                return;
            }
            const avatarUrl = response.content.avatar_url;

            const user = cookies.get("user");
            cookies.set("user", { ...user, user_avatar: avatarUrl }, { path: '/' });
            dispatch(UPDATE_AVATAR(avatarUrl))

            message_success("Your avatar is removed!", 3)
            return;
        } catch (ex) {
            console.log(ex)
        }
    }

    const updateAvatar = async (file) => {
        // max is 10mb
        if (file.size <= 10000000) {
            let formData = new FormData();
            formData.append("file", file)

            try {
                const response = await userApi.updateAvatar(token, formData);
                if(response.content.err){
                    console.error("updateAvatar error")
                    return;
                }
                const avatarUrl = response.content.avatar_url;

                const user = cookies.get("user");
                cookies.set("user", { ...user, user_avatar: avatarUrl }, { path: '/' });
                dispatch(UPDATE_AVATAR(avatarUrl))
    
                message_success("Your avatar is changed!", 3)
                return;
            } catch (ex) {
                console.log(ex)
            }
        } else {
            message_error("Your file is too big, maximum is 10mb!");
            return
        }
    }

    return (
        <UserProfile
            visible={visible}
            closeProfileDrawer={(state) => closeProfileDrawer(state)}
            removeAvatar={() => removeAvatar()}
            updateAvatar={file => updateAvatar(file)}
        />
    )
}
