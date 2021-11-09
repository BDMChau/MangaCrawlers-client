import React, { useEffect, useState } from 'react'
import Friends from './Friends'

import { useHistory, useLocation, useParams } from 'react-router';
import userApi from 'api/apis/MainServer/userApi';
import Cookies from 'universal-cookie';
import { useSelector } from 'react-redux';

export default function FriendsService() {
    const userState = useSelector((state) => state.userState);
    const stuffsState = useSelector((state) => state.stuffsState);

    const [selectedKey, setSelectedKey] = useState("");
    const [listRequests, setListRequests] = useState([]);
    const [listFriends, setListFriends] = useState([]);
    const [totalFriends, setTotalFriends] = useState(0);

    const [isEndFriends, setIsEndFriends] = useState(false);
    const [isEndReq, setIsEndReq] = useState(false);
    const [fromRowFriends, setFromRowFriends] = useState(0);
    const [fromRowReq, setFromRowReq] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    
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
    }, [userState]);


      // get more data when user scroll at bottom page
      useEffect(() => {
        if (stuffsState[1] && stuffsState[0]) {
            if (path === "friend_requests") {
                getFriendRequests();
            } else if (path === "all_friends") {
                getFriends();
            }
        }
    }, [stuffsState]);


    const getFriendRequests = async () => {
        if(isEndReq) return;
        setIsLoading(true);

        const data = {
            from: fromRowReq,
            amount: 14
        }

        try {
            const res = await userApi.getFriendRequest(token, data);
            if (res.content.err) {
                setListRequests([]);
                setIsLoading(false);
                return;
            }

            if(res.content.requests.length < 14) setIsEndReq(true);

            setListRequests(prev => [...prev, ...res.content.requests]);
            setFromRowReq(res.content.from);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    const getFriends = async () => {
        if(isEndFriends) return;
        setIsLoading(true);

        const data = {
            from: fromRowFriends,
            amount: 14
        }

        try {
            const res = await userApi.getFriends(token, data);
            if (res.content.err) {
                setListFriends([]);
                setIsLoading(false);
                return;
            }

            if(res.content.list_friends.length < 14) setIsEndFriends(true);

            setListFriends(prev => [...prev, ...res.content.list_friends]);
            setFromRowFriends(res.content.from);
            setIsLoading(false);
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

            isLoading={isLoading}

            selectedKey={selectedKey}
            setSelectedKey={setSelectedKey}
        />
    )
}
