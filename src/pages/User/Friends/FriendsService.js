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
    const [totalFriends, setTotalFriends] = useState(0);

    const [fromRowFriends, setFromRowFriends] = useState(0);
    
    const history = useHistory();
    const params = useParams();
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
            getNumberOfFriends();
        } else{
            history.push("/")
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
            amount: 10
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

    const getNumberOfFriends = async () => {
        try {
            const res = await userApi.getTotalFriends(token);
            if (res.content.err) {
                setTotalFriends(0);
                return;
            }

            setTotalFriends(res.content.total_friends);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Friends

            listRequests={listRequests}

            listFriends={listFriends}
            totalFriends={totalFriends}

            selectedKey={selectedKey}
            setSelectedKey={setSelectedKey}
        />
    )
}
