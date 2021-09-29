import React from 'react'
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import userApi from '../../../api/apis/MainServer/userApi';
import { message_success } from '../../../components/alerts/message';
import { SET_TRANSGROUP_ID } from '../../../store/features/user/UserSlice';
import SignUpTransGroup from './SignUpTransGroup';

export default function SignUpTransGroupService() {
    const dispatch = useDispatch()
    const cookies = new Cookies();
    const token = cookies.get("token")


    // this function in SignUpTransGroup
    const registerTransGroup = async (name, desc) => {
        const data = {
            group_name: name,
            group_desc: desc
        }

        try {
            const response = await userApi.registerTranslationGroup(token, data);
            console.log(response)

            if (response.content.msg) {
                message_success(response.content.msg);
                const transGroupId = response.content.user_transgroup_id;
                dispatch(SET_TRANSGROUP_ID(transGroupId))
                return;
            }

            return;
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
