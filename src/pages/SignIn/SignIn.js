import React, { useState, useEffect } from 'react';
import TransitionAnimate from '../../components/Animation/transition';
import "./SignIn.css";

export default function SignIn() {


    useEffect(() => {

        
    }, []);



    return (
        <div>
            <TransitionAnimate renderPart={<p>this is sign in UI</p>} />
        </div>
    )
}
