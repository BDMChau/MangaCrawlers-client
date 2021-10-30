import React, { useEffect, useState } from 'react';
import UserProfile from './UserProfile';
import Cookies from 'universal-cookie';
import userApi from '../../../api/apis/MainServer/userApi';
import { message_error, message_success } from '../../../components/alerts/message';
import { useDispatch } from 'react-redux';
import { UPDATE_AVATAR, UPDATE_DESC } from "../../../store/features/user/UserSlice";


export default function UserProfileService({ visible, closeProfileDrawer }) {
    const [userDesc, setUserDesc] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const cookies = new Cookies();
    const token = cookies.get("token");


    const removeAvatar = async () => {
        try {
            setIsLoading(true);

            const response = await userApi.removeAvatar(token);

            if (response.content.err) {
                console.warn("removeAvatar error or Avatar has already default");
                setIsLoading(false);
                return;
            }
            const avatarUrl = response.content.avatar_url;

            const user = cookies.get("user");
            cookies.set("user", { ...user, user_avatar: avatarUrl }, { path: '/' });
            dispatch(UPDATE_AVATAR(avatarUrl));

            message_success("Your avatar has been removed!", 3);
            setIsLoading(false);
            return;
        } catch (ex) {
            console.log(ex);
        }
    };


    const updateAvatar = async (file) => {
        // max is 10mb
        if (file.size <= 10000000) {
            setIsLoading(true);
            let formData = new FormData();
            formData.append("file", file);

            try {
                const response = await userApi.updateAvatar(token, formData);
                if (response.content.err) {
                    console.error("updateAvatar error");
                    setIsLoading(false);
                    return;
                }
                const avatarUrl = response.content.avatar_url;

                const user = cookies.get("user");
                cookies.set("user", { ...user, user_avatar: avatarUrl }, { path: '/' });
                dispatch(UPDATE_AVATAR(avatarUrl));

                message_success("Your avatar has been updated!", 3);
                setIsLoading(false);
                return;
            } catch (ex) {
                console.log(ex);
            }
        } else {
            message_error("Your file is too big, maximum is 10mb!");
            return;
        }
    };


    const updateDesc = async () => {
        const data = {
            user_desc: userDesc.trim()
        }

        try {
            const res = await userApi.updateDescription(token, data);

            if (res.content.msg) {
                const userDesc = res.content.user.user_desc;

                const user = cookies.get("user");
                cookies.set("user", { ...user, user_desc: userDesc }, { path: '/' });
                dispatch(UPDATE_DESC(userDesc));

                message_success("Updated!");
            }
        } catch (err) {
            message_error("Error!")
            console.log(err)
        }
    }

    return (
        <UserProfile
            visible={visible}
            closeProfileDrawer={(state) => closeProfileDrawer(state)}
            removeAvatar={() => removeAvatar()}
            updateAvatar={file => updateAvatar(file)}
            isLoading={isLoading}

            userDesc={userDesc}
            setUserDesc={setUserDesc}
            updateDesc={updateDesc}
        />
    );
}
