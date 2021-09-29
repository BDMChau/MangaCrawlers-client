import React, { useState } from 'react'
import SignUp from './SignUp'

import authApi from '../../../api/apis/MainServer/authApi'
import { errMsgResNotification } from '../../../api/checking/ErrResCheking';

import { message_success, message_warning } from '../../../components/alerts/message';

export default function SignUpService() {
    const [isLoading, setIsLoading] = useState(false)
    const [isCloseModal, setIsCloseModal] = useState(false)


    const handleSignUp = async (name, email, password) => {
        setIsLoading(true);
        try {
            const data = {
                "user_name": name,
                "user_email": email,
                "user_password": password
            }
            const response = await authApi.postDataSignUp(data);

            if (response.content.err) {
                errMsgResNotification(response.content.err);
                setIsLoading(false)
                return;
            }

            console.log(response);
            message_success("Sign up successfully!", 3);
            message_warning("Please check your email to confirm the account before sign in ^^", 10);
            
            setIsLoading(false)
            setIsCloseModal(true);
            return;
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div>
            <SignUp
                handleSignUp={(name, email, password) => handleSignUp(name, email, password)}
                isCloseModal={isCloseModal}
            />
        </div>
    )
}
