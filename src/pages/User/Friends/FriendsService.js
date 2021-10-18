import React, { useEffect, useState } from 'react'
import Friends from './Friends'

import { useHistory, useLocation, useParams } from 'react-router';
import userApi from 'api/apis/MainServer/userApi';
import Cookies from 'universal-cookie';
import { useSelector } from 'react-redux';

export default function FriendsService() {
    const userState = useSelector((state) => state.userState);

    const [selectedKey, setSelectedKey] = useState("");
    const [listRequests, setListRequests] = useState([]);

    const params = useParams();
    const param_userId = params.id;
    const path = params.path;

    const cookies = new Cookies();
    const token = cookies.get("token");



    useEffect(() => {
        setSelectedKey(path);
    }, [path])

    
    useEffect(() => {
        if (userState[0]) getAllFriendRequests();
    }, [userState[0]])


    const getAllFriendRequests = async () => {
        try {
            const res = await userApi.getFriendRequest(token);

            if (res.content.msg) setListRequests(res.content.requests);
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <div>
            <Friends
                userId={param_userId}

                selectedKey={selectedKey}
                setSelectedKey={setSelectedKey}
            />
        </div>
    )
}
