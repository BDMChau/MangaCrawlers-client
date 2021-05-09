import React from 'react'
import SignIn from './SignIn'

export default function SignInService() {



    const handleSignIn = () => {
        console.log("ok submit")
    }



    return (
        <div>
            <SignIn
                handleSignIn={handleSignIn}
            />
        </div>
    )
}
