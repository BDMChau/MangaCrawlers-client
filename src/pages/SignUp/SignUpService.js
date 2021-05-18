import React, {  useState } from 'react'
import SignUp from './SignUp'

import authApi from '../../api/apis/authApi'
import { errMsgResNotification } from '../../api/security/ErrResCheking';

import { message_success } from '../../components/notifications/message';

export default function SignUpService() {
    const [isCloseModal, setIsCloseModal] = useState(false)

    const handleSignUp = async (name, email, password) => {
        try {
            const data = {
                "user_name": name,
                "user_email": email,
                "user_password": password
            }
            const response = await authApi.postDataSignUp(data);

            if (response.content.err) {
                errMsgResNotification(response.content.err);
                return;
            }

            console.log(response);
            message_success(response.content.msg);
            message_success("Now you can sign in and enjoy ^^!");
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
