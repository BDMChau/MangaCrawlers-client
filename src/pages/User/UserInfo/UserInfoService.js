import React, { useEffect, useState } from 'react'
import "./UserInfo.css";

import { useLocation } from 'react-router';
import UserInfo from './UserInfo';

export default function UserInfoService() {
    const query = new URLSearchParams(useLocation().search);
    const [userId, setUserId] = useState(null);



    useEffect(() => {
        setUserId(query.get("id"));
    }, [query.get("id")])

    return (
        <UserInfo/>
    )
}
