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
    const [listFriends, setListFriends] = useState([]);

    const [fromRowFriends, setFromRowFriends] = useState(0);
    
    const params = useParams();
    const param_userId = params.id;
    const path = params.path;

    const cookies = new Cookies();
    const token = cookies.get("token");



    useEffect(() => {
        setSelectedKey(path);
    }, [path])


    useEffect(() => {
        if (userState[0]) {
            getAllFriendRequests();
            getAllFriends();
        }
    }, [userState[0]])


    const getAllFriendRequests = async () => {
        try {
            const res = await userApi.getFriendRequest(token);
            if (res.content.msg) {
                setListRequests(res.content.requests);
            }
        } catch (err) {
            console.log(err)
        }
    }

    const getAllFriends = async () => {
        const data = {
            from: fromRowFriends,
            amount: 5
        }

        try {
            const res = await userApi.getFriends(token, data);
            if (res.content.err) {
                setListFriends([]);
                return;
            }

            setListFriends(res.content.list_friends);
            setFromRowFriends(res.content.from)
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <Friends
            userId={param_userId}

            listRequests={listRequests}

            selectedKey={selectedKey}
            setSelectedKey={setSelectedKey}
        />
    )
}
