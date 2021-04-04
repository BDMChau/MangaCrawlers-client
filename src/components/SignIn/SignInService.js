import React from 'react'
import SignInUI from './SignInUI'

export default function SignInService() {



    const handleSubmit = () => {
        console.log("ok submit")
    }



    return (
        <div>
            <p>This is sign in service</p>
            <SignInUI
                handleSubmit={handleSubmit}
            />
        </div>
    )
}
