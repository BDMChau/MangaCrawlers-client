import React, { useEffect, useState } from 'react'
import Admin from './Admin'
import Cookies from 'universal-cookie';
import adminApi from '../../api/apis/adminApi';
import { message_error, message_success } from '../../components/notifications/message';
import arrayMethods from '../../helpers/arrayMethods';

export default function AdminService() {
    const [users, setUsers] = useState([])
    const [admins, setAdmins] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const cookies = new Cookies();
    const token = cookies.get("token")

    useEffect(() => {
        getAllUsers();
    }, [])

    const getAllUsers = async () => {
        try {
            const response = await adminApi.getAllUsers(token);
            if (response.content.err) {
                console.error("getAllUsers error!")
                return;
            }

            console.log(response.content.msg)

            const allUsers = response.content.users;
            const sortedUsers = allUsers.sort(arrayMethods.dynamicSort("user_id"))

            sortedUsers.forEach(user => {
                if (user.user_isAdmin === true) {
                    setAdmins(prevUser => [...prevUser, user]);
                } else {
                    setUsers(prevUser => [...prevUser, user]);
                }
            });

            return;
        } catch (ex) {
            console.log(ex)
        }
    }


    const handleDeprecateUser = async (userId) => {
        setIsLoading(true);
        const data = {
            user_id: userId
        }
        try {
            const response = await adminApi.deprecateUser(token, data);
            console.log(response.content.users)
            if (response.content.err) {
                console.error("DeprecateUser error!")
                setIsLoading(false);
                return;
            }

            const allUsers = response.content.users;

            setUsers([]);
            allUsers.forEach(user => {
                if (user.user_isAdmin === false) {
                    setUsers(prevUser => [...prevUser, user]);
                }
            });

            message_success("Deprecated this account!", 3);
            setIsLoading(false);
            return;

        } catch (ex) {
            console.log(ex)
        }
    }


    const handleRemoveUser = async (userId) => {
        setIsLoading(true);
        const data = {
            user_id: userId
        }
        try {
            const response = await adminApi.removeUser(token, data);
            console.log(response.content.users)
            if (response.content.err) {
                console.error("RemoveUser error!")
                setIsLoading(false);
                return;
            }

            const allUsers = response.content.users;

            setUsers([]);
            allUsers.forEach(user => {
                if (user.user_isAdmin === false) {
                    setUsers(prevUser => [...prevUser, user]);
                }
            });

            message_success("Removed this account!", 3);
            setIsLoading(false);
            return;

        } catch (ex) {
            console.log(ex)
        }
    }

    return (
        <div>
            <Admin
                users={users}
                admins={admins}
                handleDeprecateUser={(userId) => handleDeprecateUser(userId)}
                handleRemoveUser={(userId) => handleRemoveUser(userId)}
                isLoading={isLoading}
            />
        </div>
    )
}
