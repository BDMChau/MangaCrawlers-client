import React from 'react'
import SignIn from './SignIn'

export default function SignInService() {



    const handleSignIn = () => {
        console.log("ok submit")
    }



    return (
        <div>
            <p>This is sign in service</p>
            <SignIn
                handleSignIn={handleSignIn}
            />
        </div>
    )
}
