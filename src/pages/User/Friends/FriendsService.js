import React, { useEffect, useState } from 'react'
import Friends from './Friends'

import { useHistory, useLocation, useParams } from 'react-router';
import userApi from 'api/apis/MainServer/userApi';
import Cookies from 'universal-cookie';
import { useSelector } from 'react-redux';
import forumApi from 'api/apis/MainServer/forumApi';

export default function FriendsService() {
    const userState = useSelector((state) => state.userState);
    const stuffsState = useSelector((state) => state.stuffsState);

    const [selectedKey, setSelectedKey] = useState("");
    const [listRequests, setListRequests] = useState([]);
    const [listFriends, setListFriends] = useState([]);
    const [totalFriends, setTotalFriends] = useState(0);
    const [posts, setposts] = useState([]);

    const [isEndFriends, setIsEndFriends] = useState(false);
    const [isEndReq, setIsEndReq] = useState(false);
    const [isEndPosts, setIsEndPosts] = useState(false);

    const [fromRowFriends, setFromRowFriends] = useState(0);
    const [fromRowReq, setFromRowReq] = useState(0);
    const [fromRowPosts, setFromRowPosts] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [isFirstTime, setIsFirstTime] = useState(true);

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
        } else {
            history.push("/")
        }
    }, [userState]);


    // get more data when user scroll at bottom page
    useEffect(() => {
        if (stuffsState[1] && stuffsState[0] && !isFirstTime) {
            if (path === "friend_requests") {
                getFriendRequests();
            } else if (path === "all_friends") {
                getFriends();
            }
        }
    }, [stuffsState]);


    const getFriendRequests = async () => {
        console.log("ascascac")
        if (isEndReq) return;
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
                setIsFirstTime(false);
                return;
            }

            if (res.content.requests.length < 14) setIsEndReq(true);

            setListRequests(prev => [...prev, ...res.content.requests]);
            setFromRowReq(res.content.from);

            setIsLoading(false);
            setIsFirstTime(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
            setIsFirstTime(false);
        }
    }

    const getFriends = async () => {
        if (isEndFriends) return;
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
                setIsFirstTime(false);
                return;
            }

            if (res.content.list_friends.length < 14) setIsEndFriends(true);

            setListFriends(prev => [...prev, ...res.content.list_friends]);
            setFromRowFriends(res.content.from);

            setIsLoading(false);
            setIsFirstTime(false);
        } catch (err) {
            console.log(err)
            setIsLoading(false);
            setIsFirstTime(false);
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


    const getPosts = async () => {
        if (isEndPosts || !userState[0]) return;
        setIsLoading(true);

        const data = {
            user_id: userState[0].user_id,
            from: fromRowPosts,
            amount: 14
        }

        try {
            const res = await userApi.getPostsOfUser(data);
            if (res.content.err) {
                setposts([]);
                setIsLoading(false);
                setIsFirstTime(false);
                return;
            }

            if (res.content.posts.length < 14) setIsEndFriends(true);

            setposts(prev => [...prev, ...res.content.posts]);
            fromRowPosts(res.content.from);

            setIsLoading(false);
            setIsFirstTime(false);
        } catch (err) {
            console.log(err)
            setIsLoading(false);
            setIsFirstTime(false);
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
