import React, { memo } from 'react'
import TopNav from './TopNav'

function NavbarService() {
    return (
        <div>
            <TopNav/>
        </div>
    )
}

export default memo(NavbarService)