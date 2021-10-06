import React, { useEffect } from 'react'
import Friends from './Friends'

import { useLocation, useParams } from 'react-router';

export default function FriendsService() {
    const params = useParams();
    const param_userId = params.id;

    useEffect(() => {
        console.log(param_userId)
    }, [])

    return (
        <div>
            <Friends />
        </div>
    )
}
