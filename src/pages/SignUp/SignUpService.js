import React, { useEffect, useState } from 'react'
import SignUpUI from './SignUpUI'
import authApi from '../../api/apis/authApi'
import { toast_success } from '../../notifications/toast';
import { useHistory } from 'react-router';
import { errMsgResNotification } from '../../helpers/ErrResCheking';

export default function SignUpService() {
    const [signupStt, setSignupStt] = useState("");
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

           
            setSignupStt(response.content.msg);
            toast_success(signupStt);
            history.push("/signin");
            return;
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div>
            <SignUpUI
                handleSignUp={handleSignUp}

            />
        </div>
    )
}
