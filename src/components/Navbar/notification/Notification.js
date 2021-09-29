import React from 'react'

export default function Notification({ type, from, to, img, obj }) {

    // from={from} to={to} img={img} obj={obj}

    const handleRender = () => {
        switch (type) {
            case 1:
                return <Invitation />
            case 2:
                return <FriendRequest />

            default:
                break;
        }
    }


    const Invitation = () => (
        
    )

    const FriendRequest = ({ }) => (

    )


    return (
        <>
            {handleRender()}
        </>
    )
}
