import React from 'react'
import SignIn from './SignInUI'

export default function SignInService() {



    const handleSignIn = () => {
        console.log("ok submit")
    }



    return (
        <div>
            <p>This is sign in service</p>
            <SignInUI
                handleSignIn={handleSignIn}
            />
        </div>
    )
}
