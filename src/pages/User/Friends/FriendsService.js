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

    const [isEndFriends, setIsEndFriends] = useState(false);
    const [isEndReq, setIsEndReq] = useState(false);
    const [fromRowFriends, setFromRowFriends] = useState(0);
    const [fromRowReq, setFromRowReq] = useState(0);
    
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
            getFriendRequests();
            getFriends();
            getNumberOfFriends();
        } else{
            history.push("/")
        }
    }, [userState])


    const getFriendRequests = async () => {
        const data = {
            from: fromRowReq,
            amount: 10
        }

        try {
            const res = await userApi.getFriendRequest(token, data);
            if (res.content.err) {
                setListRequests([]);
                return;
            }

            if(res.content.requests.length < 10) setIsEndReq(true);

            setListRequests(res.content.requests);
            setFromRowReq(res.content.from);
        } catch (err) {
            console.log(err)
        }
    }

    const getFriends = async () => {
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

            if(res.content.list_friends.length < 10) setIsEndFriends(true);

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
