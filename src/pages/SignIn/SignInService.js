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
    const [errorMsg, setErrorMsg] = useState("")
    const [isErr, setIsErr] = useState(false)

    const dispatch = useDispatch();

    const handleSignIn = async (email, password) => {
        if (email && password) {
            try {
                const data = {
                    "user_email": email,
                    "user_password": password
                }
                const response = await authApi.postDataSignIn(data);
                console.log(response)
                if (response.content.err) {
                    if (response.content.err === "Check email to verify the account!") {
                        setErrorMsg("Your account isn't verified, check your email to confirm first!")
                        setIsErr(false)

                    } else if (response.content.err === "Password does not match!") {
                        setErrorMsg("Wrong password!")
                        setIsErr(true)
                    } else {
                        setErrorMsg(response.content.err)
                        setIsErr(true)
                    }

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
    }



    return (
        <div>
            <SignIn
                handleSignIn={(email, password) => handleSignIn(email, password)}
                isCloseModal={isCloseModal}
                errorMsg={errorMsg}
                isErr={isErr}
            />
        </div>
    )
}
