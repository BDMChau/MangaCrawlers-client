import React, { useEffect, useState } from 'react'
import SignUp from './SignUp'
import authApi from '../../api/apis/authApi'
import { notification_success } from '../../components/notifications/notification';
import { useHistory } from 'react-router';
import { errMsgResNotification } from '../../helpers/ErrResCheking';

export default function SignUpService() {
    const history = useHistory();

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


            notification_success(response.content.msg);
            history.push("/signin");
            return;
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div>
            <SignUp
                handleSignUp={(name, email, password) => handleSignUp(name, email, password)}
            />
        </div>
    )
}
