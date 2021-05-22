import React from 'react'
import { useLocation } from 'react-router';
import UserPage from './UserPage'

export default function UserPageService() {
    const query = new URLSearchParams(useLocation().search);

    return (
        <div>
            <UserPage
                query={query.get("v")}
            />
        </div>
    )
}
