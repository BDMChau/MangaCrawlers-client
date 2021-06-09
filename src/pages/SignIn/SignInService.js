import React, { useState } from 'react'
import SignIn from './SignIn'
import authApi from '../../api/apis/authApi'
import { errMsgResNotification } from '../../api/security/ErrResCheking';

import { message_error, message_success } from '../../components/notifications/message';
import { useDispatch } from 'react-redux';
import { SIGNIN } from '../../store/slices/UserSlice';
import Cookies from 'universal-cookie';
import endPoint from '../../config/endPoint';


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
                        setErrorMsg("Your account isn't verified or approved, check your email to confirm first!")
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
                cookies.set("user", user, { path: '/' });
                cookies.set("token", token, { path: '/' })
                dispatch(SIGNIN(user));

                message_success(response.content.msg);
                setIsCloseModal(true);
                return;
            } catch (error) {
                console.log(error);
            }
        }
    }


    const handleSignInWithGoogle = async () => {
        try {
            const response = await authApi.oauthGoogle();
            console.log(response)

            if (response.content.msg) {
                const url = endPoint.local + response.content.urls.Google
                const win = window.open(url, "_blank");
                win.focus();
            } else{
                message_error("Having a problem, please try another method to login!")
            }
            
            return;
        } catch (ex) {
            console.log(ex)
        }
    }


    return (
        <div>
            <SignIn
                handleSignIn={(email, password) => handleSignIn(email, password)}
                handleSignInWithGoogle={() => handleSignInWithGoogle()}
                isCloseModal={isCloseModal}
                errorMsg={errorMsg}
                isErr={isErr}
            />
        </div>
    )
}
