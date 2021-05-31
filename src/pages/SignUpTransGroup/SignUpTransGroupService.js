import React from 'react'
import Cookies from 'universal-cookie';
import userApi from '../../api/apis/userApi';
import { message_success } from '../../components/notifications/message';
import SignUpTransGroup from './SignUpTransGroup';

export default function SignUpTransGroupService() {
    const cookies = new Cookies();
    const token = cookies.get("token")

    const registerTransGroup = async (name, desc) => {
        const data = {
            group_name: name,
            group_desc: desc
        }

        try {
            const response = await userApi.registerTranslationGroup(token, data);

            if (response.content.msg) {
                message_success(response.content.msg);
            }

            console.log(response)
        } catch (ex) {
            console.log(ex)
        }
    }


    return (
        <SignUpTransGroup
            registerTransGroup={(name, desc) => registerTransGroup(name, desc)}
        />
    )
}
