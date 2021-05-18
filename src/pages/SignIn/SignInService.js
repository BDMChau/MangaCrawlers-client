import React, { useState } from 'react'
import SignIn from './SignIn'
import authApi from '../../api/apis/authApi'
import { errMsgResNotification } from '../../api/security/ErrResCheking';

import { message_success } from '../../components/notifications/message';
import { useDispatch } from 'react-redux';
import { SIGNIN } from '../../store/slices/UserSlice';
import Cookies from 'universal-cookie';


export default function SignInService() {
    const [isCloseModal, setIsCloseModal] = useState(false)

    const dispatch = useDispatch();

    const handleSignIn = async (email, password) => {
        try {
            const data = {
                "user_email": email,
                "user_password": password
            }
            const response = await authApi.postDataSignIn(data);

            if (response.content.err) {
                errMsgResNotification(response.content.err);
                return;
            }

            const user = response.content.user;
            const token = response.content.token;

            const cookies = new Cookies();
            cookies.set("user", user);
            cookies.set("token", token)
            dispatch(SIGNIN(user));

            message_success(response.content.msg);
            setIsCloseModal(true);
            return;
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div>
            <SignIn
                handleSignIn={(email, password) => handleSignIn(email, password)}
                isCloseModal={isCloseModal}
            />
        </div>
    )
}
